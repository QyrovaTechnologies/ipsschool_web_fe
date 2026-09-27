import React, { useState, useEffect } from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../common/ScrollReveal';
import { getResults } from '../../api/client';

export default function AboutSection({ onNavigate }) {
  const [toppers, setToppers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real student toppers from backend
  useEffect(() => {
    let isMounted = true;

    const fetchToppers = async () => {
      try {
        // First try to get featured toppers
        const res = await getResults({ featured: 'true' });
        if (isMounted && res?.data && res.data.length > 0) {
          setToppers(res.data);
        } else if (isMounted) {
          // If no featured flag set, get any available board results
          const allRes = await getResults();
          if (allRes?.data && allRes.data.length > 0) {
            setToppers(allRes.data);
          } else {
            setToppers([]);
          }
        }
      } catch (err) {
        console.warn('Could not fetch results from backend:', err);
        if (isMounted) setToppers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchToppers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full py-space-xl bg-surface overflow-hidden" id="about-section">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Column: Core Institutional Story (7 cols) */}
          <div className="lg:col-span-7 space-y-space-md">
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
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">Continuous assessments, Olympiad coaching, and personalized mentoring.</p>
                </div>
              </StaggerItem>

              <StaggerItem direction="up">
                <div className="p-4 rounded-lg bg-surface-container-low shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded bg-secondary text-on-secondary flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[22px]">translate</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Dual Medium</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">Full curriculum delivery in English &amp; Hindi mediums from Nursery to Class XII.</p>
                </div>
              </StaggerItem>

              <StaggerItem direction="up">
                <div className="p-4 rounded-lg bg-surface-container-low shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded bg-tertiary-container text-tertiary-fixed flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[22px]">self_improvement</span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Holistic Character</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">Vedic heritage, ethics classes, social outreach, and sportsmanship.</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate && onNavigate('about-us')}
                  className="inline-flex items-center gap-2 text-secondary font-label-lg text-label-lg font-bold hover:text-on-secondary-container transition-colors group"
                >
                  <span>Read Our Complete Story &amp; History</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Institutional Showcase Card (5 cols) (Slide in from Right on Scroll) */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" delay={0.2} distance={45}>
              <div className="bg-surface-container-low border border-surface-container-high/80 rounded-2xl p-6 lg:p-8 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-secondary animate-ping" />
                    <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">Academic Distinction</span>
                  </div>
                  <span className="bg-primary text-tertiary-fixed text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {toppers.length > 0 && toppers[0].category === 'class_10'
                      ? 'Class X Results'
                      : toppers.length > 0 && toppers[0].category === 'class_12'
                      ? 'Class XII Results'
                      : 'Board Results'}
                  </span>
                </div>

                {/* Dynamic Toppers from Backend */}
                <div className="space-y-4">
                  {loading ? (
                    <div className="py-8 text-center text-xs text-on-surface-variant animate-pulse">
                      Loading board results from database...
                    </div>
                  ) : toppers.length > 0 ? (
                    toppers.slice(0, 2).map((item) => (
                      <div
                        key={item._id}
                        className="flex items-start gap-4 p-3.5 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-high/40 hover:shadow-md transition-shadow"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary flex-shrink-0 bg-slate-100 shadow-inner">
                          <img
                            alt={item.studentName}
                            className="w-full h-full object-cover"
                            src={item.photoUrl}
                            onError={(e) => {
                              e.target.src =
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1">
                            <h4 className="font-headline-sm text-[16px] text-primary font-bold truncate">
                              {item.studentName}
                            </h4>
                            <span className="font-display-lg text-lg text-secondary font-bold">
                              {item.percentage}%
                            </span>
                          </div>
                          <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                            {item.category === 'class_12'
                              ? 'Class XII'
                              : item.category === 'class_10'
                              ? 'Class X'
                              : 'Foundation'}
                            {item.stream ? ` — ${item.stream}` : ''}
                            {item.rankTitle ? ` | ${item.rankTitle}` : ''}
                          </p>
                          {item.specialHonors && (
                            <span className="inline-block text-[11px] text-primary font-semibold mt-0.5 truncate">
                              {item.specialHonors}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center bg-surface-container-lowest rounded-xl border border-dashed border-surface-container-high">
                      <span className="material-symbols-outlined text-secondary text-[32px] mb-1.5 block">
                        workspace_premium
                      </span>
                      <h4 className="font-headline-sm text-sm font-bold text-primary mb-1">
                        Board Merit List
                      </h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Toppers uploaded from the admin panel will appear here automatically.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-surface-container-high flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                    {toppers.length > 0
                      ? `${toppers.length} Board Scholars Listed`
                      : 'Merit & Honor Roll'}
                  </span>
                  <button
                    onClick={() => onNavigate && onNavigate('results')}
                    className="text-primary font-bold text-label-sm hover:text-secondary inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Honor Roll</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}