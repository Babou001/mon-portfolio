"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

function NeuralNetwork() {
  const ref = useRef<THREE.Points>(null);
  const noise3D = useMemo(() => createNoise3D(), []);

  // Generate nodes positions
  const [positions, connections] = useMemo(() => {
    const nodeCount = 50;
    const positions = new Float32Array(nodeCount * 3);
    const connections: [number, number][] = [];

    // Generate random positions for nodes
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 2.5) {
          connections.push([i, j]);
        }
      }
    }

    return [positions, connections];
  }, []);

  // Animate nodes with simplex noise
  useFrame(({ clock }) => {
    if (!ref.current) return;

    const time = clock.getElapsedTime() * 0.1;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];

      // Apply simplex noise for organic movement
      const noiseX = noise3D(x * 0.5, y * 0.5, time) * 0.3;
      const noiseY = noise3D(x * 0.5 + 100, y * 0.5, time) * 0.3;
      const noiseZ = noise3D(x * 0.5, y * 0.5 + 100, time) * 0.3;

      positions[i * 3] += noiseX * 0.01;
      positions[i * 3 + 1] += noiseY * 0.01;
      positions[i * 3 + 2] += noiseZ * 0.01;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.05;
  });

  return (
    <group>
      {/* Nodes (points) */}
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Connections (lines) */}
      {connections.map(([i, j], index) => (
        <Line
          key={index}
          start={[
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
          ]}
          end={[
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          ]}
        />
      ))}
    </group>
  );
}

function Line({ start, end }: { start: number[]; end: number[] }) {
  const ref = useRef<THREE.Line>(null);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.001;
  });

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </line>
  );
}

export default function NeuralNetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <NeuralNetwork />
      </Canvas>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
