import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  ThumbsUp, 
  PlusCircle, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  Ticket,
  Gift,
  Star,
  Layers,
  Map as MapIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssueContext';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';

export const CitizenDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { complaints, upvoteComplaint } = useIssues();

  const [activeTab, setActiveTab] = useState<'3d_city' | 'my_tickets' | 'rewards' | 'community'>('3d_city');

  const myComplaints = complaints.filter(
    (c) => c.reportedBy.id === currentUser?.id || !c.reportedBy.isAnonymous
  );

  const nearbyComplaints = complaints.filter((c) => c.reportedBy.id !== currentUser?.id);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP CITIZEN HEADER BANNER */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/40 shadow-glowCyan flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-2xl border-2 border-cyan-400 object-cover shadow-glowCyan"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest px-2.5 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40">
                  CITIZEN DEDICATED PORTAL
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> Gold Level Guardian
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white font-display mt-1">
                Welcome, {currentUser?.name || 'Aarav Sharma'}
              </h1>
              <p className="text-xs text-slate-400">Explore neighborhood 3D city twin, track reported tickets & redeem tax rebate points.</p>
            </div>
          </div>

          {/* Gamified Rewards Card */}
          <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30 shadow-inner">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-glowCyan">
              <Award className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">CIVIC REWARD BALANCE</span>
              <span className="text-2xl font-extrabold font-mono text-amber-400">{currentUser?.rewardPoints || 480} PTS</span>
            </div>
            <Link
              to="/report"
              className="btn-neon ml-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs shadow-glowCyan flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" /> Report Defect
            </Link>
          </div>
        </div>

        {/* CITIZEN DASHBOARD TABS */}
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('3d_city')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === '3d_city'
                ? 'bg-cyan-500 text-black shadow-glowCyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Citizen 3D City Twin
          </button>
          <button
            onClick={() => setActiveTab('my_tickets')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'my_tickets'
                ? 'bg-cyan-500 text-black shadow-glowCyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" /> My Reported Tickets ({myComplaints.length})
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'rewards'
                ? 'bg-amber-500 text-black shadow-glowCyan'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-4 h-4" /> Rewards & Tax Vouchers
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
              activeTab === 'community'
                ? 'bg-purple-500 text-white shadow-glowPurple'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <ThumbsUp className="w-4 h-4" /> Community Feed
          </button>
        </div>

        {/* TAB 1: CITIZEN DEDICATED 3D CITY TWIN VIEW */}
        {activeTab === '3d_city' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">Neighborhood Ward 3D Digital Twin</h3>
                <p className="text-xs text-slate-400 font-mono">Pulsing pins represent crowdsourced reports logged by citizens in your municipal ward.</p>
              </div>
              <Link to="/map" className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                <MapIcon className="w-3.5 h-3.5" /> Open Full Leaflet Map
              </Link>
            </div>

            <div className="w-full h-[500px] relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-glassCard">
              <SmartCityCanvas
                complaints={complaints}
                activeDepartmentFilter="ALL"
                weather="sunny"
                isNight={true}
              />
            </div>
          </div>
        )}

        {/* TAB 2: MY TICKETS TIMELINE */}
        {activeTab === 'my_tickets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {myComplaints.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                            {item.ticketNumber}
                          </span>
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                            item.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white font-display mt-1">{item.title}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {item.location.address}
                        </p>
                      </div>
                    </div>

                    <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glowEmerald'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-glowCyan'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Live Progress Timeline */}
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase mb-3">Live Resolution Progress Timeline</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      {['SUBMITTED', 'AI_VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].map((step) => {
                        const isDone = item.timeline.some((t) => t.status === step);
                        const isCurrent = item.status === step;

                        return (
                          <div
                            key={step}
                            className={`p-3 rounded-2xl border text-center font-mono text-[10px] flex flex-col items-center gap-1 transition-all ${
                              isCurrent
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glowCyan'
                                : isDone
                                ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
                                : 'bg-slate-950/40 border-slate-800 text-slate-600'
                            }`}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                            <span className="font-bold">{step.replace('_', ' ')}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Resolution Photo if Completed */}
                  {item.afterImageUrl && (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-4">
                      <img src={item.afterImageUrl} alt="After repair" className="w-20 h-20 rounded-xl object-cover border border-emerald-500/50" />
                      <div>
                        <span className="text-xs font-bold text-emerald-300 block">Verified Work Order Photo Uploaded</span>
                        <p className="text-xs text-slate-300">"Work crew patched road crater with high-density asphalt."</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REWARDS & REBATES */}
        {activeTab === 'rewards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '₹500 Property Tax Rebate', cost: 400, desc: 'Deduct ₹500 from annual municipal property tax bill.', code: 'TAX-REBATE-500' },
              { title: '1-Month Metro Pass', cost: 300, desc: 'Free 30-day city transit metro & bus pass.', code: 'METRO-PASS-30D' },
              { title: 'Civic Guardian Badge', cost: 150, desc: 'Verified Gold Badge on municipal public portal.', code: 'BADGE-GOLD' }
            ].map((v, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border border-amber-500/30 space-y-4 text-center">
                <Gift className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-white font-display">{v.title}</h3>
                <p className="text-xs text-slate-400">{v.desc}</p>
                <div className="text-amber-400 font-mono font-bold text-sm">{v.cost} POINTS</div>
                <button className="btn-neon w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs shadow-glowCyan">
                  Redeem Voucher
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: COMMUNITY FEED */}
        {activeTab === 'community' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nearbyComplaints.map((c) => (
              <div key={c.id} className="glass-card p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={c.imageUrl} alt={c.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <span className="text-xs font-mono text-cyan-300 font-bold">{c.ticketNumber}</span>
                    <h4 className="font-bold text-sm text-white">{c.title}</h4>
                    <span className="text-[10px] text-slate-400">{c.location.address}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-rose-400 font-mono font-bold">{c.severity}</span>
                  <button
                    onClick={() => upvoteComplaint(c.id)}
                    className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono flex items-center gap-1 hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" /> {c.upvotesCount} Upvotes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
