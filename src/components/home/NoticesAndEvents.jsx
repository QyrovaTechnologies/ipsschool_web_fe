import React from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export default function NoticesAndEvents({ onNavigate }) {
  return (
    <section className="w-full py-space-xl bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Left: Official Notices & Circulars (7 cols) */}
          <div className="lg:col-span-7 space-y-space-md">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">OFFICIAL BOARD</span>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Recent Notices &amp; Circulars</h2>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('notices')}
                  className="text-label-md font-label-md font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors"
                >
                  Archive <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Notice Items List (Staggered On Scroll) */}
            <StaggerContainer className="space-y-3" staggerChildren={0.1}>
              {/* Notice 1 */}
              <StaggerItem direction="right">
                <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container-high/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary text-on-secondary w-12 h-12 rounded flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="font-label-sm text-[10px] uppercase font-bold">MAR</span>
                      <span className="font-headline-sm text-headline-sm leading-none">15</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded text-[10px] font-bold uppercase">Urgent</span>
                        <span className="font-body-sm text-body-sm text-outline">Ref: IPS/UPB/ADM/2026/04</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-primary mt-1">Admission Registration &amp; Entrance Test Schedule 2026–27</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Syllabus for written assessment &amp; interview timings for Nursery to Class XI.</p>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 text-label-sm font-label-sm font-bold text-primary bg-surface-container px-3 py-1.5 rounded hover:bg-surface-container-high transition-colors flex-shrink-0 self-start sm:self-center"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>PDF (240 KB)</span>
                  </a>
                </div>
              </StaggerItem>

              {/* Notice 2 */}
              <StaggerItem direction="right">
                <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container-high/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary-container text-tertiary-fixed w-12 h-12 rounded flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="font-label-sm text-[10px] uppercase font-bold">MAR</span>
                      <span className="font-headline-sm text-headline-sm leading-none">10</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-surface-container text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">Examination</span>
                        <span className="font-body-sm text-body-sm text-outline">Ref: IPS/EXAM/2026/89</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-primary mt-1">Annual Examination (VI to IX &amp; XI) Timetable &amp; Guidelines</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Detailed subject-wise schedule, revision timings, and reporting hours.</p>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 text-label-sm font-label-sm font-bold text-primary bg-surface-container px-3 py-1.5 rounded hover:bg-surface-container-high transition-colors flex-shrink-0 self-start sm:self-center"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>PDF (180 KB)</span>
                  </a>
                </div>
              </StaggerItem>

              {/* Notice 3 */}
              <StaggerItem direction="right">
                <div className="bg-surface-container-lowest p-4 rounded-lg shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-surface-container-high/40">
                  <div className="flex items-start gap-3">
                    <div className="bg-surface-container-highest text-primary w-12 h-12 rounded flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="font-label-sm text-[10px] uppercase font-bold">MAR</span>
                      <span className="font-headline-sm text-headline-sm leading-none">05</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-surface-container text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase">PTM Circular</span>
                        <span className="font-body-sm text-body-sm text-outline">Ref: IPS/GEN/2026/12</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-primary mt-1">Quarterly Parent-Teacher Meeting &amp; Progress Report Distribution</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Roll number slots for classes Nursery to XII on Saturday, 22nd March.</p>
                    </div>
                  </div>
                  <a
                    className="inline-flex items-center gap-1 text-label-sm font-label-sm font-bold text-primary bg-surface-container px-3 py-1.5 rounded hover:bg-surface-container-high transition-colors flex-shrink-0 self-start sm:self-center"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>PDF (120 KB)</span>
                  </a>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Right: Upcoming Events & Co-Curricular Calendar (5 cols) */}
          <div className="lg:col-span-5 space-y-space-md">
            <ScrollReveal direction="left" delay={0.15}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">DIARY &amp; FIXTURES</span>
                  <h3 className="font-headline-lg text-headline-lg text-primary tracking-tight">Upcoming Events</h3>
                </div>
                <button
                  onClick={() => onNavigate && onNavigate('campus')}
                  className="text-label-md font-label-md font-semibold text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors"
                >
                  Calendar <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Event Cards (Staggered On Scroll) */}
            <StaggerContainer className="space-y-3" staggerChildren={0.12}>
              <StaggerItem direction="left">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high/60 shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-surface-container text-primary flex flex-col items-center justify-center flex-shrink-0 font-bold shadow-sm">
                    <span className="text-[10px] tracking-wider uppercase text-secondary">APR</span>
                    <span className="text-xl leading-none">05</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed uppercase tracking-wider mb-1">
                      New Academic Session
                    </span>
                    <h4 className="font-headline-sm text-[15px] text-primary font-bold truncate">Session 2026–27 Orientation &amp; Assembly</h4>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">Main School Auditorium • 8:30 AM</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem direction="left">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high/60 shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-surface-container text-primary flex flex-col items-center justify-center flex-shrink-0 font-bold shadow-sm">
                    <span className="text-[10px] tracking-wider uppercase text-secondary">APR</span>
                    <span className="text-xl leading-none">18</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed-variant uppercase tracking-wider mb-1">
                      Sports &amp; Athletics
                    </span>
                    <h4 className="font-headline-sm text-[15px] text-primary font-bold truncate">Inter-House Football &amp; Cricket Tournament</h4>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">Junior &amp; Senior Grounds • 9:00 AM</p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem direction="left">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high/60 shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-surface-container text-primary flex flex-col items-center justify-center flex-shrink-0 font-bold shadow-sm">
                    <span className="text-[10px] tracking-wider uppercase text-secondary">MAY</span>
                    <span className="text-xl leading-none">02</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed uppercase tracking-wider mb-1">
                      Science &amp; Tech
                    </span>
                    <h4 className="font-headline-sm text-[15px] text-primary font-bold truncate">Annual Atal Tinkering Robotics Exhibition</h4>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">STEM Lab Complex • Open to Parents</p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}