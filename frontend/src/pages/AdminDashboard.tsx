import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  Building2, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Users, 
  Activity, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { CITY_ANALYTICS, DEPARTMENT_STATS } from '../mockData';
import { useIssues } from '../context/IssueContext';

export const AdminDashboard: React.FC = () => {
  const { complaints } = useIssues();

  const pieColors = ['#06B6D4', '#3B82F6', '#8B5CF6', '#F59E0B', '#F43F5E'];

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Command Banner */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-glassCard flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block">CITY COMMAND CENTER</span>
              <h1 className="text-2xl font-bold text-white font-display">Executive Analytics & Governance</h1>
              <p className="text-xs text-slate-400">Real-time SLA tracking, AI accuracy monitoring, and department load rebalancing.</p>
            </div>
          </div>

          <button
            onClick={() => alert('Downloading Municipal Executive SLA Report (PDF)...')}
            className="btn-neon px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 hover:bg-cyan-500 hover:text-black transition-all"
          >
            <Download className="w-4 h-4" /> Export Analytics PDF/CSV
          </button>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-5 rounded-2xl border border-cyan-500/20 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">TOTAL REPORTED ISSUES</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold font-mono text-cyan-400">{CITY_ANALYTICS.totalIssuesReported.toLocaleString()}</span>
              <span className="text-xs text-emerald-400 font-mono flex items-center">+12% <ArrowUpRight className="w-3 h-3" /></span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-emerald-500/20 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">RESOLVED WITHIN SLA</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold font-mono text-emerald-400">{CITY_ANALYTICS.totalResolved.toLocaleString()}</span>
              <span className="text-xs text-emerald-400 font-mono">91.6% SLA</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-purple-500/20 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">AI TRIAGE ACCURACY</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold font-mono text-purple-400">{CITY_ANALYTICS.aiAccuracyPercent}%</span>
              <span className="text-xs text-purple-300 font-mono">YOLOv8 Engine</span>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-rose-500/20 space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">CRITICAL UNRESOLVED</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold font-mono text-rose-400">{CITY_ANALYTICS.activeCriticalIssues}</span>
              <span className="text-xs text-rose-400 font-mono animate-pulse">Escalated</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Weekly Resolution Trend Line Chart */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold font-display text-white flex items-center justify-between">
              Weekly Resolution Trend vs Reported
              <span className="text-xs font-mono text-cyan-400">Live Feed</span>
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CITY_ANALYTICS.weeklyResolutionTrend}>
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#06B6D4', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="reported" stroke="#F43F5E" strokeWidth={2} dot={false} name="Reported" />
                  <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} dot={false} name="Resolved" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Issues by Category Bar Chart */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Issues Breakdown by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CITY_ANALYTICS.issuesByCategory}>
                  <XAxis dataKey="category" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#06B6D4', borderRadius: '12px' }} />
                  <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Department SLA Matrix Table */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold font-display text-white">Department Performance & SLA Compliance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase">
                  <th className="pb-3">Department Name</th>
                  <th className="pb-3">Total Tickets</th>
                  <th className="pb-3">Resolved</th>
                  <th className="pb-3">Avg Resolution Time</th>
                  <th className="pb-3">SLA Compliance</th>
                  <th className="pb-3">Active Workers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {DEPARTMENT_STATS.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-900/50">
                    <td className="py-3 font-bold text-white font-sans">{dept.name}</td>
                    <td className="py-3">{dept.totalTickets}</td>
                    <td className="py-3 text-emerald-400">{dept.resolvedTickets}</td>
                    <td className="py-3">{dept.avgResolutionHours} hrs</td>
                    <td className="py-3 text-cyan-300 font-bold">{dept.slaCompliancePercent}%</td>
                    <td className="py-3">{dept.activeWorkers} Field Crews</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
