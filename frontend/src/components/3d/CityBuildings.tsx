import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface CityBuildingsProps {
  onSelectDepartmentBuilding?: (deptName: string) => void;
  activeDepartmentFilter?: string;
}

export const CityBuildings: React.FC<CityBuildingsProps> = ({
  onSelectDepartmentBuilding,
  activeDepartmentFilter,
}) => {
  const vehiclesRef = useRef<THREE.Group>(null);

  // Government Buildings Data
  const deptBuildings = [
    { name: 'PWD Road Infrastructure HQ', code: 'PWD_ROADS', pos: [-6, 2, -6], color: '#3B82F6', icon: '🛣️' },
    { name: 'Solid Waste Operations Depot', code: 'SWM_CLEAN', pos: [6, 2, -6], color: '#10B981', icon: '♻️' },
    { name: 'Water & Sewerage Main Grid', code: 'WATER_DEPT', pos: [-6, 2, 6], color: '#06B6D4', icon: '💧' },
    { name: 'Electrical & Lighting Station', code: 'ELEC_LIGHT', pos: [6, 2, 6], color: '#F59E0B', icon: '⚡' },
  ];

  // Procedural Regular Buildings
  const buildings = useMemo(() => {
    const list: { x: number; z: number; h: number; w: number; color: string }[] = [];
    const colors = ['#0F172A', '#1E293B', '#0B132B', '#1C2541'];
    for (let x = -10; x <= 10; x += 3) {
      for (let z = -10; z <= 10; z += 3) {
        if (Math.abs(x) === 6 && Math.abs(z) === 6) continue; // Skip dept buildings slots
        if (Math.abs(x) === 0 || Math.abs(z) === 0) continue; // Skip main avenues
        const h = 2 + Math.random() * 5;
        const w = 1.6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        list.push({ x, z, h, w, color });
      }
    }
    return list;
  }, []);

  // Moving Traffic Vehicles
  useFrame((state) => {
    if (vehiclesRef.current) {
      const t = state.clock.getElapsedTime();
      vehiclesRef.current.children.forEach((car, i) => {
        if (i % 2 === 0) {
          car.position.x = ((t * 4 + i * 5) % 30) - 15;
        } else {
          car.position.z = ((t * 4 + i * 5) % 30) - 15;
        }
      });
    }
  });

  return (
    <group>
      {/* Procedural City Skyscrapers */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.h / 2, b.z]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, b.w]} />
            <meshStandardMaterial color={b.color} roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh>
            <boxGeometry args={[b.w + 0.02, b.h + 0.02, b.w + 0.02]} />
            <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.12} />
          </mesh>
        </group>
      ))}

      {/* Interactive Government Department Buildings */}
      {deptBuildings.map((dept, idx) => {
        const isHighlighted = !activeDepartmentFilter || activeDepartmentFilter === 'ALL' || activeDepartmentFilter === dept.code;

        return (
          <group key={idx} position={dept.pos as [number, number, number]}>
            <mesh onClick={() => onSelectDepartmentBuilding && onSelectDepartmentBuilding(dept.name)}>
              <boxGeometry args={[2.5, 4, 2.5]} />
              <meshStandardMaterial
                color={dept.color}
                emissive={dept.color}
                emissiveIntensity={isHighlighted ? 0.6 : 0.1}
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
            {/* Holographic Roof Beacon */}
            <mesh position={[0, 2.2, 0]}>
              <cylinderGeometry args={[0.2, 0.4, 0.4, 16]} />
              <meshBasicMaterial color={dept.color} />
            </mesh>

            {/* Department Label HTML Overlay */}
            <Html distanceFactor={18} position={[0, 2.8, 0]} center>
              <div
                onClick={() => onSelectDepartmentBuilding && onSelectDepartmentBuilding(dept.name)}
                className={`cursor-pointer px-3 py-1.5 rounded-xl border backdrop-blur-xl text-xs font-mono font-bold whitespace-nowrap transition-all shadow-xl flex items-center gap-1.5 ${
                  isHighlighted
                    ? 'bg-slate-950/95 text-white scale-110 shadow-glowCyan'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 opacity-60'
                }`}
                style={{ borderColor: dept.color }}
              >
                <span>{dept.icon}</span>
                <span>{dept.name}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Smart City Park & Trees */}
      <group position={[0, 0.1, -12]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 6]} />
          <meshStandardMaterial color="#059669" roughness={0.9} />
        </mesh>
        {[-4, -2, 0, 2, 4].map((tx, idx) => (
          <group key={idx} position={[tx, 0.6, 0]}>
            <mesh>
              <coneGeometry args={[0.6, 1.2, 8]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>
          </group>
        ))}
      </group>

      {/* River & Holographic Bridge */}
      <group position={[12, 0.05, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 30]} />
          <meshBasicMaterial color="#0284C7" transparent opacity={0.7} />
        </mesh>
        {/* Holographic Bridge */}
        <mesh position={[-2, 0.5, 0]}>
          <boxGeometry args={[4, 0.2, 3]} />
          <meshStandardMaterial color="#38BDF8" metalness={0.8} />
        </mesh>
      </group>

      {/* Main Avenues & Crossroad Traffic Grid */}
      <gridHelper args={[32, 32, '#06B6D4', '#1E293B']} position={[0, 0, 0]} />

      {/* Moving Traffic Vehicles */}
      <group ref={vehiclesRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0.2, 0]}>
            <boxGeometry args={[0.6, 0.3, 0.3]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#38BDF8' : '#F43F5E'} emissive={i % 2 === 0 ? '#38BDF8' : '#F43F5E'} emissiveIntensity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
