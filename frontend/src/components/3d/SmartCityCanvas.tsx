import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { CityBuildings } from './CityBuildings';
import { DroneSwarm } from './DroneSwarm';
import { WeatherSystem } from './WeatherSystem';
import { HolographicPanels } from './HolographicPanels';
import { IssueMarkers3D } from './IssueMarkers3D';
import { Complaint } from '../../types';

interface SmartCityCanvasProps {
  complaints?: Complaint[];
  activeDepartmentFilter?: string;
  weather?: 'sunny' | 'rain' | 'storm' | 'fog';
  isNight?: boolean;
  onSelectComplaint?: (c: Complaint) => void;
  onSelectDepartmentBuilding?: (deptName: string) => void;
}

export const SmartCityCanvas: React.FC<SmartCityCanvasProps> = ({
  complaints = [],
  activeDepartmentFilter = 'ALL',
  weather = 'sunny',
  isNight = true,
  onSelectComplaint,
  onSelectDepartmentBuilding
}) => {
  return (
    <div className="w-full h-full relative bg-[#040810] z-10 overflow-hidden">
      <Canvas
        camera={{ position: [25, 22, 25], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#040810' }}
      >
        <Suspense fallback={null}>
          <WeatherSystem weather={weather} isNight={isNight} />
          
          <Stars
            radius={100}
            depth={50}
            count={isNight ? 2500 : 500}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />

          <CityBuildings
            activeDepartmentFilter={activeDepartmentFilter}
            onSelectDepartmentBuilding={onSelectDepartmentBuilding}
          />

          {complaints && complaints.length > 0 && (
            <IssueMarkers3D complaints={complaints} onSelectComplaint={onSelectComplaint} />
          )}

          <DroneSwarm />

          {/* Holographic HUD Panels */}
          <HolographicPanels />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={10}
          maxDistance={60}
          autoRotate={true}
          autoRotateSpeed={1.0}
        />
      </Canvas>
    </div>
  );
};
