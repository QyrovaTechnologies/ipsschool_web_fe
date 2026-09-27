import React from 'react';
import PageBanner from '../components/common/PageBanner';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../components/common/ScrollReveal';

export default function AboutPage({ onNavigate }) {
  const milestones = [
    {
      year: '1999',
      title: 'Foundation of Iqura Public School',
      desc: 'Established with a vision to deliver values-centric, bilingual education in Pankhobari, Basti.'
    },
    {
      year: '2008',
      title: 'Secondary & High School Wing Expansion',
      desc: 'Accredited with UP Board, setting state-level benchmarks with 100% first divisions.'
    },
    {
      year: '2016',
      title: 'Senior Secondary STEM & Commerce Wings',
      desc: 'Inauguration of modern Physics, Chemistry, Biology, and Computer Science laboratories.'
    },
    {
      year: '2024+',
      title: 'Silver Jubilee & Digital Smart Classrooms',
      desc: 'Celebrating 25+ years of institutional excellence, AI labs, and comprehensive sports training.'
    }
  ];

  return (
    <div className="w-full bg-surface pb-16">
      <PageBanner
        title="About Iqura Public School"
        subtitle="A quarter-century legacy of moral integrity, bilingual fluency, and academic distinction under UP Board."
        badge="Established 1999"
        icon="history_edu"
        placementKey="campus_facilities"
        breadcrumbs={['Home', 'About Us']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Core Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="h-full p-8 rounded-2xl bg-surface-container-low border border-surface-container-high shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary text-tertiary-fixed flex items-center justify-center mb-4 shadow">
                  <span className="material-symbols-outlined text-[26px]">visibility</span>
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">OUR VISION</span>
                <h3 className="font-serif text-2xl font-bold text-primary mt-1 mb-3">
                  Enlightening Minds, Empowering Character
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  To nurture enlightened scholars who unite traditional moral rectitude with critical scientific inquiry, standing as ethical global contributors rooted in authentic Indian ethos.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container-high text-xs text-primary font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">verified</span>
                <span>Affiliated Code: 1221 • UDISE: 09550414004</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="h-full p-8 rounded-2xl bg-surface-container-low border border-surface-container-high shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center mb-4 shadow">
                  <span className="material-symbols-outlined text-[26px]">flag</span>
                </div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">OUR MISSION</span>
                <h3 className="font-serif text-2xl font-bold text-primary mt-1 mb-3">
                  Comprehensive Dual-Medium Pedagogy
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  To offer rigorous English and Hindi medium education from Nursery to Class XII, fostering intellectual curiosity, competitive exam readiness (JEE, NEET, CUET), athletic vigor, and social empathy.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-surface-container-high text-xs text-primary font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                <span>Nursery to Class XII Dual Medium</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 25-Year Journey Milestones */}
        <div>
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">OUR HERITAGE</span>
              <h2 className="font-serif text-3xl font-bold text-primary tracking-tight mt-1">
                25+ Years of Educational Leadership
              </h2>
              <p className="text-sm text-on-surface-variant mt-2">
                A timeline of growth, service to the community, and unbroken academic excellence in Basti.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.12}>
            {milestones.map((item, idx) => (
              <StaggerItem key={idx} direction="up">
                <div className="p-6 rounded-xl bg-surface-container-lowest border border-surface-container-high shadow-sm hover:border-tertiary-fixed-dim hover:-translate-y-1 transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className="font-serif font-bold text-2xl text-secondary">{item.year}</span>
                    <h4 className="font-bold text-primary text-base mt-2 mb-2">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container-high/60 flex items-center gap-1 text-[11px] text-primary font-semibold">
                    <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">star</span>
                    <span>Institutional Milestone</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Institutional Call To Action */}
        <div className="rounded-2xl bg-gradient-to-r from-primary via-primary-container to-primary text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-tertiary-fixed">Experience Iqura Public School</h3>
            <p className="text-xs sm:text-sm text-primary-fixed max-w-xl">
              Meet our distinguished faculty, explore our laboratories, and discover how our community shapes the next generation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate && onNavigate('staff')}
              className="px-5 py-2.5 bg-secondary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-on-secondary-container transition-all shadow"
            >
              Meet Our Faculty
            </button>
            <button
              onClick={() => onNavigate && onNavigate('gallery')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all border border-white/20"
            >
              View Campus Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
