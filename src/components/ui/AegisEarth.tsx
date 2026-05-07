"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, PerspectiveCamera, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const Satellites = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    groupRef.current.rotation.y -= 0.005;
    groupRef.current.rotation.x += 0.002;
  });

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos(i * (Math.PI * 2 / 5)) * 2,
          Math.sin(i * (Math.PI * 2 / 5)) * 0.5,
          Math.sin(i * (Math.PI * 2 / 5)) * 2
        ]}>
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshBasicMaterial color="#00d1ff" />
          <pointLight intensity={0.5} distance={1} color="#00d1ff" />
        </mesh>
      ))}
    </group>
  );
};

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y += 0.002;
  });

  return (
    <group>
      <Satellites />
      {/* Outer Glow */}
      <Sphere args={[1.5, 64, 64]}>
        <meshBasicMaterial color="#00d1ff" wireframe transparent opacity={0.05} />
      </Sphere>

      {/* Main Globe */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#0a0a0a"
          speed={0.5}
          distort={0.1}
          radius={1}
        />
      </Sphere>

      {/* Grid Overlay */}
      <Sphere args={[1.41, 32, 32]}>
        <meshBasicMaterial color="#00d1ff" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Atmospheric Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.005, 16, 100]} />
        <meshBasicMaterial color="#00d1ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const AegisEarth = () => {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d1ff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Globe />
        </Float>
      </Canvas>
    </div>
  );
};
