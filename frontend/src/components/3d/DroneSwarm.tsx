import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const DroneSwarm: React.FC = () => {
  const drone1Ref = useRef<THREE.Group>(null);
  const drone2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (drone1Ref.current) {
      drone1Ref.current.position.x = Math.sin(t * 0.8) * 8;
      drone1Ref.current.position.z = Math.cos(t * 0.8) * 8;
      drone1Ref.current.position.y = 5 + Math.sin(t * 2) * 0.5;
      drone1Ref.current.rotation.y = t * 0.8 + Math.PI / 2;
    }

    if (drone2Ref.current) {
      drone2Ref.current.position.x = Math.cos(t * 0.5) * 6;
      drone2Ref.current.position.z = Math.sin(t * 0.5) * 6;
      drone2Ref.current.position.y = 4.5 + Math.cos(t * 1.5) * 0.4;
      drone2Ref.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <group>
      {/* Drone 1 */}
      <group ref={drone1Ref}>
        <mesh>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1} />
        </mesh>
        {/* Downward Scan Light Cone */}
        <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.5, 4, 16, 1, true]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Drone 2 */}
      <group ref={drone2Ref}>
        <mesh>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1} />
        </mesh>
        {/* Downward Scan Light Cone */}
        <mesh position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.2, 4, 16, 1, true]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};
