import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const DroneSwarm: React.FC = () => {
  const drone1Ref = useRef<THREE.Group>(null);
  const drone2Ref = useRef<THREE.Group>(null);
  const drone3Ref = useRef<THREE.Group>(null);
  const drone4Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (drone1Ref.current) {
      drone1Ref.current.position.x = Math.sin(t * 0.8) * 9;
      drone1Ref.current.position.z = Math.cos(t * 0.8) * 9;
      drone1Ref.current.position.y = 5.5 + Math.sin(t * 2) * 0.5;
      drone1Ref.current.rotation.y = t * 0.8 + Math.PI / 2;
    }

    if (drone2Ref.current) {
      drone2Ref.current.position.x = Math.cos(t * 0.6) * 7;
      drone2Ref.current.position.z = Math.sin(t * 0.6) * 7;
      drone2Ref.current.position.y = 4.8 + Math.cos(t * 1.5) * 0.4;
      drone2Ref.current.rotation.y = -t * 0.6;
    }

    if (drone3Ref.current) {
      drone3Ref.current.position.x = Math.sin(t * 0.5 + 2) * 11;
      drone3Ref.current.position.z = Math.cos(t * 0.5 + 2) * 11;
      drone3Ref.current.position.y = 6.0 + Math.sin(t * 2.5) * 0.6;
      drone3Ref.current.rotation.y = t * 0.5;
    }

    if (drone4Ref.current) {
      drone4Ref.current.position.x = Math.cos(t * 0.9 - 1) * 5;
      drone4Ref.current.position.z = Math.sin(t * 0.9 - 1) * 5;
      drone4Ref.current.position.y = 4.2 + Math.cos(t * 3) * 0.3;
      drone4Ref.current.rotation.y = -t * 0.9;
    }
  });

  return (
    <group>
      {/* Drone 1 - PWD Surveillance Drone */}
      <group ref={drone1Ref}>
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.6, 4.5, 16, 1, true]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Drone 2 - Solid Waste AI Scanner */}
      <group ref={drone2Ref}>
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.4, 4.5, 16, 1, true]} />
          <meshBasicMaterial color="#A855F7" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Drone 3 - Water Grid Thermal Sensor */}
      <group ref={drone3Ref}>
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.8, 5, 16, 1, true]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Drone 4 - Electrical Light Station Inspection */}
      <group ref={drone4Ref}>
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.3, 4, 16, 1, true]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};
