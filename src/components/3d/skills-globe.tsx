"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Text3D,
  Center,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function SkillNode({
  position,
  label,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    meshRef.current.rotation.y = t * 0.3;

    // Pulsing glow
    const scale = 1 + Math.sin(t * 2) * 0.1;
    glowRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Core shape */}
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.1}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ConnectionLines({ nodes }: { nodes: [number, number, number][] }) {
  const lineRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i]).distanceTo(
          new THREE.Vector3(...nodes[j]),
        );
        if (dist < 3) {
          points.push(new THREE.Vector3(...nodes[i]));
          points.push(new THREE.Vector3(...nodes[j]));
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [nodes]);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity =
        0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#a78bfa" transparent opacity={0.15} />
    </lineSegments>
  );
}

function RotatingGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return <group ref={groupRef}>{children}</group>;
}

const skills = [
  {
    label: "Python",
    color: "#3b82f6",
    position: [0, 2.2, 0] as [number, number, number],
  },
  {
    label: "HTML",
    color: "#f97316",
    position: [2.1, 0.7, 0.5] as [number, number, number],
  },
  {
    label: "CSS",
    color: "#06b6d4",
    position: [1.3, -1.7, 0.8] as [number, number, number],
  },
  {
    label: "Java",
    color: "#ef4444",
    position: [-1.3, -1.7, 0.8] as [number, number, number],
  },
  {
    label: "ML",
    color: "#8b5cf6",
    position: [-2.1, 0.7, 0.5] as [number, number, number],
  },
  {
    label: "IoT",
    color: "#10b981",
    position: [0, 0, 2.2] as [number, number, number],
  },
  {
    label: "React",
    color: "#38bdf8",
    position: [1.5, 1.3, -1] as [number, number, number],
  },
  {
    label: "Next.js",
    color: "#e2e8f0",
    position: [-1.5, 1.3, -1] as [number, number, number],
  },
];

export default function SkillsGlobe() {
  const nodePositions = skills.map((s) => s.position);

  return (
    <div
      className="w-full h-[350px] md:h-[400px]"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />

        <RotatingGroup>
          <ConnectionLines nodes={nodePositions} />
          {skills.map((skill, i) => (
            <SkillNode
              key={skill.label}
              position={skill.position}
              label={skill.label}
              color={skill.color}
              delay={i * 0.5}
            />
          ))}
          {/* Central glowing core */}
          <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial
              color="#7c5cbf"
              emissive="#7c5cbf"
              emissiveIntensity={1}
              transparent
              opacity={0.2}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#a78bfa"
              emissiveIntensity={2}
            />
          </mesh>
        </RotatingGroup>
      </Canvas>
    </div>
  );
}
