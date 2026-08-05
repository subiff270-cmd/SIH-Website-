import React from 'react';
import { Cpu } from 'lucide-react';

export const LoadingScreen: React.FC<{ onComplete?: () => void }> = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080C14] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-500/40 border-t-cyan-400 animate-spin flex items-center justify-center shadow-glowCyan">
          <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
        <span className="text-xs font-mono text-cyan-300 font-bold tracking-widest uppercase">
          Initializing CivicAI Smart City OS...
        </span>
      </div>
    </div>
  );
};
