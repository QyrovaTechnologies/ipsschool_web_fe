import React from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export default function AboutSection({ onNavigate }) {
  return (
    <section className="w-full py-space-xl bg-surface overflow-hidden" id="about-section">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="max-w-4xl mx-auto space-y-space-md text-center sm:text-left">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-surface-container-high text-primary px-3 py-1 rounded">
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span className="font-label-sm text-label-sm font-bold tracking-wider uppercase">
                ESTABLISHED 1999 • UP ENGLISH / UP BOARD
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              EDUCATION WITH PURPOSE,<br />
              <span className="text-secondary font-serif">VALUES WITH VISION.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
              For over a quarter-century, Iqura Public School has stood as a beacon of intellectual rigor and moral fortitude. Located on an expansive verdant campus in Pankhobari, Post Bankati, Basti (U.P.), we synthesize classical Indian values of self-discipline, respect, and duty with 21st-century technological fluency.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Recognizing the diverse linguistic heritage of our nation, Iqura operates dedicated wings for both English and Hindi medium education under UP Board guidelines. Here, no child's intellectual horizons are constrained by medium; every scholar blossoms into an articulate, ethical, and critically thinking citizen.
            </p>
          </ScrollReveal>

          {/* 3 Institutional Pillars (Stagger on Scroll) */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2" staggerChildren={0.15}>
            <StaggerItem direction="up">
              <div className="p-4 rounded-lg bg-surface-container-low shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded bg-primary-container text-tertiary-fixed flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">menu_book</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Academic Rigour</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Continuous assessments, Olympiad coaching, and personalized mentoring.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem direction="up">
              <div className="p-4 rounded-lg bg-surface-container-low shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded bg-secondary text-on-secondary flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">translate</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Dual Medium</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Full curriculum delivery in English &amp; Hindi mediums from Nursery to Class XII.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem direction="up">
              <div className="p-4 rounded-lg bg-surface-container-low shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded bg-tertiary-container text-tertiary-fixed flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">self_improvement</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Holistic Character</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  Vedic heritage, ethics classes, social outreach, and sportsmanship.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="pt-2">
              <button
                onClick={() => onNavigate && onNavigate('about-us')}
                className="inline-flex items-center gap-2 text-secondary font-label-lg text-label-lg font-bold hover:text-on-secondary-container transition-colors group cursor-pointer"
              >
                <span>Read Our Complete Story &amp; History</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_right_alt
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
