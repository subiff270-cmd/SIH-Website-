import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Complaint } from '../../types';

interface IssueMarkers3DProps {
  complaints: Complaint[];
  onSelectComplaint?: (c: Complaint) => void;
}

export const IssueMarkers3D: React.FC<IssueMarkers3DProps> = ({ complaints, onSelectComplaint }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.002;
      });
    }
  });

  const getMarkerColor = (severity: string, status: string) => {
    if (status === 'COMPLETED') return '#10B981'; // Green
    switch (severity) {
      case 'CRITICAL':
        return '#F43F5E'; // Red
      case 'HIGH':
        return '#F59E0B'; // Orange
      case 'MEDIUM':
        return '#EAB308'; // Yellow
      default:
        return '#3B82F6'; // Blue
    }
  };

  return (
    <group ref={groupRef}>
      {complaints.map((c, index) => {
        // Map GPS coords to 3D grid coords
        const x = ((c.location.lng - 77.2) * 100) % 15 - 7.5;
        const z = ((c.location.lat - 28.6) * 100) % 15 - 7.5;
        const color = getMarkerColor(c.severity, c.status);

        return (
          <group key={c.id} position={[x, 1.2, z]}>
            {/* Glowing Pulsing Mesh */}
            <mesh onClick={() => onSelectComplaint && onSelectComplaint(c)}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Ring Ground Target */}
            <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.4, 0.5, 32]} />
              <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>

            {/* HTML Floating Tooltip Label */}
            <Html distanceFactor={15} position={[0, 0.6, 0]} center>
              <div
                onClick={() => onSelectComplaint && onSelectComplaint(c)}
                className="cursor-pointer px-2.5 py-1 rounded-lg bg-slate-950/90 border border-slate-700 backdrop-blur-md text-[10px] font-mono whitespace-nowrap shadow-lg hover:scale-110 transition-transform flex items-center gap-1.5"
                style={{ borderColor: color }}
              >
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
                <span className="text-white font-bold">{c.category.replace('_', ' ')}</span>
                <span className="text-slate-400">({c.severity})</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
