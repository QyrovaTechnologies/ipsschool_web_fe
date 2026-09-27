import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStaff } from '../../api/client';
import ScrollReveal from '../common/ScrollReveal';

export default function PrincipalDesk({ onNavigate }) {
  const [heroStaffList, setHeroStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // High-profile leadership profiles with hero_staff subcategory
  const defaultLeadership = [
    {
      _id: 'lead-1',
      fullName: 'Sadrey Ayub Siddiqui',
      role: 'Director / Chairman',
      designation: 'Director & Managing Head',
      department: 'Administration',
      qualification: 'Institutional Governance & Leadership',
      experienceYears: 22,
      subjectsTaught: ['Institutional Governance', 'Strategic Vision'],
      photoUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      subcategory: 'hero_staff',
      message:
        'Our commitment is to nurture intellect, instill moral courage, and equip every young mind with the wisdom and integrity to lead society with purpose.',
      honor: '20+ Years Leadership'
    },
    {
      _id: 'lead-2',
      fullName: 'Er. Aftab Ahemed',
      role: 'Principal',
      designation: 'Principal & Head of Institution',
      department: 'Administration',
      qualification: 'B.Tech (Honours AKTU) • M.Tech (IIT Bhilai) • 2x GATE Qualified',
      experienceYears: 12,
      subjectsTaught: ['Advanced Mathematics', 'Physics & STEM Pedagogy'],
      photoUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      subcategory: 'hero_staff',
      message:
        'True education does not merely teach a child to read; it teaches them how to think critically, how to care deeply, and how to stand firm in character and scientific rigor.',
      honor: 'IIT Alumni • 2x GATE Qualified'
    },
    {
      _id: 'lead-3',
      fullName: 'Nure Saba',
      role: 'Vice Principal',
      designation: 'Vice Principal & Head of Science',
      department: 'Secondary & Sr Secondary',
      qualification: 'B.Sc., M.Sc., BTC, TET & CTET Qualified',
      experienceYears: 10,
      subjectsTaught: ['Biological Sciences', 'Environmental Pedagogy'],
      photoUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      subcategory: 'hero_staff',
      message:
        'Academic excellence blossoms when scientific inquiry meets compassionate mentorship, disciplined dedication, and the continuous pursuit of knowledge.',
      honor: 'TET & CTET Qualified'
    },
    {
      _id: 'lead-4',
      fullName: 'Deepak Chaudhary',
      role: 'Academic Coordinator',
      designation: 'Academic Coordinator',
      department: 'Administration',
      qualification: 'B.A., M.A., B.Ed.',
      experienceYears: 8,
      subjectsTaught: ['Curriculum Planning', 'Pedagogy & Faculty Development'],
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      subcategory: 'hero_staff',
      message:
        'A strong curriculum combined with structured discipline and innovative learning pathways allows every scholar to discover and realize their fullest potential.',
      honor: 'Academic Planning Specialist'
    },
    {
      _id: 'lead-5',
      fullName: 'Shahista Bano',
      role: 'Examination Head',
      designation: 'Examination Controller & Senior Educator',
      department: 'Administration',
      qualification: 'B.A., M.A., BTC, TET Qualified',
      experienceYears: 7,
      subjectsTaught: ['Language Studies', 'Assessment & Evaluation Systems'],
      photoUrl:
        'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=600',
      subcategory: 'hero_staff',
      message:
        'Fairness, rigorous evaluation standards, and transparent assessment frameworks build the foundation for lifelong academic integrity and personal confidence.',
      honor: 'TET Qualified • Controller of Exams'
    }
  ];

  // Fetch staff with subcategory === 'hero_staff' from backend
  useEffect(() => {
    let isMounted = true;

    const fetchHeroStaff = async () => {
      setLoading(true);
      try {
        const res = await getStaff({ subcategory: 'hero_staff' });
        if (isMounted) {
          if (res?.data && res.data.length > 0) {
            if (res.data.length === 1) {
              const extra = defaultLeadership.find((d) => d.fullName !== res.data[0].fullName) || defaultLeadership[1];
              setHeroStaffList([...res.data, extra]);
            } else {
              setHeroStaffList(res.data);
            }
          } else {
            // Check if any leadership role exists in general staff
            const allStaffRes = await getStaff();
            const leaders = (allStaffRes?.data || []).filter((s) =>
              ['Director / Chairman', 'Director', 'Principal', 'Vice Principal', 'Academic Coordinator', 'Examination Head'].includes(s.role)
            );
            if (leaders.length >= 2) {
              setHeroStaffList(leaders);
            } else {
              setHeroStaffList(defaultLeadership);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch hero_staff from backend, using defaults:', err);
        if (isMounted) {
          setHeroStaffList(defaultLeadership);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHeroStaff();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeStaffList = heroStaffList.length >= 2 ? heroStaffList : defaultLeadership;

  // Build slides so that each view contains at least 2 staff cards side by side
  const slides = [];
  if (activeStaffList.length <= 2) {
    slides.push(activeStaffList);
  } else if (activeStaffList.length % 2 === 0) {
    for (let i = 0; i < activeStaffList.length; i += 2) {
      slides.push([activeStaffList[i], activeStaffList[i + 1]]);
    }
  } else {
    // For odd numbers, pair sequentially with wrap-around
    for (let i = 0; i < activeStaffList.length; i += 2) {
      if (i + 1 < activeStaffList.length) {
        slides.push([activeStaffList[i], activeStaffList[i + 1]]);
      } else {
        slides.push([activeStaffList[i], activeStaffList[0]]);
      }
    }
  }

  const totalSlides = slides.length;

  // Horizontal pagination handler
  const paginate = useCallback(
    (newDirection) => {
      setSlideDirection(newDirection);
      setCurrentSlide((prev) => {
        const next = prev + newDirection;
        if (next >= totalSlides) return 0;
        if (next < 0) return totalSlides - 1;
        return next;
      });
    },
    [totalSlides]
  );

  // Auto-switch carousel animation horizontally every 6 seconds (pauses on hover)
  useEffect(() => {
    if (totalSlides <= 1 || isHovered) return;

    autoPlayTimerRef.current = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [totalSlides, isHovered, paginate]);

  // Framer Motion horizontal slide transition
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 260 : -260,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -260 : 260,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Director / Chairman':
      case 'Director':
        return 'bg-amber-500/10 text-amber-300 border-amber-400/40';
      case 'Principal':
        return 'bg-secondary/20 text-red-200 border-secondary/50';
      case 'Vice Principal':
        return 'bg-blue-500/10 text-blue-200 border-blue-400/40';
      case 'Academic Coordinator':
        return 'bg-purple-500/10 text-purple-200 border-purple-400/40';
      case 'Examination Head':
        return 'bg-emerald-500/10 text-emerald-200 border-emerald-400/40';
      default:
        return 'bg-slate-700/30 text-slate-200 border-slate-600/40';
    }
  };

  // Touch swipe support for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      paginate(1);
    } else if (diff < -50) {
      paginate(-1);
    }
  };

  const currentPair = slides[currentSlide] || slides[0] || [];

  return (
    <section
      className="w-full py-16 bg-[#f4f7fc] border-y border-surface-container-high relative overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded text-primary text-xs font-bold tracking-wider uppercase mb-2">
                <span className="material-symbols-outlined text-[15px] text-secondary">school</span>
                <span>Leadership &amp; Faculty Desk</span>
              </div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary tracking-tight">
                From the <span className="text-secondary">Administrative Desk</span>
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Scholastic guidance, foundational values, and academic leadership at Iqura Public School.
              </p>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-mono text-on-surface-variant font-semibold mr-1">
                Slide {currentSlide + 1} of {totalSlides}
              </span>
              <button
                onClick={() => paginate(-1)}
                className="w-9 h-9 rounded-lg bg-white hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all shadow-sm border border-outline-variant/60 active:scale-95"
                title="Previous"
                aria-label="Previous slide"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                onClick={() => paginate(1)}
                className="w-9 h-9 rounded-lg bg-white hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all shadow-sm border border-outline-variant/60 active:scale-95"
                title="Next"
                aria-label="Next slide"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 2 Staff Cards in a Single View (Horizontal Animated Switcher) */}
        <div className="relative min-h-[380px]">
          <AnimatePresence initial={false} custom={slideDirection} mode="wait">
            <motion.div
              key={currentSlide}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {currentPair.map((staff, idx) => (
                <div
                  key={staff._id || `${staff.fullName}-${idx}`}
                  className="group relative bg-gradient-to-b from-[#001733] via-[#00132b] to-[#000d1e] text-white rounded-2xl shadow-xl hover:shadow-2xl border border-white/10 hover:border-tertiary-fixed-dim/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Ambient Gold Gradient Accent Line */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-tertiary-fixed to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Subtle Background Glows */}
                  <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-tertiary-fixed/5 blur-3xl pointer-events-none" />

                  {/* Watermark Crest */}
                  <div className="absolute right-2 -bottom-4 opacity-[0.03] text-tertiary-fixed pointer-events-none select-none">
                    <span className="material-symbols-outlined text-[180px] leading-none">menu_book</span>
                  </div>

                  {/* Main Content Area */}
                  <div className="p-5 sm:p-7 relative z-10">
                    {/* Top Role & Department Pill Bar */}
                    <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm ${getRoleBadgeStyle(
                          staff.role
                        )}`}
                      >
                        <span className="material-symbols-outlined text-[13px]">workspace_premium</span>
                        <span>{staff.role}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 font-medium bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {staff.department || 'Administration'}
                      </span>
                    </div>

                    {/* Member Profile Layout: Side-by-side on mobile, expansive on desktop */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                      {/* Portrait Photo with Multi-ring Border & Floating Pill */}
                      <div className="flex items-center sm:block gap-4 w-full sm:w-auto flex-shrink-0">
                        <div className="relative">
                          <div className="w-24 h-28 sm:w-32 sm:h-40 rounded-xl overflow-hidden border-2 border-tertiary-fixed-dim/50 shadow-xl bg-slate-900 group-hover:border-tertiary-fixed transition-colors">
                            <img
                              src={staff.photoUrl}
                              alt={staff.fullName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                              }}
                            />
                          </div>
                          {staff.experienceYears > 0 && (
                            <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 rounded-full bg-secondary text-white text-[9px] sm:text-[10px] font-bold tracking-wider uppercase shadow-md border border-white/20 whitespace-nowrap">
                              {staff.experienceYears}+ Yrs Exp
                            </div>
                          )}
                        </div>

                        {/* On mobile screens (<640px): show Name and Designation right next to the photo */}
                        <div className="sm:hidden flex-1 min-w-0">
                          <h3 className="font-serif font-bold text-lg text-white tracking-tight leading-snug">
                            {staff.fullName}
                          </h3>
                          <p className="text-xs font-semibold text-tertiary-fixed uppercase tracking-wider mt-0.5">
                            {staff.designation || staff.role}
                          </p>
                          {staff.qualification && (
                            <p className="text-[11px] text-slate-300 font-medium mt-1 leading-snug">
                              {staff.qualification}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Desktop Header & Quote Details */}
                      <div className="flex-1 min-w-0 space-y-2.5 w-full">
                        <div className="hidden sm:block">
                          <h3 className="font-serif font-bold text-xl text-white tracking-tight">
                            {staff.fullName}
                          </h3>
                          <p className="text-xs font-semibold text-tertiary-fixed uppercase tracking-wider mt-0.5">
                            {staff.designation || staff.role}
                          </p>
                          {staff.qualification && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                              <span className="material-symbols-outlined text-[15px] text-tertiary-fixed flex-shrink-0">school</span>
                              <span>{staff.qualification}</span>
                            </div>
                          )}
                        </div>

                        {/* Editorial Message / Quote Box */}
                        <div className="relative bg-white/[0.04] p-3 sm:p-3.5 rounded-xl border border-white/10 mt-1">
                          <span className="material-symbols-outlined absolute top-1.5 right-2 text-[26px] text-white/10 select-none pointer-events-none">
                            format_quote
                          </span>
                          <p className="font-serif italic text-xs sm:text-[13px] text-slate-200 leading-relaxed relative z-10">
                            “{staff.message ||
                              'Committed to scholastic distinction, values-driven pedagogy, and the holistic growth of every student.'}”
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Signature and Link */}
                  <div className="px-5 py-3 sm:px-7 sm:py-3.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                    <div className="flex items-center gap-1.5 text-tertiary-fixed font-medium">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      <span className="font-serif italic text-xs sm:text-sm font-semibold">{staff.fullName}</span>
                    </div>

                    <button
                      onClick={() => onNavigate && onNavigate('staff')}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-tertiary-fixed transition-colors font-semibold group/btn"
                    >
                      <span>View Profile</span>
                      <span className="material-symbols-outlined text-[14px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex flex-col items-center justify-center gap-2 mt-6">
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSlideDirection(i > currentSlide ? 1 : -1);
                    setCurrentSlide(i);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide ? 'w-6 h-2 bg-secondary' : 'w-2 h-2 bg-outline-variant/60 hover:bg-outline'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Mobile swipe helper hint */}
            <div className="flex sm:hidden items-center gap-1.5 text-[11px] text-on-surface-variant font-medium mt-1">
              <span className="material-symbols-outlined text-[14px] text-secondary animate-pulse">swipe</span>
              <span>Swipe left or right to view more leadership profiles</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}