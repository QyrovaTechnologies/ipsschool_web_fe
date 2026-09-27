import React from 'react';
import { Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import ipsLogo from '../../assets/IPS_Logo.png';

export default function Footer({ setActivePage }) {
  return (
    <footer className="w-full bg-primary text-white mt-16 border-t-4 border-tertiary-fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white p-1 flex items-center justify-center overflow-hidden">
                <img src={ipsLogo} alt="Iqura Public School Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-white">IQURA PUBLIC SCHOOL</h4>
                <p className="text-xs text-tertiary-fixed">UP English / UP Board</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Dedicated to scholastic distinction, values-driven pedagogy, and holistic leadership since 1999. Fostering future-ready scholars through rigorous UP Board curricula and comprehensive co-curricular life.
            </p>
            <div className="text-xs text-gray-300 space-y-1">
              <div>School Code: <strong className="text-white font-mono">1221</strong> • UDISE: <strong className="text-white font-mono">09550414004</strong></div>
              <div>Medium: <strong className="text-white">English & Hindi (UP Board)</strong></div>
              <div>Grades: <strong className="text-white">Nursery to XII</strong></div>
            </div>

            {/* Social Media Channels (LinkedIn, Facebook, Instagram, Twitter, YouTube) */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-tertiary-fixed mb-2.5">
                Official Social Channels
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="LinkedIn (link will be added soon)"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Facebook (link will be added soon)"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Instagram (link will be added soon)"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="Twitter / X (link will be added soon)"
                  aria-label="Twitter"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Twitter size={15} />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  title="YouTube (link will be added soon)"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center text-white hover:scale-110 transition-all shadow-sm"
                >
                  <Youtube size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-serif font-bold text-sm text-tertiary-fixed mb-4 border-b border-primary-container pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><button onClick={() => setActivePage('home', '/')} className="hover:text-tertiary-fixed transition-colors">Home Page</button></li>
              <li><button onClick={() => setActivePage('results', '/results')} className="hover:text-tertiary-fixed transition-colors">Board Results & Toppers</button></li>
              <li><button onClick={() => setActivePage('staff', '/staff')} className="hover:text-tertiary-fixed transition-colors">Faculty Directory</button></li>
              <li><button onClick={() => setActivePage('gallery', '/gallery')} className="hover:text-tertiary-fixed transition-colors">Campus Photo Gallery</button></li>
              <li><button onClick={() => setActivePage('academics', '/academics')} className="hover:text-tertiary-fixed transition-colors">Academic Pedagogy</button></li>
              <li><button onClick={() => setActivePage('about-us', '/about-us')} className="hover:text-tertiary-fixed transition-colors">About Our School</button></li>
              <li><button onClick={() => setActivePage('campus', '/campus')} className="hover:text-tertiary-fixed transition-colors">Campus Life & Labs</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-serif font-bold text-sm text-tertiary-fixed mb-4 border-b border-primary-container pb-2">
              Academic Wings
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>• Pre-Primary (Nursery, LKG, UKG)</li>
              <li>• Primary Wing (Classes I to V)</li>
              <li>• Middle Wing (Classes VI to VIII)</li>
              <li>• Secondary & Senior Secondary (IX to XII)</li>
              <li>• Science, Commerce & Humanities</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-tertiary-fixed mb-4 border-b border-primary-container pb-2">
              Campus & Admissions
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Pankhobari - Post Bankati - Basti, Uttar Pradesh
            </p>
            <div className="space-y-2.5 text-xs text-gray-300">
              {/* Phone Helpline: 9453250211 and 9792272926 */}
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed mt-0.5">call</span>
                <div className="space-y-1">
                  <a
                    href="tel:9453250211"
                    className="block hover:text-tertiary-fixed font-semibold text-white transition-colors"
                    title="Call Primary Helpline: 9453250211"
                  >
                    +91 9453250211 <span className="text-[10px] text-tertiary-fixed font-normal">(Primary Helpline)</span>
                  </a>
                  <a
                    href="tel:9792272926"
                    className="block hover:text-tertiary-fixed transition-colors text-slate-300"
                    title="Call Campus Office: 9792272926"
                  >
                    +91 9792272926 <span className="text-[10px] text-slate-400 font-normal">(Campus Office)</span>
                  </a>
                </div>
              </div>
              <a href="mailto:iqurapublic2017@gmail.com" className="flex items-center gap-2 hover:text-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">mail</span>
                iqurapublic2017@gmail.com
              </a>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">schedule</span>
                Visiting Hours: 08:30 AM – 1:30 PM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-container flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© 2026 Iqura Public School. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span>UP Board Mandatory Disclosure</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}