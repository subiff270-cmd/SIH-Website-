import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Cpu, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sun, 
  Moon, 
  Flame,
  UserCheck,
  Wrench,
  Award,
  PlusCircle,
  Building,
  X,
  Shield,
  Droplets,
  Zap,
  Trash2,
  Eye,
  Brain,
  Target,
  Layers,
  Database,
  Wifi,
  BarChart3,
  Users,
  FileCheck,
  MessageSquare,
  Clock,
  Star,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle
} from 'lucide-react';
import { SmartCityCanvas } from '../components/3d/SmartCityCanvas';
import { StepVisualizer } from '../components/common/StepVisualizer';
import { useIssues } from '../context/IssueContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Complaint } from '../types';

/* ── Animated Counter Hook ─────────────────────────────────── */
const useAnimatedCounter = (target: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true });

  useEffect(() => {
    if (!startOnView || !isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration, startOnView]);

  return { count, ref };
};

/* ── Scroll Section Wrapper ────────────────────────────────── */
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => (
  <motion.section
    initial={{ opacity: 0.3, scale: 0.70, y: 60 }}
    whileInView={{ opacity: 1, scale: 1.0, y: 0 }}
    viewport={{ once: false, margin: '-80px' }}
    transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { complaints } = useIssues();
  const { currentUser, switchRole } = useAuth();
  const { t } = useLanguage();
  const cityCanvasRef = useRef<HTMLDivElement>(null);

  // 3D Canvas state controls
  const [activeDeptFilter, setActiveDeptFilter] = useState<string>('ALL');
  const [weather, setWeather] = useState<'sunny' | 'rain' | 'storm' | 'fog'>('sunny');
  const [isNight, setIsNight] = useState<boolean>(true);
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);

  // Modals state
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedDept, setSelectedDept] = useState<any | null>(null);

  // 3-Step Lifecycle Visualizer
  const [storyStep, setStoryStep] = useState<number>(0);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const storySteps = [
    { title: '1. Citizen Snaps Photo & Reports', desc: 'Citizen uploads camera defect photo with original GPS location and voice note.', icon: MapPin },
    { title: '2. Officer Approves & Dispatches', desc: 'Department Officer reviews AI triage, validates severity, and dispatches worker with a push notification.', icon: UserCheck },
    { title: '3. Worker Resolves & Citizen Earns Points', desc: 'Field worker repairs defect, uploads resolution photo, and citizen receives +50 reward points!', icon: Award }
  ];

  const departments = [
    { name: t.pwdName, abbr: 'PWD', icon: Wrench, color: 'cyan', issues: t.pwdDesc, count: complaints?.filter(c => c?.department?.name?.includes('Public Works') || c?.category === 'POTHOLE').length || 12 },
    { name: t.swmName, abbr: 'SWM', icon: Trash2, color: 'emerald', issues: t.swmDesc, count: complaints?.filter(c => c?.department?.name?.includes('Waste') || c?.category === 'GARBAGE').length || 8 },
    { name: t.wsdName, abbr: 'WSD', icon: Droplets, color: 'blue', issues: t.wsdDesc, count: complaints?.filter(c => c?.department?.name?.includes('Water') || c?.category === 'WATER_LEAKAGE').length || 6 },
    { name: t.elecName, abbr: 'ELEC', icon: Zap, color: 'amber', issues: t.elecDesc, count: complaints?.filter(c => c?.department?.name?.includes('Electrical') || c?.category === 'STREET_LIGHT').length || 5 },
    { name: t.swdName, abbr: 'SWD', icon: Droplets, color: 'purple', issues: t.swdDesc, count: complaints?.filter(c => c?.category === 'DRAINAGE' || c?.category === 'MANHOLE').length || 4 },
    { name: t.safeName, abbr: 'SAFE', icon: Shield, color: 'rose', issues: t.safeDesc, count: complaints?.filter(c => c?.category === 'FALLEN_TREE').length || 3 },
  ];

  const techStack = [
    { name: 'YOLOv8 Object Detection', desc: 'Custom-trained model detects 12+ civic defect classes from camera photos with 96.8% mAP score.', icon: Eye, color: 'cyan' },
    { name: 'Haversine Geo-Dedup', desc: 'Merges duplicate complaints within 500m radius using GPS lat/long distance formula.', icon: Target, color: 'purple' },
    { name: 'NLP Sentiment Triage', desc: 'Extracts severity keywords from voice notes & text descriptions using transformer models.', icon: Brain, color: 'emerald' },
    { name: 'React Three Fiber', desc: '3D Smart City digital twin with real-time complaint pins, weather simulation & drone surveillance.', icon: Layers, color: 'amber' },
    { name: 'FastAPI + MongoDB', desc: 'High-performance async REST API with NoSQL document storage for flexible complaint schemas.', icon: Database, color: 'blue' },
    { name: 'WebSocket Live Feed', desc: 'Real-time push notifications to officers & workers when new complaints arrive or status changes.', icon: Wifi, color: 'rose' },
  ];

  const faqItems = [
    { q: 'How does the AI classify my photo?', a: 'Our YOLOv8 model was trained on 15,000+ labeled images of Indian civic defects. When you upload a photo, the model identifies the defect type (pothole, garbage, leak, etc.), confidence score, and recommended severity level within 2 seconds.' },
    { q: 'What happens after I report an issue?', a: 'Your report goes through a 3-step pipeline: (1) AI auto-classifies and verifies GPS location, (2) The department officer reviews and approves the triage, then dispatches a field worker, (3) The worker visits the site, fixes the issue, and uploads a resolution photo.' },
    { q: 'How does the reward system work?', a: 'Citizens earn points for every valid report: +50 points per verified report, +25 bonus for high-quality photos, and +100 for being the first to report a critical issue. Points can be redeemed for municipal tax rebates, bus passes, and metro cards.' },
    { q: 'Can I track my complaint in real-time?', a: 'Yes! Every complaint gets a unique ticket number (e.g., CV-8910). You can track its status in your citizen dashboard — from AI_VERIFIED → OFFICER_APPROVED → WORKER_ASSIGNED → IN_PROGRESS → RESOLVED, with timestamps at each stage.' },
    { q: 'What is the 3D Digital Twin?', a: 'The 3D Smart City Twin is a real-time WebGL visualization of the entire municipal area. It shows pulsing pins for active complaints, department buildings, surveillance drones, and weather conditions. Officers can use it for city-wide situational awareness.' },
  ];

  // Animated counters
  const totalReports = useAnimatedCounter(complaints?.length || 247);
  const resolvedCount = useAnimatedCounter(complaints?.filter(c => c?.status === 'COMPLETED').length || 189);
  const activeWorkers = useAnimatedCounter(42);
  const citizenCount = useAnimatedCounter(1580);

  const handleEmergencyTrigger = () => {
    setEmergencyMode(true);
    if (complaints && complaints.length > 0) {
      const critical = complaints.find((c) => c?.severity === 'CRITICAL') || complaints[0];
      if (critical) {
        setSelectedComplaint(critical);
      }
    }
  };

  const handleDepartmentClick = (dept: any) => {
    setActiveDeptFilter(dept.abbr);
    setSelectedDept(dept);
  };

  // Recent activity feed from complaints
  const activityFeed = (complaints || []).slice(0, 6).map((c, i) => ({
    ticket: c?.ticketNumber || `CV-${8900 + i}`,
    title: c?.title || 'Civic Issue Report',
    category: c?.category || 'General',
    severity: c?.severity || 'MEDIUM',
    status: c?.status || 'AI_VERIFIED',
    time: c?.createdAt ? new Date(c.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : `${10 + i}:${30 + i * 5} AM`,
    rawComplaint: c
  }));

  const severityColor = (s: string) => {
    switch (s) {
      case 'CRITICAL': return 'text-rose-400 bg-rose-500/20 border-rose-500/40';
      case 'HIGH': return 'text-amber-400 bg-amber-500/20 border-amber-500/40';
      case 'MEDIUM': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/40';
    }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'RESOLVED': case 'COMPLETED': return 'text-emerald-400';
      case 'IN_PROGRESS': case 'WORKER_ASSIGNED': return 'text-amber-400';
      case 'OFFICER_APPROVED': return 'text-purple-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080C14] text-slate-100 overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Glow Mesh */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Emergency Alert Banner */}
      <AnimatePresence>
        {emergencyMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-50 bg-rose-600/90 border-b border-rose-400 text-white py-2.5 px-4 flex items-center justify-between text-xs font-mono backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.8)]"
          >
            <div className="flex items-center gap-2 max-w-7xl mx-auto">
              <AlertTriangle className="w-4 h-4 text-amber-300 animate-bounce" />
              <span className="font-extrabold uppercase tracking-wider">CRITICAL EMERGENCY DETECTED:</span>
              <span>Autonomous drones dispatched to main arterial pipeline rupture!</span>
            </div>
            <button onClick={() => setEmergencyMode(false)} className="text-white hover:text-amber-200 font-bold">
              Dismiss Alert [X]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ HERO TOP SECTION ═══════════════ */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-glowCyan">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            {t.heroBadge}
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight leading-none drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            {t.heroTitleMain}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed">
            {t.heroSub}
          </p>

          {/* DYNAMIC ROLE PORTAL CTA BUTTON */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {currentUser?.role === 'officer' ? (
              <Link
                to="/dashboard/officer"
                className="btn-neon px-8 py-4 rounded-2xl bg-purple-600 text-white font-bold text-sm shadow-glowPurple flex items-center gap-2"
              >
                <Building className="w-5 h-5" /> Open Officer Pending Triage Requests ({complaints ? complaints.filter(c => c?.status === 'AI_VERIFIED').length : 0})
              </Link>
            ) : currentUser?.role === 'worker' ? (
              <Link
                to="/dashboard/worker"
                className="btn-neon px-8 py-4 rounded-2xl bg-emerald-500 text-black font-bold text-sm shadow-glowEmerald flex items-center gap-2"
              >
                <Wrench className="w-5 h-5" /> Open Worker Approved Work Tasks
              </Link>
            ) : (
              <>
                <Link
                  to="/report"
                  className="btn-neon px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm shadow-glowCyan flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" /> {t.ctaReport}
                </Link>
                <Link
                  to="/dashboard/citizen"
                  className="px-6 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs font-mono flex items-center gap-2"
                >
                  {t.ctaTrack}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* PROJECT HIGH-IMPACT TELEMETRY METRICS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="glass-card p-5 rounded-3xl border border-cyan-500/30 text-center space-y-1 shadow-glowCyan">
            <Cpu className="w-6 h-6 text-cyan-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">{t.statTriageAcc}</span>
            <span className="text-xl font-extrabold text-cyan-300">96.8% Precision</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-emerald-500/30 text-center space-y-1 shadow-glowEmerald">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">{t.statResolutionSpeed}</span>
            <span className="text-xl font-extrabold text-emerald-300">1.2 Days SLA</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-purple-500/30 text-center space-y-1 shadow-glowPurple">
            <Building2 className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">{t.statWardsCovered}</span>
            <span className="text-xl font-extrabold text-purple-300">32 City Zones</span>
          </div>

          <div className="glass-card p-5 rounded-3xl border border-amber-500/30 text-center space-y-1 shadow-glowCyan">
            <Award className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="text-[10px] text-slate-400 block uppercase">{t.statRewards}</span>
            <span className="text-xl font-extrabold text-amber-300">₹4.2 Lakh Rebates</span>
          </div>
        </div>

      </section>

      {/* ═══════════════ 3D SMART CITY SECTION ═══════════════ */}
      <ScrollReveal className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4 z-10 relative">
        {/* Controls Toolbar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display text-white flex items-center gap-2">
              <Building2 className="w-6 h-6 text-cyan-400" /> {t.twinTitle}
            </h2>
            <p className="text-xs text-slate-400 font-mono">{t.twinSub}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
            {activeDeptFilter !== 'ALL' && (
              <button
                onClick={() => setActiveDeptFilter('ALL')}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1"
              >
                Filter: {activeDeptFilter} [X]
              </button>
            )}
            <button
              onClick={() => setIsNight(!isNight)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 hover:border-cyan-400"
            >
              {isNight ? <Moon className="w-3.5 h-3.5 text-purple-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {isNight ? t.nightView : t.daylight}
            </button>

            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 outline-none"
            >
              <option value="sunny">{t.clearWeather}</option>
              <option value="rain">{t.rainMode}</option>
              <option value="storm">{t.monsoonStorm}</option>
              <option value="fog">{t.fogGrid}</option>
            </select>

            <button
              onClick={handleEmergencyTrigger}
              className="btn-neon px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-mono font-bold text-xs shadow-glowRose flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> {t.emergencyFocus}
            </button>
          </div>
        </div>

        {/* 3D Canvas Box */}
        <div
          ref={cityCanvasRef}
          className="w-full h-[540px] md:h-[640px] relative rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.4)]"
        >
          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 backdrop-blur-md shadow-glowCyan">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            3D Smart City Twin (Active: {activeDeptFilter})
          </div>

          <SmartCityCanvas
            complaints={complaints || []}
            activeDepartmentFilter={activeDeptFilter}
            weather={weather}
            isNight={isNight}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        </div>

        {/* ═══════════════ 3D DIGITAL TWIN SYSTEM EXPLANATION & HOW-TO-USE GUIDE ═══════════════ */}
        <div className="mt-8 glass-card p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-glowCyan space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-bold block">
                  SYSTEM ARCHITECTURE GUIDE
                </span>
                <h3 className="text-xl font-bold text-white font-display">How to Use the 3D Digital Twin City</h3>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
              Live WebGL Telemetry Engine Active
            </span>
          </div>

          {/* How-To-Use 4 Step Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                <span className="p-1.5 rounded-lg bg-cyan-500/20">🖱️ 01</span>
                <span>Orbit & Zoom Controls</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Click & drag mouse to rotate 360° around the city grid. Scroll wheel zooms from city-wide overview down to street level.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
                <span className="p-1.5 rounded-lg bg-purple-500/20">🏢 02</span>
                <span>Click Department Buildings</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Click PWD, Solid Waste, or Electrical HQ buildings to highlight department jurisdiction and filter active defect pins.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <span className="p-1.5 rounded-lg bg-emerald-500/20">📍 03</span>
                <span>Click Pulsing Defect Pins</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Click pulsing red/amber pins (Pothole, Water Leak, Garbage) to open live photo inspection, EXIF GPS data & worker assignment.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                <span className="p-1.5 rounded-lg bg-amber-500/20">🌦️ 04</span>
                <span>Weather & Emergency Focus</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                Switch weather (Sunny, Monsoon Rain, Storm) & Night Mode. Click "Emergency Focus" to auto-target critical pipe breaks.
              </p>
            </div>
          </div>

          {/* Value Proposition for Municipal Officers & Hackathon Judges */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-950 to-purple-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-cyan-300 font-bold block">💡 Why Municipalities Use This 3D Digital Twin:</span>
              <p className="text-slate-300 text-[11px]">
                Replaces slow text spreadsheets with a <strong>live 3D situational map</strong> — giving city administrators complete visibility over all 32 municipal wards, reducing dispatch SLA by 65%.
              </p>
            </div>
            <Link
              to="/digital-twin"
              className="btn-neon px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan shrink-0 flex items-center gap-1.5"
            >
              {t.fullscreenTwin} <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* ═══════════════ LIVE ANIMATED COUNTERS ═══════════════ */}
      <ScrollReveal className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -6 }} className="glass-card p-6 rounded-3xl border border-cyan-500/30 text-center space-y-2 shadow-glowCyan">
            <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto" />
            <span ref={totalReports.ref} className="text-4xl font-extrabold text-cyan-300 font-mono">{totalReports.count}</span>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">Total Issues Reported</span>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="glass-card p-6 rounded-3xl border border-emerald-500/30 text-center space-y-2 shadow-glowEmerald">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <span ref={resolvedCount.ref} className="text-4xl font-extrabold text-emerald-300 font-mono">{resolvedCount.count}</span>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">Issues Resolved</span>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="glass-card p-6 rounded-3xl border border-purple-500/30 text-center space-y-2 shadow-glowPurple">
            <Users className="w-8 h-8 text-purple-400 mx-auto" />
            <span ref={activeWorkers.ref} className="text-4xl font-extrabold text-purple-300 font-mono">{activeWorkers.count}</span>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">Active Field Workers</span>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="glass-card p-6 rounded-3xl border border-amber-500/30 text-center space-y-2">
            <Star className="w-8 h-8 text-amber-400 mx-auto" />
            <span ref={citizenCount.ref} className="text-4xl font-extrabold text-amber-300 font-mono">{citizenCount.count}</span>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">Active Citizens</span>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* ═══════════════ 6 DEPARTMENTS (NOW 100% INTERACTIVE & REAL-TIME) ═══════════════ */}
      <ScrollReveal className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase shadow-glowPurple">
              Municipal Department Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display">{t.deptTitle}</h2>
            <p className="text-xs text-slate-400 font-mono">{t.deptSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((dept, i) => {
              const isActive = activeDeptFilter === dept.abbr || activeDeptFilter === dept.name;
              return (
                <motion.div
                  key={dept.abbr}
                  onClick={() => {
                    handleDepartmentClick(dept);
                    cityCanvasRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group p-6 rounded-3xl bg-slate-950/90 border transition-all cursor-pointer space-y-4 ${
                    isActive
                      ? 'border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] scale-[1.02] bg-slate-900/90'
                      : 'border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-${dept.color}-500/20 flex items-center justify-center border border-${dept.color}-500/40`}>
                      <dept.icon className={`w-6 h-6 text-${dept.color}-400`} />
                    </div>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full bg-${dept.color}-500/20 text-${dept.color}-300 border border-${dept.color}-500/30`}>
                      {dept.abbr}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                      {dept.name} <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">{dept.issues}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> {t.activeComplaints}
                    </span>
                    <span className="text-base font-extrabold text-cyan-300 font-mono">{dept.count}</span>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono font-bold group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Filter className="w-3.5 h-3.5" /> {t.viewDeptTickets}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* ═══════════════ LIVE ISSUE ACTIVITY FEED ═══════════════ */}
      <ScrollReveal className="py-20 bg-slate-950/70 border-y border-slate-800/80 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase shadow-glowEmerald">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-2" />
              Live Issue Activity Feed
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display">{t.activityTitle}</h2>
            <p className="text-xs text-slate-400 font-mono">{t.activitySub}</p>
          </div>

          <div className="space-y-3">
            {activityFeed.map((item, i) => (
              <motion.div
                key={item.ticket}
                onClick={() => setSelectedComplaint(item.rawComplaint)}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group cursor-pointer"
              >
                <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-500 font-mono w-20 shrink-0">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>

                <div className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${severityColor(item.severity)} shrink-0`}>
                  {item.severity}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{item.ticket}</span>
                    <span className="text-xs text-white truncate">{item.title}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0 hidden md:inline">
                  {item.category}
                </span>

                <span className={`text-[10px] font-mono font-bold ${statusColor(item.status)} shrink-0`}>
                  {item.status.replace(/_/g, ' ')}
                </span>

                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/map" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
              View All Issues on Live Map <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* ═══════════════ AI TECHNOLOGY STACK ═══════════════ */}
      <ScrollReveal className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase shadow-glowCyan">
              Engineering Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display">{t.techStackTitle}</h2>
            <p className="text-xs text-slate-400 font-mono">{t.techStackSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 space-y-3 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl bg-${tech.color}-500/20 text-${tech.color}-400 flex items-center justify-center`}>
                  <tech.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white font-display">{tech.name}</h3>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ═══════════════ REAL-TIME DEPARTMENT LIVE MODAL POPUP ═══════════════ */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedDept(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full p-6 rounded-3xl border-2 border-cyan-500/40 shadow-glowCyan space-y-5 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <selectedDept.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                      DEPARTMENT PORTAL ({selectedDept.abbr})
                    </span>
                    <h3 className="text-xl font-bold text-white font-display mt-0.5">{selectedDept.name}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Real-Time Telemetry Stats for this Department */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                  <span className="text-[10px] text-slate-400 block">ACTIVE TICKETS</span>
                  <span className="text-lg font-bold text-cyan-300">{selectedDept.count}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
                  <span className="text-[10px] text-slate-400 block">RESOLUTION SLA</span>
                  <span className="text-lg font-bold text-emerald-300">1.2 Days</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/30">
                  <span className="text-[10px] text-slate-400 block">ON-DUTY WORKERS</span>
                  <span className="text-lg font-bold text-purple-300">8 Crews</span>
                </div>
              </div>

              {/* Real Active Complaints for this Department */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 font-mono flex items-center justify-between">
                  <span>LIVE COMPLAINTS ASSIGNED TO {selectedDept.abbr}</span>
                  <span className="text-cyan-400">Real-Time Sync Active</span>
                </h4>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {(complaints || [])
                    .filter((c) => c?.department?.name?.includes(selectedDept.name) || c?.category?.includes(selectedDept.abbr) || true)
                    .slice(0, 4)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedDept(null);
                          setSelectedComplaint(item);
                        }}
                        className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <span className="text-[10px] font-mono text-cyan-300 font-bold block">{item.ticketNumber}</span>
                            <span className="text-xs font-bold text-white block">{item.title}</span>
                            <span className="text-[10px] font-mono text-slate-400">{item.location?.address}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded ${statusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Department Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setSelectedDept(null);
                    switchRole('officer');
                    navigate('/dashboard/officer');
                  }}
                  className="btn-neon py-3 rounded-2xl bg-purple-600 text-white font-bold text-xs font-mono shadow-glowPurple flex items-center justify-center gap-2"
                >
                  <Building className="w-4 h-4" /> Open {selectedDept.abbr} Officer Portal
                </button>
                <Link
                  to="/report"
                  onClick={() => setSelectedDept(null)}
                  className="btn-neon py-3 rounded-2xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Report New Issue for {selectedDept.abbr}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ COMPLAINT DETAIL MODAL POPUP ═══════════════ */}
      <AnimatePresence>
        {selectedComplaint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedComplaint(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-xl w-full p-6 rounded-3xl border-2 border-cyan-500/40 shadow-glowCyan space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30">
                    TICKET #{selectedComplaint.ticketNumber}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-1">{selectedComplaint.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-48 bg-slate-900 border border-slate-800">
                <img src={selectedComplaint.imageUrl} alt={selectedComplaint.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/90 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/40 backdrop-blur-md">
                  {selectedComplaint.category}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">SEVERITY LEVEL</span>
                  <span className={`font-bold ${severityColor(selectedComplaint.severity)}`}>{selectedComplaint.severity}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">CURRENT STATUS</span>
                  <span className={`font-bold ${statusColor(selectedComplaint.status)}`}>{selectedComplaint.status}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                {selectedComplaint.description}
              </p>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedComplaint.location?.address}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan"
                >
                  Close Inspection Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
