import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  UserCheck, 
  Key, 
  Mail, 
  CheckCircle2, 
  UserPlus, 
  LogIn, 
  Smartphone,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { RealOTPEngine } from '../components/common/RealOTPEngine';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, currentUser, isAccountRegistered } = useAuth();
  
  // Auth Modes: 'login' | 'signup'
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  // Login Auth Method: 'password' | 'otp'
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('otp');

  // Form State
  const [emailOrPhone, setEmailOrPhone] = useState(currentUser?.email || 'aarav.sharma@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('');
  const [city, setCity] = useState('New Delhi');
  
  // ONLY 3 ROLES: citizen, officer, worker
  const [selectedRole, setSelectedRole] = useState<Role>('citizen');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (authMode === 'login') {
      if (role === 'officer') setEmailOrPhone('pwd.officer@civic.gov.in');
      else if (role === 'worker') setEmailOrPhone('+91 98111 22334');
      else setEmailOrPhone('aarav.sharma@example.com');
    }
  };

  const handleOtpSuccess = () => {
    if (selectedRole === 'officer') navigate('/dashboard/officer');
    else if (selectedRole === 'worker') navigate('/dashboard/worker');
    else navigate('/dashboard/citizen');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (authMode === 'signup') {
        if (!name || !emailOrPhone) {
          setMessage({ text: 'Please complete all required registration fields.', type: 'error' });
          setIsSubmitting(false);
          return;
        }
        await register({
          name,
          emailOrPhone,
          role: selectedRole,
          city
        });
        setMessage({ text: `Account created successfully! Redirecting to ${selectedRole.toUpperCase()} Portal...`, type: 'success' });
      } else {
        if (!isAccountRegistered(emailOrPhone)) {
          setMessage({
            text: `No registered account found for "${emailOrPhone}". Please click "Create New Account" to register first!`,
            type: 'error'
          });
          setIsSubmitting(false);
          return;
        }

        await login(emailOrPhone, selectedRole);
        setMessage({ text: `Authenticated successfully! Loading ${selectedRole.toUpperCase()} Portal...`, type: 'success' });
      }

      setTimeout(() => {
        setIsSubmitting(false);
        if (selectedRole === 'officer') navigate('/dashboard/officer');
        else if (selectedRole === 'worker') navigate('/dashboard/worker');
        else navigate('/dashboard/citizen');
      }, 700);

    } catch (err: any) {
      setMessage({ text: err.message || 'Authentication failed.', type: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080C14] text-slate-100 flex items-center justify-center p-4 overflow-hidden pt-24 pb-16">
      
      {/* Background Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg glass-panel-glow p-6 md:p-8 rounded-3xl border border-cyan-500/40 shadow-glowCyan relative z-10 space-y-6"
      >
        
        {/* Top Mode Selector Tabs (Sign In vs Sign Up) */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
              authMode === 'login'
                ? 'bg-cyan-500 text-black shadow-glowCyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" /> Sign In to Portal
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
              authMode === 'signup'
                ? 'bg-cyan-500 text-black shadow-glowCyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Create New Account
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold font-display text-white">
            {authMode === 'login' ? 'CivicAI Portal Sign In' : 'Join CivicAI Smart City'}
          </h1>
          <p className="text-xs text-slate-400">
            {authMode === 'login'
              ? 'Only registered accounts can sign in. Unregistered users must click Create New Account.'
              : 'Register your citizen, officer or field worker account.'}
          </p>
        </div>

        {/* ROLE SELECTOR: EXACTLY 3 ROLES (CITIZEN, OFFICER, WORKER) */}
        <div className="space-y-2">
          <label className="block text-[11px] font-mono text-slate-400 uppercase text-center">
            Select Target Portal Role (3 Roles Only)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['citizen', 'officer', 'worker'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleSelect(r)}
                className={`p-3 rounded-xl text-xs font-mono capitalize transition-all border text-center font-bold flex flex-col items-center justify-center gap-1 ${
                  selectedRole === r
                    ? r === 'citizen'
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-glowCyan'
                      : r === 'officer'
                      ? 'bg-purple-500 text-white border-purple-400 shadow-glowPurple'
                      : 'bg-emerald-500 text-black border-emerald-400 shadow-glowEmerald'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>{r} Mode</span>
              </button>
            ))}
          </div>
        </div>

        {/* Auth Method Switcher */}
        {authMode === 'login' && (
          <div className="flex items-center justify-center gap-4 text-xs font-mono border-b border-slate-800 pb-3">
            <button
              type="button"
              onClick={() => setLoginMethod('otp')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                loginMethod === 'otp' ? 'border-cyan-400 text-cyan-300 font-bold' : 'border-transparent text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Real SMS / Email OTP
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('password')}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition-all ${
                loginMethod === 'password' ? 'border-cyan-400 text-cyan-300 font-bold' : 'border-transparent text-slate-400'
              }`}
            >
              <Key className="w-3.5 h-3.5" /> Password Mode
            </button>
          </div>
        )}

        {/* Form Body */}
        {authMode === 'login' && loginMethod === 'otp' ? (
          <RealOTPEngine
            role={selectedRole}
            onSuccess={handleOtpSuccess}
            onSwitchToSignUp={() => setAuthMode('signup')}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-cyan-400 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Email Address OR Mobile Phone Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="aarav.sharma@example.com or +91 98111 22334"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 outline-none focus:border-cyan-400 transition-all"
                />
              </div>
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">City / Municipal Ward</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. New Delhi, Bengaluru, Mumbai"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-cyan-400 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-100 outline-none focus:border-cyan-400 transition-all"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-xl border text-xs flex flex-col gap-2 ${
                  message.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{message.text}</span>
                </div>
                {message.type === 'error' && authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="w-full py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1 hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    <UserPlus className="w-3 h-3" /> Click Here to Create New Account
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-neon w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs shadow-glowCyan flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>
                    {authMode === 'login'
                      ? `Sign In to ${selectedRole.toUpperCase()} Portal`
                      : `Create Account & Launch ${selectedRole.toUpperCase()}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-800">
          <Link to="/" className="text-xs font-mono text-cyan-400 hover:underline">
            ← Return to Smart City Homepage
          </Link>
        </div>

      </motion.div>

    </div>
  );
};
