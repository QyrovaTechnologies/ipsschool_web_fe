import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  // On mobile view (<768px), auto-close the top bar after 5 seconds
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="bg-primary text-white border-b border-primary-container/40 text-xs overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap text-primary-fixed min-w-0">
              {/* Board, Code & UDISE Info */}
              <span className="flex items-center gap-1.5 font-semibold text-tertiary-fixed text-[11px] sm:text-xs truncate">
                <span className="material-symbols-outlined text-[14px] sm:text-[15px] shrink-0">school</span>
                <span>UP English / UP Board</span>
                <span className="text-white/40">•</span>
                <span className="text-slate-300 font-mono text-[10px] sm:text-[11px]">Code: 1221</span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="hidden sm:inline text-slate-300 font-mono text-[11px]">UDISE: 09550414004</span>
              </span>

              <span className="hidden md:inline text-gray-500">|</span>

              {/* Contact Numbers: 9453250211 & 9792272926 */}
              <div className="hidden sm:flex items-center gap-2 text-white">
                <a
                  href="tel:9453250211"
                  className="flex items-center gap-1.5 hover:text-tertiary-fixed font-semibold tracking-wide transition-colors"
                  title="Call Primary Helpline: 9453250211"
                >
                  <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">call</span>
                  <span>+91 9453250211</span>
                </a>
                <span className="text-slate-400">/</span>
                <a
                  href="tel:9792272926"
                  className="hover:text-tertiary-fixed text-slate-200 transition-colors"
                  title="Call Campus Office: 9792272926"
                >
                  <span>9792272926</span>
                </a>
              </div>

              <span className="hidden xl:inline text-gray-500">|</span>

              {/* Official Email */}
              <a
                href="mailto:iqurapublic2017@gmail.com"
                className="hidden xl:flex items-center gap-1.5 text-slate-300 hover:text-tertiary-fixed transition-colors"
                title="Email Iqura Public School"
              >
                <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">mail</span>
                <span>iqurapublic2017@gmail.com</span>
              </a>
            </div>

            {/* Social Icons + Admissions Announcement Badge & Close X Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
              {/* Social Media Channels (Links placeholder, user will add later) */}
              <div className="flex items-center gap-1 sm:gap-1.5 text-slate-300 pr-1 sm:pr-2 sm:border-r border-white/20">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  className="p-1 rounded-full hover:text-tertiary-fixed hover:bg-white/10 transition-colors"
                >
                  <Linkedin size={14} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Facebook"
                  aria-label="Facebook"
                  className="p-1 rounded-full hover:text-tertiary-fixed hover:bg-white/10 transition-colors"
                >
                  <Facebook size={14} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Instagram"
                  aria-label="Instagram"
                  className="p-1 rounded-full hover:text-tertiary-fixed hover:bg-white/10 transition-colors"
                >
                  <Instagram size={14} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Twitter / X"
                  aria-label="Twitter"
                  className="p-1 rounded-full hover:text-tertiary-fixed hover:bg-white/10 transition-colors"
                >
                  <Twitter size={14} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="YouTube"
                  aria-label="YouTube"
                  className="p-1 rounded-full hover:text-tertiary-fixed hover:bg-white/10 transition-colors"
                >
                  <Youtube size={14} />
                </a>
              </div>

              {/* Admissions Open Announcement Badge */}
              <div className="hidden md:flex items-center gap-1.5 bg-primary-container/80 border border-secondary/30 px-2.5 py-0.5 rounded text-tertiary-fixed font-medium text-[11px]">
                <span className="material-symbols-outlined text-[13px] text-secondary-container animate-pulse">campaign</span>
                <span>Admissions Open 2026–27</span>
              </div>

              {/* Dismiss / Close X Button */}
              <button
                onClick={() => setIsVisible(false)}
                className="w-6 h-6 rounded-full hover:bg-white/20 active:scale-95 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close notification header"
                title="Close Header Bar"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}