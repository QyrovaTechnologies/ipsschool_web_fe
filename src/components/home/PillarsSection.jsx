import React from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export default function PillarsSection() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-space-xl space-y-2">
          <ScrollReveal direction="down" delay={0.1}>
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-widest">
              WHY PARENTS TRUST US
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <h2 className="font-headline-xl text-headline-xl text-primary tracking-tight">
              The Iqura Difference
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              An ecosystem designed to nurture academic brilliance, physical vitality, moral groundedness, and bilingual mastery.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento-style 5 Pillars Grid (Staggered On Scroll) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg" staggerChildren={0.12}>
          {/* Pillar 1: Board Rigour */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary-container text-tertiary-fixed flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">grade</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline font-bold">PILLAR 01</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Academic Excellence &amp; 100% Pass Record</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Consistently leading district and state merit lists. Integrated competitive exam preparatory modules for JEE, NEET, CUET, and NDA woven directly into Senior Secondary coursework.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-container flex items-center text-label-sm font-label-sm text-secondary font-semibold">
                <span>Specialized Board Mentoring Program</span>
              </div>
            </div>
          </StaggerItem>

          {/* Pillar 2: Dual Medium */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-secondary text-on-secondary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">language</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline font-bold">PILLAR 02</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Dual Medium Pedagogy (English &amp; हिन्दी)</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Distinct English and Hindi medium divisions from Nursery to 12th. Empowering scholars to learn in their optimal cognitive medium while cultivating complete bilingual command.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-container flex items-center text-label-sm font-label-sm text-secondary font-semibold">
                <span>Equal Academic Resources &amp; Facilities</span>
              </div>
            </div>
          </StaggerItem>

          {/* Pillar 3: STEM & AI */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">memory</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline font-bold">PILLAR 03</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Modern STEM &amp; AI Laboratories</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Dedicated Physics, Chemistry, Biology, Mathematics, Robotics, and high-speed Artificial Intelligence labs equipped with hands-on experiential project kits.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-container flex items-center text-label-sm font-label-sm text-secondary font-semibold">
                <span>Atal Tinkering Standard Equipment</span>
              </div>
            </div>
          </StaggerItem>

          {/* Pillar 4: Safe & Monitored Campus */}
          <StaggerItem direction="up">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between border border-surface-container-high/40">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container text-primary flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">security</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline font-bold">PILLAR 04</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Safe &amp; 360° Monitored Campus</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  200+ high-definition CCTV cameras, RFID-enabled smart student attendance cards, SMS parent alerts, and GPS-tracked school bus fleet with trained female attendants.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-surface-container flex items-center text-label-sm font-label-sm text-secondary font-semibold">
                <span>Full Medical Infirmary with Registered Nurse</span>
              </div>
            </div>
          </StaggerItem>

          {/* Pillar 5: Holistic Sports & Co-Curriculars (Spans 2 cols on lg) */}
          <StaggerItem direction="up" className="lg:col-span-2">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between border border-surface-container-high/40">
              <div className="flex flex-col sm:flex-row gap-space-md items-start">
                <div className="w-12 h-12 rounded-lg bg-tertiary-fixed-dim text-tertiary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">sports_cricket</span>
                </div>
                <div className="flex-1">
                  <span className="font-label-sm text-label-sm text-outline font-bold">PILLAR 05</span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-2">Sports Academies &amp; Cultural Co-Curriculars</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Olympic-standard 400m athletic track, dedicated Cricket Pitch, Badminton and Basketball courts, Taekwondo, Yoga &amp; Pranayama. Weekly debates, Vedic Mathematics clubs, classical Indian music, and theater society.
                  </p>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center">
                    <div className="bg-surface-container-low p-2 rounded hover:bg-surface-container transition-colors">
                      <span className="block font-headline-sm text-headline-sm text-primary font-bold">15+</span>
                      <span className="font-label-sm text-label-sm text-outline">Active Sports</span>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded hover:bg-surface-container transition-colors">
                      <span className="block font-headline-sm text-headline-sm text-primary font-bold">8</span>
                      <span className="font-label-sm text-label-sm text-outline">Cultural Clubs</span>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded hover:bg-surface-container transition-colors">
                      <span className="block font-headline-sm text-headline-sm text-primary font-bold">State</span>
                      <span className="font-label-sm text-label-sm text-outline">Champions</span>
                    </div>
                    <div className="bg-surface-container-low p-2 rounded hover:bg-surface-container transition-colors">
                      <span className="block font-headline-sm text-headline-sm text-primary font-bold">NCC &amp; NSS</span>
                      <span className="font-label-sm text-label-sm text-outline">Active Wings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}