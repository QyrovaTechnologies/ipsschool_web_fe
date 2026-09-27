import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import ipsLogo from '../../assets/IPS_Logo.png';

export default function Navbar({ currentPage, activePage, onNavigate, setActivePage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const current = currentPage || activePage || 'home';
  const navigate = onNavigate || setActivePage || (() => {});

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: 'home' },
    { id: 'results', label: 'Achievements & Results', path: '/results', icon: 'workspace_premium' },
    { id: 'staff', label: 'Faculty & Staff', path: '/staff', icon: 'groups' },
    { id: 'gallery', label: 'Campus Gallery', path: '/gallery', icon: 'photo_library' },
    { id: 'academics', label: 'Academics', path: '/academics', icon: 'menu_book' },
    { id: 'about-us', label: 'About Us', path: '/about-us', icon: 'history_edu' },
    { id: 'campus', label: 'Campus Life', path: '/campus', icon: 'domain' },
  ];

  const handleNavClick = (e, item) => {
    if (e) e.preventDefault();
    navigate(item.id, item.path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high/60 relative z-40">
        <div className="h-16 sm:h-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Left: Mobile Hamburger Button & School Crest Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger Menu Icon (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-primary hover:bg-surface-container active:scale-95 transition-all flex items-center justify-center border border-surface-container-high"
              aria-label="Open Navigation Menu"
              title="Menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            {/* School Crest Logo Only */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('home', '/');
              }}
              className="flex items-center cursor-pointer select-none group"
              title="Iqura Public School Homepage"
            >
              <div className="h-11 sm:h-14 w-auto flex items-center justify-center group-hover:scale-105 transition-transform">
                <img 
                  src={ipsLogo} 
                  alt="Iqura Public School Logo" 
                  className="h-11 sm:h-14 w-auto object-contain drop-shadow-sm"
                />
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  current === item.id
                    ? 'bg-primary text-on-primary shadow-sm scale-105'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Admission Action Button */}
          <div className="flex items-center gap-2">
            <a
              href="/#admission-cta"
              onClick={(e) => {
                e.preventDefault();
                navigate('home', '/');
                setTimeout(() => {
                  const el = document.getElementById('admission-cta');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="bg-secondary text-white hover:bg-on-secondary-container px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all shadow hover:shadow-md hover:scale-105 whitespace-nowrap"
            >
              Enquiry 2026-27
            </a>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SLIDE-IN DRAWER (ON TOP OF SCREEN) ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Left Side Card Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[84%] max-w-xs bg-gradient-to-b from-[#001733] via-[#001226] to-[#000a17] text-white shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-white/10 z-50"
            >
              <div>
                {/* Drawer Header */}
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-primary/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow">
                      <img src={ipsLogo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm text-white leading-tight">IQURA PUBLIC SCHOOL</h3>
                      <p className="text-[10px] text-tertiary-fixed font-bold tracking-wider uppercase">UP English / UP Board</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                    aria-label="Close Menu"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                {/* Navigation Items List */}
                <div className="p-3 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Menu Navigation
                  </div>

                  {navItems.map((item) => {
                    const isActive = current === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.path}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                          isActive
                            ? 'bg-secondary text-white font-bold shadow-md'
                            : 'text-slate-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isActive ? 'text-white' : 'text-tertiary-fixed'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] opacity-60">chevron_right</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-white/10 bg-black/30 space-y-3">
                <button
                  onClick={(e) => {
                    handleNavClick(e, { id: 'home', path: '/' });
                    setTimeout(() => {
                      const el = document.getElementById('admission-cta');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full py-2.5 bg-secondary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-[16px]">campaign</span>
                  <span>Enquiry 2026-27</span>
                </button>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="space-y-1">
                    <a
                      href="tel:9453250211"
                      className="flex items-center gap-2 hover:text-tertiary-fixed font-semibold text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">call</span>
                      <span>+91 9453250211 (Helpline)</span>
                    </a>
                    <a
                      href="tel:9792272926"
                      className="flex items-center gap-2 hover:text-tertiary-fixed text-slate-300 transition-colors pl-5"
                    >
                      <span>+91 9792272926 (Office)</span>
                    </a>
                  </div>

                  {/* Social Media Channels */}
                  <div className="pt-2 border-t border-slate-700/60">
                    <p className="text-[10px] uppercase font-bold text-tertiary-fixed tracking-wider mb-1.5">
                      Social Channels
                    </p>
                    <div className="flex items-center gap-2 text-slate-300">
                      <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white transition-colors"><Linkedin size={13} /></a>
                      <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white transition-colors"><Facebook size={13} /></a>
                      <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white transition-colors"><Instagram size={13} /></a>
                      <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white transition-colors"><Twitter size={13} /></a>
                      <a href="#" onClick={(e) => e.preventDefault()} className="w-7 h-7 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white transition-colors"><Youtube size={13} /></a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[10px] pt-1">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">verified</span>
                    <span>Code: 1221 • UDISE: 09550414004</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}