import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  MapPin, 
  PlusCircle, 
  Building2, 
  User, 
  LogOut, 
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  Layers,
  Wrench,
  Building
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, switchRole, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardPath = (role?: Role) => {
    if (role === 'officer') return '/dashboard/officer';
    if (role === 'worker') return '/dashboard/worker';
    return '/dashboard/citizen';
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Building2 },
    { path: '/digital-twin', label: '3D City Twin', icon: Layers },
    { path: '/map', label: 'Live Map', icon: MapPin },
    { path: '/report', label: 'Report Issue', icon: PlusCircle },
  ];

  // EXACTLY 3 ROLES (CITIZEN, OFFICER, WORKER)
  const rolesList: { role: Role; label: string; icon: any }[] = [
    { role: 'citizen', label: 'Citizen Portal', icon: User },
    { role: 'officer', label: 'Officer Portal', icon: Building },
    { role: 'worker', label: 'Worker Portal', icon: Wrench },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-glowCyan'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-all shadow-glowCyan">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-lg font-extrabold font-display tracking-tight text-white flex items-center gap-1">
              Civic <span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[9px] font-mono text-cyan-300/80 block uppercase tracking-wider">
              SMART CITY OS
            </span>
          </div>
        </Link>

        {/* Center Navigation Pill Bar */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-glowCyan'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Active User Avatar & Role Switcher Dropdown */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs font-mono shadow-inner"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full border border-cyan-400 object-cover"
                />
                <div className="text-left hidden sm:block">
                  <span className="text-slate-200 font-bold block leading-none">{currentUser.name}</span>
                  <span className="text-[9px] text-cyan-400 uppercase font-mono">{currentUser.role}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile & Role Switcher Drawer Dropdown */}
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 p-3 rounded-3xl bg-slate-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-glowCyan z-50 space-y-3"
                  >
                    {/* User Header */}
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                          <span className="text-[10px] text-cyan-300 font-mono">{currentUser.email || currentUser.phone}</span>
                        </div>
                      </div>
                      <Link
                        to={getDashboardPath(currentUser.role)}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="btn-neon mt-2.5 w-full py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-glowCyan"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" /> My {currentUser.role.toUpperCase()} Dashboard
                      </Link>
                    </div>

                    {/* Switch Role Section (3 Roles Only) */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase px-2 block">Switch Demo Role Portal (3 Roles)</span>
                      {rolesList.map((item) => {
                        const RIcon = item.icon;
                        const isCurrent = currentUser.role === item.role;
                        return (
                          <button
                            key={item.role}
                            onClick={() => {
                              switchRole(item.role);
                              setProfileDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                              isCurrent
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <RIcon className="w-3.5 h-3.5 text-cyan-400" />
                              {item.label}
                            </span>
                            {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Sign Out */}
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-xs font-mono text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 border border-transparent hover:border-rose-500/30"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-neon px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" /> Sign In
            </Link>
          )}

          {/* Quick Action Button */}
          <Link
            to="/report"
            className="btn-neon hidden sm:flex px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glowCyan items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Report Issue
          </Link>
        </div>

      </div>
    </header>
  );
};
