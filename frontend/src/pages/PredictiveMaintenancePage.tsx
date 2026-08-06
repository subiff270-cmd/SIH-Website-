import React from 'react';
import { PredictiveMaintenanceHub } from '../components/ai/PredictiveMaintenanceHub';

export const PredictiveMaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <PredictiveMaintenanceHub />
      </div>
    </div>
  );
};
