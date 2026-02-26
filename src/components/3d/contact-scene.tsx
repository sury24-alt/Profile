"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  const originalPositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.8, 4);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = meshRef.current.geometry;
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];
      const oz = originalPositions[i + 2];

      const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const noise =
        Math.sin(ox * 2 + t * 0.8) *
        Math.cos(oy * 2 + t * 0.6) *
        Math.sin(oz * 2 + t * 0.4) *
        0.25;

      const scale = 1 + noise / dist;
      positions[i] = ox * scale;
      positions[i + 1] = oy * scale;
      positions[i + 2] = oz * scale;
    }
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();

    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;

    // Color shift
    const hue = (Math.sin(t * 0.2) * 0.1 + 0.75) % 1;
    materialRef.current.emissive.setHSL(hue, 0.6, 0.2);
    materialRef.current.color.setHSL(hue, 0.5, 0.4);
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 4]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#7c5cbf"
          emissive="#7c5cbf"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

function EnergyRings() {
  const ringsRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringsRef.current.children.forEach((ring, i) => {
      ring.rotation.x = t * (0.2 + i * 0.1);
      ring.rotation.y = t * (0.15 + i * 0.05);
      ring.rotation.z = Math.sin(t * 0.3 + i) * 0.5;
      const scale = 1 + Math.sin(t * 0.5 + i * Math.PI * 0.5) * 0.05;
      ring.scale.set(scale, scale, scale);
    });
  });

  const ringColors = ["#7c5cbf", "#06b6d4", "#d946ef"];

  return (
    <group ref={ringsRef}>
      {ringColors.map((color, i) => (
        <mesh key={i}>
          <torusGeometry args={[2.5 + i * 0.4, 0.008, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            transparent
            opacity={0.4 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitalParticles() {
  const count = 80;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.8 + Math.random() * 0.8;
      const tilt = (Math.random() - 0.5) * 1.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = tilt;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      vel[i] = 0.3 + Math.random() * 0.5;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const arr = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + t * velocities[i];
      const radius = 2.8 + Math.sin(t * 0.5 + i * 0.1) * 0.3;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(t * 0.8 + i * 0.2) * 0.6;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.8}
        color="#a78bfa"
      />
    </points>
  );
}

export default function ContactScene() {
  return (
    <div
      className="w-full h-[300px] md:h-[350px]"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[-5, -3, 5]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, -5, 3]} intensity={0.3} color="#d946ef" />

        <MorphingSphere />
        <EnergyRings />
        <OrbitalParticles />
      </Canvas>
    </div>
  );
}
