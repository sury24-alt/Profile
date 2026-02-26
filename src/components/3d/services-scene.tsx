"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveParticles() {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 1500;

  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const cols = Math.ceil(Math.sqrt(count));
    const spacing = 0.3;

    for (let i = 0; i < count; i++) {
      const x = (i % cols) * spacing - (cols * spacing) / 2;
      const z = Math.floor(i / cols) * spacing - (cols * spacing) / 2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = z;
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = 0;
      origPos[i * 3 + 2] = z;
    }
    return [pos, origPos];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const x = originalPositions[i * 3];
      const z = originalPositions[i * 3 + 2];
      const dist = Math.sqrt(x * x + z * z);
      arr[i * 3 + 1] =
        Math.sin(dist * 1.5 - t * 1.2) * 0.3 + Math.sin(x * 2 + t * 0.8) * 0.15;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.5}
        color="#7c5cbf"
      />
    </points>
  );
}

function FloatingDNA() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 40;

  const helixPoints = useMemo(() => {
    const points: {
      pos1: [number, number, number];
      pos2: [number, number, number];
    }[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i - count / 2) * 0.2;
      points.push({
        pos1: [Math.cos(t) * 0.8, y, Math.sin(t) * 0.8],
        pos2: [Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8],
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          <mesh position={point.pos1}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1}
            />
          </mesh>
          <mesh position={point.pos2}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#d946ef"
              emissive="#d946ef"
              emissiveIntensity={1}
            />
          </mesh>
          {i % 3 === 0 && (
            <mesh
              position={[
                (point.pos1[0] + point.pos2[0]) / 2,
                (point.pos1[1] + point.pos2[1]) / 2,
                (point.pos1[2] + point.pos2[2]) / 2,
              ]}
            >
              <cylinderGeometry args={[0.01, 0.01, 1.6, 4]} />
              <meshStandardMaterial color="#a78bfa" transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

export default function ServicesScene() {
  return (
    <div
      className="w-full h-[300px] md:h-[350px]"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[-5, 3, 5]} intensity={0.4} color="#06b6d4" />

        <WaveParticles />
        <group position={[4, 0, 0]} scale={0.8}>
          <FloatingDNA />
        </group>
        <group position={[-4, 0, 0]} scale={0.8}>
          <FloatingDNA />
        </group>
      </Canvas>
    </div>
  );
}
