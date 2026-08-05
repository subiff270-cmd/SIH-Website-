import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Cpu, Heart, CheckCircle2, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#05080E] border-t border-cyan-500/20 text-slate-400 pt-16 pb-8 overflow-hidden">
      {/* Background Glow Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                Civic<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation crowdsourced civic issue reporting platform powered by YOLOv8 Computer Vision, geospatial duplicate detection, and automated department routing.
            </p>
            {/* Live Operational System Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Neural Triage Matrix: 100% Operational
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/digital-twin" className="hover:text-cyan-400 transition-colors">3D Digital Twin</Link></li>
              <li><Link to="/map" className="hover:text-cyan-400 transition-colors">Geospatial Issue Map</Link></li>
              <li><Link to="/report" className="hover:text-cyan-400 transition-colors">Report New Issue</Link></li>
              <li><Link to="/dashboard/citizen" className="hover:text-cyan-400 transition-colors">Citizen Rewards Hub</Link></li>
            </ul>
          </div>

          {/* Governance & Departments */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">Governance</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard/admin" className="hover:text-cyan-400 transition-colors">City Command Center</Link></li>
              <li><Link to="/dashboard/officer" className="hover:text-cyan-400 transition-colors">Department Officer Triage</Link></li>
              <li><Link to="/dashboard/worker" className="hover:text-cyan-400 transition-colors">Field Worker Dispatch</Link></li>
              <li><a href="#sih" className="hover:text-cyan-400 transition-colors">Smart India Hackathon Specs</a></li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">Tech Architecture</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">React 19</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Three.js / R3F</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">FastAPI</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">YOLOv8 Vision</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">PostgreSQL</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Docker</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Smart India Hackathon (SIH) 2026.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>© 2026 CivicAI Inc. All rights reserved.</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> ISO 27001 Certified Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
