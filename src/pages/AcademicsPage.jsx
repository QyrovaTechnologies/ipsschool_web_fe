import React from 'react';
import PageBanner from '../components/common/PageBanner';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';

export default function AcademicsPage({ onNavigate }) {
  const academicStages = [
    {
      stage: 'Pre-Primary Wing (Foundational)',
      classes: 'Nursery, LKG, UKG',
      icon: 'child_care',
      accent: 'border-amber-400',
      desc: 'Play-way, Montessori methodology, phonics mastery, motor coordination, cognitive story-telling, and foundational numeracy in a caring and safe atmosphere.',
      highlights: ['Activity-based Learning', 'Phonetics & English Fluency', 'Fine Motor Skills Development']
    },
    {
      stage: 'Primary Wing (Preparatory)',
      classes: 'Classes I to V',
      icon: 'auto_stories',
      accent: 'border-secondary',
      desc: 'Dual-medium foundation in English and Hindi. Core arithmetic, environmental studies, moral education, digital basics, and creative arts.',
      highlights: ['Bilingual Instruction', 'Weekly Arithmetic Drills', 'Environmental Sensitivity & Values']
    },
    {
      stage: 'Middle Wing (Exploratory)',
      classes: 'Classes VI to VIII',
      icon: 'biotech',
      accent: 'border-blue-500',
      desc: 'Experiential science, third-language options (Sanskrit/Urdu), computer coding fundamentals, social studies, project-based investigations, and physical education.',
      highlights: ['Hands-on Science Labs', 'Coding & Robotics Basics', 'Sports & House Competitions']
    },
    {
      stage: 'Secondary & Senior Secondary (10+2)',
      classes: 'Classes IX to XII',
      icon: 'school',
      accent: 'border-emerald-500',
      desc: 'Comprehensive UP Board curriculum with specialized streams: Science (PCM/PCB), Commerce, and Humanities. Integrated preparation for JEE, NEET, and CUET.',
      highlights: ['Dedicated Science & Computer Labs', 'Specialized Board Mentorship', 'Pre-College Coaching Modules']
    }
  ];

  const streams = [
    {
      name: 'Science Stream (PCM / PCB)',
      subjects: ['Physics', 'Chemistry', 'Mathematics / Biology', 'English Core', 'Hindi / Physical Education / Computer Science'],
      careers: 'Engineering (IIT/JEE), Medicine (NEET), Biotechnology, Pure Sciences & Research.'
    },
    {
      name: 'Commerce Stream',
      subjects: ['Accountancy', 'Business Studies', 'Economics', 'English Core', 'Mathematics / Hindi / Physical Education'],
      careers: 'Chartered Accountancy (CA), Banking, Finance, Corporate Law, Management & Economics.'
    },
    {
      name: 'Humanities Stream',
      subjects: ['History', 'Political Science', 'Economics / Sociology', 'English Core', 'Hindi / Geography'],
      careers: 'Civil Services (UPSC), Law, Journalism, Public Policy, Humanities & Teaching.'
    }
  ];

  return (
    <div className="w-full bg-surface pb-16">
      <PageBanner
        title="Academic Excellence & Pedagogy"
        subtitle="A balanced pedagogical continuum from Nursery to Class XII under UP Board guidelines with dual English & Hindi mediums."
        badge="Curriculum Continuum"
        icon="menu_book"
        placementKey="computer_lab"
        breadcrumbs={['Home', 'Academics']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Stages of Learning */}
        <div>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">CURRICULUM STAGES</span>
              <h2 className="font-serif text-3xl font-bold text-primary tracking-tight mt-1">
                Structured Pedagogical Framework
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                Designed to nurture curiosity, build conceptual mastery, and cultivate disciplined thinkers at each stage of development.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerChildren={0.12}>
            {academicStages.map((stage, idx) => (
              <StaggerItem key={idx} direction="up">
                <div className={`p-6 sm:p-7 rounded-2xl bg-surface-container-low border-t-4 ${stage.accent} border-x border-b border-surface-container-high shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-10 h-10 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center shadow-inner">
                        <span className="material-symbols-outlined text-[22px]">{stage.icon}</span>
                      </span>
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                        {stage.classes}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-primary mb-2">{stage.stage}</h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">{stage.desc}</p>

                    <div className="space-y-1.5 pt-3 border-t border-surface-container-high">
                      {stage.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-primary">
                          <span className="material-symbols-outlined text-[15px] text-secondary">check</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Senior Secondary Streams (10+2) */}
        <div>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">SENIOR SECONDARY (10+2)</span>
              <h2 className="font-serif text-3xl font-bold text-primary tracking-tight mt-1">
                Disciplinary Streams &amp; Career Pathways
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                Rigorous preparation for state board examinations and competitive entrances with dedicated mentor guidance.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {streams.map((stream, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.15 * idx}>
                <div className="p-6 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-sm hover:border-secondary hover:shadow-lg transition-all h-full flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-3 pb-2 border-b border-surface-container-high">
                      {stream.name}
                    </h4>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-secondary block mb-1">
                      Key Subjects:
                    </span>
                    <ul className="text-xs text-on-surface space-y-1 mb-4 list-disc pl-4 marker:text-secondary">
                      {stream.subjects.map((sub, i) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-surface-container-high text-xs text-on-surface-variant">
                    <span className="font-semibold text-primary block mb-0.5">Career Pathways:</span>
                    <span>{stream.careers}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-2xl bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold text-tertiary-fixed">Admissions Open 2026–27</h3>
            <p className="text-xs sm:text-sm text-primary-fixed">
              Enroll your child for academic excellence, holistic character, and UP Board mastery.
            </p>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="px-6 py-3 bg-secondary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all shadow shrink-0"
          >
            Apply for Admission
          </button>
        </div>
      </div>
    </div>
  );
}
