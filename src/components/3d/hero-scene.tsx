"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sphere,
  Torus,
  TorusKnot,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={[-3, 1, -2]} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#7c5cbf"
          transparent
          opacity={0.35}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[3.5, -0.5, -3]} scale={0.6}>
        <torusKnotGeometry args={[1, 0.35, 128, 16]} />
        <MeshDistortMaterial
          color="#4a90d9"
          transparent
          opacity={0.3}
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2.5}>
      <mesh ref={meshRef} position={[1.5, 2.5, -4]} scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <MeshWobbleMaterial
          color="#d946ef"
          transparent
          opacity={0.25}
          factor={0.6}
          speed={1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={3}>
      <Sphere args={[0.8, 32, 32]} position={[-2.5, -1.5, -2]}>
        <MeshDistortMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={2} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, -2, -5]} scale={0.7}>
        <torusGeometry args={[1, 0.3, 16, 50]} />
        <meshStandardMaterial
          color="#f472b6"
          transparent
          opacity={0.2}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function GlowingRing({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      siz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, siz];
  }, []);

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.6}
        color="#a78bfa"
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.6}
          color="#a78bfa"
        />
        <directionalLight
          position={[-5, -5, 5]}
          intensity={0.3}
          color="#06b6d4"
        />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#d946ef" />

        <FloatingIcosahedron />
        <FloatingTorusKnot />
        <FloatingOctahedron />
        <FloatingSphere />
        <FloatingTorus />
        <GlowingRing position={[-1, 0.5, -3]} color="#7c5cbf" scale={0.8} />
        <GlowingRing position={[2, -1, -4]} color="#06b6d4" scale={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
