import React from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export default function AcademicWings({ onNavigate }) {
  return (
    <section className="w-full py-space-xl bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="max-w-2xl space-y-2">
            <ScrollReveal direction="down" delay={0.1}>
              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">
                PEDAGOGICAL CONTINUUM
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
                Structured Academic Wings
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                From the joyful exploratory years in kindergarten to intensive UP Board preparation in senior secondary streams.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="left" delay={0.25}>
            <button
              onClick={() => onNavigate && onNavigate('academics')}
              className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold hover:text-secondary transition-colors group"
            >
              <span>View Detailed Board Syllabus</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </ScrollReveal>
        </div>

        {/* 4 Academic Wings Cards (Staggered On Scroll) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md" staggerChildren={0.12}>
          {/* Pre-Primary Wing */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">child_care</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">FOUNDATIONAL STAGE</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Pre-Primary Wing</h3>
                <span className="inline-block bg-surface-container px-2 py-0.5 rounded text-label-sm font-label-sm text-on-surface font-semibold mb-3">Nursery • LKG • UKG</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                  Playway &amp; Montessori-inspired methodology. Phonics mastery, motor coordination, storytelling, rhyme recitation, and foundational numeracy in a caring, joyful setting.
                </p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('academics')}
                className="inline-flex items-center justify-between text-label-sm font-label-sm font-bold text-primary pt-3 border-t border-surface-container-high hover:text-secondary group"
              >
                <span>Pre-Primary Curriculum</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>
          </StaggerItem>

          {/* Primary Wing */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">auto_stories</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">PREPARATORY STAGE</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Primary Wing</h3>
                <span className="inline-block bg-surface-container px-2 py-0.5 rounded text-label-sm font-label-sm text-on-surface font-semibold mb-3">Classes I to V</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                  Bilingual fluency in English and Hindi. Core arithmetic, environmental studies, digital literacy, arts and crafts, physical drill, and moral education.
                </p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('academics')}
                className="inline-flex items-center justify-between text-label-sm font-label-sm font-bold text-primary pt-3 border-t border-surface-container-high hover:text-secondary group"
              >
                <span>Primary Curriculum</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>
          </StaggerItem>

          {/* Middle Wing */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">biotech</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">MIDDLE STAGE</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Middle Wing</h3>
                <span className="inline-block bg-surface-container px-2 py-0.5 rounded text-label-sm font-label-sm text-on-surface font-semibold mb-3">Classes VI to VIII</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                  Experiential science laboratories, third-language options (Sanskrit/Urdu), computer coding fundamentals, social sciences, sports clubs, and house competitions.
                </p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('academics')}
                className="inline-flex items-center justify-between text-label-sm font-label-sm font-bold text-primary pt-3 border-t border-surface-container-high hover:text-secondary group"
              >
                <span>Middle Wing Syllabus</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>
          </StaggerItem>

          {/* Secondary & Senior Secondary Wing */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full relative overflow-hidden border border-surface-container-high/40">
              <div className="absolute top-0 right-0 bg-secondary text-on-secondary px-3 py-0.5 rounded-bl text-label-sm font-label-sm font-bold shadow-sm">
                UP Board 10+2
              </div>
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-container text-tertiary-fixed flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">account_balance</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">SECONDARY &amp; SR. SECONDARY</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Secondary &amp; Senior Sec.</h3>
                <span className="inline-block bg-surface-container px-2 py-0.5 rounded text-label-sm font-label-sm text-on-surface font-semibold mb-3">Classes IX to XII</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-4">
                  Science (PCM/PCB), Commerce, and Humanities streams in both English &amp; Hindi mediums. Dedicated NEET, JEE, and CUET preparatory coaching sessions.
                </p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('academics')}
                className="inline-flex items-center justify-between text-label-sm font-label-sm font-bold text-primary pt-3 border-t border-surface-container-high hover:text-secondary group"
              >
                <span>Senior Streams &amp; Subjects</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}