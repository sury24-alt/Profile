"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    const n: [number, number, number][] = [];
    // Create layers of neural network
    const layers = [4, 6, 6, 4, 2];
    let x = -4;
    layers.forEach((count, layerIdx) => {
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 1.2;
        n.push([x, y, 0]);
      }
      x += 2;
    });
    return n;
  }, []);

  const connections = useMemo(() => {
    const conns: { from: number; to: number }[] = [];
    const layers = [4, 6, 6, 4, 2];
    let startIdx = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const nextStart = startIdx + layers[l];
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          conns.push({ from: startIdx + i, to: nextStart + j });
        }
      }
      startIdx = nextStart;
    }
    return conns;
  }, []);

  useFrame((state) => {
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} delay={i * 0.2} />
      ))}
      {/* Connections */}
      {connections.map((conn, i) => {
        const from = new THREE.Vector3(...nodes[conn.from]);
        const to = new THREE.Vector3(...nodes[conn.to]);
        const mid = new THREE.Vector3()
          .addVectors(from, to)
          .multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(to, from);
        const len = dir.length();

        return (
          <mesh
            key={i}
            position={mid}
            rotation={new THREE.Euler(0, 0, Math.atan2(dir.y, dir.x))}
          >
            <planeGeometry args={[len, 0.01]} />
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.08} />
          </mesh>
        );
      })}
    </group>
  );
}

function NeuralNode({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const pulse = 1 + Math.sin(t * 2) * 0.15;
    meshRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#7c5cbf"
        emissiveIntensity={1.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function DataStream() {
  const count = 100;
  const meshRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const posArray = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] -= 0.01;
      if (posArray[i * 3 + 1] < -4) posArray[i * 3 + 1] = 4;
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
        size={0.02}
        color="#06b6d4"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function AboutScene() {
  return (
    <div
      className="w-full h-[300px] md:h-[350px]"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#a78bfa" />
        <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />

        <NeuralNetwork />
        <DataStream />
      </Canvas>
    </div>
  );
}
