import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

// 3D Topographic Model of India with Indian Cities & ISRO Satellites
const IndiaModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += delta * 0.2; // Rotate ISRO Satellites overhead
    }
  });

  // Indian Cities relative X, Z positions on India map mesh
  const indianStatePins = [
    { name: 'New Delhi (NCR Zone)', x: -0.3, z: -0.9, issues: '2,450 Defects', color: '#06B6D4', dept: 'PWD & Water Board' },
    { name: 'Mumbai (BMC Region)', x: -0.9, z: 0.2, issues: '1,890 Defects', color: '#A855F7', dept: 'Drainage & Waste' },
    { name: 'Bengaluru (BBMP Tech Ward)', x: -0.2, z: 1.1, issues: '1,120 Defects', color: '#10B981', dept: 'Pothole Triage' },
    { name: 'Chennai (GCC Matrix)', x: 0.3, z: 1.2, issues: '840 Defects', color: '#F59E0B', dept: 'Flood Pump Grid' },
    { name: 'Hyderabad (GHMC Circle)', x: 0.0, z: 0.5, issues: '650 Defects', color: '#EC4899', dept: 'Electrical Grid' },
    { name: 'Kolkata (KMC Zone)', x: 1.1, z: -0.1, issues: '490 Defects', color: '#3B82F6', dept: 'Waste Management' }
  ];

  return (
    <group ref={groupRef}>
      
      {/* 3D Main Base Terrain Mesh of India */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[4.2, 5.2, 32, 32]} />
        <meshStandardMaterial
          color="#081526"
          roughness={0.4}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>

      {/* Glowing India Border Boundary Slab */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[2.4, 2.6, 0.2, 6]} />
        <meshStandardMaterial color="#030E1F" emissive="#06B6D4" emissiveIntensity={0.15} />
      </mesh>

      {/* Floating 3D City Defect Beacons across India */}
      {indianStatePins.map((pin, idx) => (
        <group key={idx} position={[pin.x, 0.1, pin.z]}>
          {/* Vertical Laser Telemetry Beam */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            <meshBasicMaterial color={pin.color} transparent opacity={0.8} />
          </mesh>

          {/* Pulsing Beacon Sphere */}
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color={pin.color} />
          </mesh>

          {/* HTML Telemetry Card Badge */}
          <Html distanceFactor={8} position={[0, 1.1, 0]}>
            <div className="px-3 py-1.5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-glowCyan backdrop-blur-xl space-y-0.5">
              <span className="font-bold text-white block">{pin.name}</span>
              <div className="flex items-center justify-between gap-3 text-[10px]">
                <span className="text-emerald-400 font-bold">{pin.issues}</span>
                <span className="text-slate-400">{pin.dept}</span>
              </div>
            </div>
          </Html>
        </group>
      ))}

      {/* ISRO NavIC Satellites Constellation Orbiting Overhead */}
      <group ref={orbitRef} position={[0, 1.8, 0]}>
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[3.2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} />
        </mesh>

        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * Math.PI * 2) / 7;
          const x = 3.2 * Math.cos(angle);
          const z = 3.2 * Math.sin(angle);
          return (
            <mesh key={i} position={[x, 0.4 * Math.sin(angle), z]}>
              <boxGeometry args={[0.15, 0.08, 0.15]} />
              <meshBasicMaterial color="#F59E0B" />
              <Html distanceFactor={10} position={[0, 0.2, 0]}>
                <div className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-[9px] font-mono text-amber-300 font-bold">
                  ISRO NavIC-1{String.fromCharCode(65 + i)}
                </div>
              </Html>
            </mesh>
          );
        })}
      </group>

    </group>
  );
};

export const IndiaMapCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-[#040810]">
      {/* Top Banner */}
      <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 backdrop-blur-md shadow-glowCyan">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        3D India Digital Twin (Rotate, Zoom & Explore Indian Municipal Wards)
      </div>

      <Canvas camera={{ position: [0, 4, 4.5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} />
        <pointLight position={[-10, 10, -10]} intensity={0.6} color="#06B6D4" />
        <Stars radius={100} depth={50} count={2500} factor={4} saturation={0.5} fade speed={1} />
        
        <IndiaModel />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.8}
          zoomSpeed={0.8}
          minDistance={2.5}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
};
