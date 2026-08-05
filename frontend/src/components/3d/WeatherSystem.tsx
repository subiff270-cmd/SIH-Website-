import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WeatherSystemProps {
  weather: 'sunny' | 'rain' | 'storm' | 'fog';
  isNight: boolean;
}

export const WeatherSystem: React.FC<WeatherSystemProps> = ({ weather, isNight }) => {
  const rainRef = useRef<THREE.Points>(null);

  // Generate Rain particle positions
  const rainGeo = useMemo(() => {
    const count = weather === 'storm' ? 3000 : 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [weather]);

  useFrame((state, delta) => {
    if (rainRef.current && (weather === 'rain' || weather === 'storm')) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      const speed = weather === 'storm' ? 0.8 : 0.4;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= speed;
        if (positions[i] < 0) positions[i] = 30;
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Day / Night Environment Lighting */}
      <ambientLight intensity={isNight ? 0.2 : 0.8} />
      <directionalLight
        position={isNight ? [-10, 10, -10] : [20, 30, 20]}
        intensity={isNight ? 0.4 : 1.5}
        color={isNight ? '#38BDF8' : '#FFF5EA'}
      />
      {isNight && <pointLight position={[0, 12, 0]} intensity={3} color="#06B6D4" distance={35} />}

      {/* Fog */}
      {(weather === 'fog' || weather === 'storm') && <fog attach="fog" args={['#080C14', 10, 32]} />}

      {/* Rain Particles */}
      {(weather === 'rain' || weather === 'storm') && (
        <points ref={rainRef} geometry={rainGeo}>
          <pointsMaterial size={0.12} color="#06B6D4" transparent opacity={0.6} />
        </points>
      )}
    </group>
  );
};
