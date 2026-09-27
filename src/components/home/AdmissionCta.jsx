import React from 'react';
import ScrollReveal from '../common/ScrollReveal';

export default function AdmissionCta({ onOpenEnquiry }) {
  return (
    <section className="w-full bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary py-space-xl relative overflow-hidden">
      {/* Decorative heraldic backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLdnfhSfi_7QdfwiK3fsPQzS-z8ijiMxgXotUAlh7uuou6D5AcC_yuKbQ-l_h54_y_Q2SvwJbz5Iv46v_hkhW8biN7vOIIuFGRTPlBZkXo2927D0BXyXfrJr1elhJOZKIEkTF0b1mFw-LuY73sGHoIIHDTKYq_um_dI0jVguFBemKu4OSyfPHjRM4EDY4y4jBMC5Tl0Qrch3mT1fE-CsLjuSMw93yoHKYcDa5i8Y2mvYdaLEYYoTw")`
        }}
      />
      <div className="max-w-7xl mx-auto px-gutter relative z-10">
        <ScrollReveal direction="zoom" delay={0.1} duration={0.7}>
          <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-space-xl border border-white/10">
            <div className="max-w-2xl space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-3.5 py-1 rounded text-label-sm font-label-sm font-bold uppercase tracking-wider shadow-sm">
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>REGISTRATION WINDOW OPEN</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-primary tracking-tight">
                Admissions Open for 2026–27 — Give Your Child the Iqura Advantage
              </h2>
              <p className="font-body-lg text-body-lg text-primary-fixed leading-relaxed">
                Limited seats available across Nursery, Prep, Primary, and Class XI (Science, Commerce &amp; Humanities in English &amp; Hindi mediums). Merit-based scholarships awarded for qualifying scholars.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-space-md w-full lg:w-auto flex-shrink-0">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary px-7 py-4 rounded-lg font-label-lg text-label-lg font-bold hover:bg-on-secondary-container transition-all shadow-xl hover:scale-105"
              >
                <span>Apply Online Now</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <a
                href="#admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-primary px-6 py-4 rounded-lg font-label-lg text-label-lg font-bold hover:bg-primary-fixed transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span>Fee &amp; Eligibility Booklet</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Contact / Helpline bar under CTA */}
        <ScrollReveal direction="up" delay={0.25}>
          <div className="mt-space-md flex flex-wrap items-center justify-center gap-6 text-body-sm font-body-sm text-primary-fixed">
            <a href="tel:9792272926" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">call</span>
              Admissions Helpline: +91 9792272926
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:iqurapublic2017@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">mail</span>
              iqurapublic2017@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">schedule</span>
              Desk Hours: 8:00 AM – 3:00 PM (Monday to Saturday)
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}