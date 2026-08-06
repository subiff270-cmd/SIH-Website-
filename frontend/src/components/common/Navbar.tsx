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
  Building,
  Globe,
  Menu,
  X,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, languageNames, LangCode } from '../../context/LanguageContext';
import { Role } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, switchRole, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const langCodes: LangCode[] = ['EN', 'HI', 'TA', 'TE', 'BN', 'MR', 'GU', 'KN', 'ML'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setLangDropdownOpen(false);
      setProfileDropdownOpen(false);
    };
    if (langDropdownOpen || profileDropdownOpen) {
      setTimeout(() => document.addEventListener('click', handleClick), 0);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [langDropdownOpen, profileDropdownOpen]);

  const getDashboardPath = (role?: Role) => {
    if (role === 'officer') return '/dashboard/officer';
    if (role === 'worker') return '/dashboard/worker';
    return '/dashboard/citizen';
  };

  const navLinks = [
    { path: '/', label: t.home, icon: Building2 },
    { path: '/digital-twin', label: t.cityTwin, icon: Layers },
    { path: '/predictive', label: t.predictiveAi, icon: TrendingUp },
    { path: '/map', label: t.liveMap, icon: MapPin },
    { path: '/report', label: t.reportIssue, icon: PlusCircle },
  ];

  const rolesList: { role: Role; label: string; icon: any }[] = [
    { role: 'citizen', label: t.citizenPortal, icon: User },
    { role: 'officer', label: t.officerPortal, icon: Building },
    { role: 'worker', label: t.workerPortal, icon: Wrench },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-glowCyan'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-all shadow-glowCyan">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-extrabold font-display tracking-tight text-white flex items-center gap-1">
              Civic <span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-cyan-300/80 block uppercase tracking-wider">
              SMART CITY OS
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill Bar */}
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

        {/* Right Section: Language Switcher, Active User Avatar & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* ═══ MULTILINGUAL DROPDOWN ═══ */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setLangDropdownOpen(!langDropdownOpen); setProfileDropdownOpen(false); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-cyan-300 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{languageNames[lang]}</span>
              <span className="sm:hidden">{lang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-52 p-2 rounded-2xl bg-slate-950/95 border border-cyan-500/30 backdrop-blur-xl shadow-glowCyan z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[9px] font-mono text-slate-500 uppercase px-2 pb-1 block">{t.language}</span>
                  <div className="space-y-0.5 max-h-72 overflow-y-auto">
                    {langCodes.map((code) => (
                      <button
                        key={code}
                        onClick={() => { setLang(code); setLangDropdownOpen(false); }}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                          lang === code
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <span>{languageNames[code]}</span>
                        {lang === code && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setProfileDropdownOpen(!profileDropdownOpen); setLangDropdownOpen(false); }}
                className="flex items-center gap-2 p-1.5 sm:pr-3 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs font-mono shadow-inner"
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
                    onClick={(e) => e.stopPropagation()}
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
                        <LayoutDashboard className="w-3.5 h-3.5" /> {t.myDashboard}
                      </Link>
                    </div>

                    {/* Switch Role Section (3 Roles Only) */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase px-2 block">{t.switchRole}</span>
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
                      <LogOut className="w-3.5 h-3.5" /> {t.signOut}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-neon px-3 sm:px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono shadow-glowCyan flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" /> {t.signIn}
            </Link>
          )}

          {/* Quick Action Button (Desktop) */}
          <Link
            to="/report"
            className="btn-neon hidden sm:flex px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glowCyan items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> {t.reportIssue}
          </Link>

          {/* ═══ MOBILE HAMBURGER BUTTON (Visible on Phone Screens) ═══ */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
          </button>
        </div>

      </div>

      {/* ═══ MOBILE NAVIGATION DRAWER (SLIDE-DOWN FOR SMARTPHONES) ═══ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-cyan-500/20 bg-slate-950/98 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-glowCyan"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full px-4 py-3 rounded-2xl text-xs font-mono transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-glowCyan'
                        : 'text-slate-300 bg-slate-900/60 border border-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      {link.label}
                    </span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-glowCyan" />}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Report Button */}
            <Link
              to="/report"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-neon w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs shadow-glowCyan flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> {t.reportIssue} Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
