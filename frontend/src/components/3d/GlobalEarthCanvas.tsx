import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';

// 3D Rotating Earth Sphere with Pulsing India Marker Pins & ISRO Satellite Orbits
const EarthSphere = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const orbitRingRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08; // Slow 360 degree idle spin
    }
    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.y += delta * 0.15; // ISRO Satellites Orbit rotation
    }
  });

  // Indian Cities Lat/Lng projected onto 3D Sphere (Radius = 2.5)
  // Latitude ~20°N, Longitude ~78°E
  const convertLatLngToVector3 = (lat: number, lng: number, radius: number = 2.52) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  const indianCities = [
    { name: 'New Delhi (NCR Ward)', lat: 28.6139, lng: 77.2090, issues: '2,450 Defects', color: '#06B6D4' },
    { name: 'Mumbai (BMC Region)', lat: 19.0760, lng: 72.8777, issues: '1,890 Defects', color: '#A855F7' },
    { name: 'Bengaluru (BBMP Smart Zone)', lat: 12.9716, lng: 77.5946, issues: '1,120 Defects', color: '#10B981' },
    { name: 'Chennai (GCC Matrix)', lat: 13.0827, lng: 80.2707, issues: '840 Defects', color: '#F59E0B' }
  ];

  return (
    <group>
      {/* Earth Main Sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#0B192C"
          roughness={0.6}
          metalness={0.2}
          wireframe={false}
          emissive="#030F1E"
        />

        {/* Atmosphere Glow Outer Shell */}
        <mesh>
          <sphereGeometry args={[2.55, 32, 32]} />
          <meshBasicMaterial
            color="#06B6D4"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* India Hotspot Pulse Markers */}
        {indianCities.map((city, idx) => {
          const pos = convertLatLngToVector3(city.lat, city.lng, 2.53);
          return (
            <group key={idx} position={pos}>
              {/* Glowing Pulse Dot */}
              <mesh>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={city.color} />
              </mesh>
              {/* HTML Telemetry Tag */}
              <Html distanceFactor={10} position={[0, 0.15, 0]}>
                <div className="px-2.5 py-1 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-glowCyan backdrop-blur-md">
                  <span className="font-bold text-white block">{city.name}</span>
                  <span className="text-emerald-400">{city.issues}</span>
                </div>
              </Html>
            </group>
          );
        })}
      </mesh>

      {/* ISRO NavIC 7-Satellite Constellation Orbit Ring */}
      <group ref={orbitRingRef}>
        <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[3.6, 0.01, 16, 100]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.4} />
        </mesh>

        {/* ISRO Satellites floating on Orbit */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = (i * Math.PI * 2) / 7;
          const x = 3.6 * Math.cos(angle);
          const z = 3.6 * Math.sin(angle);
          return (
            <mesh key={i} position={[x, 0.8 * Math.sin(angle), z]}>
              <boxGeometry args={[0.12, 0.08, 0.12]} />
              <meshBasicMaterial color="#F59E0B" />
              <Html distanceFactor={12} position={[0, 0.2, 0]}>
                <div className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400 text-[8px] font-mono text-amber-300">
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

export const GlobalEarthCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-[#040810]">
      {/* 360 Orbit Controls Instruction Banner */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 backdrop-blur-md shadow-glowCyan">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        360° Interactive Earth (Click & Drag to Rotate Globe 360°)
      </div>

      <Canvas camera={{ position: [0, 1, 6.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06B6D4" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
        
        <EarthSphere />
        
        {/* Full 360 Orbit Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.8}
          zoomSpeed={0.8}
          minDistance={3.5}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
};
