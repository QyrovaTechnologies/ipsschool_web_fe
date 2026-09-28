import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGalleryByPosition, getGallery, getResults } from '../../api/client';

const DEFAULT_TOPPERS = [
  {
    _id: 'ips-star-1',
    studentName: 'Aafiya Siddiqui',
    percentage: 97.8,
    category: 'class_12',
    stream: 'Science (PCB)',
    academicYear: '2024-25',
    rankTitle: 'School 1st Rank',
    specialHonors: 'District Merit • 100/100 Biology',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    tag: 'Board Star'
  },
  {
    _id: 'ips-star-2',
    studentName: 'Mohd. Zeeshan',
    percentage: 96.6,
    category: 'class_12',
    stream: 'Commerce (Maths)',
    academicYear: '2024-25',
    rankTitle: 'District 2nd Rank',
    specialHonors: 'UP Board Merit • 99/100 Accounts',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    tag: 'Commerce Topper'
  },
  {
    _id: 'ips-star-3',
    studentName: 'Ananya Verma',
    percentage: 98.2,
    category: 'class_10',
    stream: 'Secondary High School',
    academicYear: '2024-25',
    rankTitle: 'State Rank 4',
    specialHonors: 'High School Board Merit • 100/100 Math',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    tag: 'Class X Topper'
  }
];

export default function HeroBanner({ onNavigate, onOpenEnquiry }) {
  const [allBanners, setAllBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [topperIndex, setTopperIndex] = useState(0);
  const checkIsMobile = () => {
    if (typeof window !== 'undefined') {
      return (
        window.innerWidth < 768 ||
        window.matchMedia('(max-width: 767px)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    }
    return false;
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [toppersList, setToppersList] = useState(DEFAULT_TOPPERS);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Screen resize listener to detect mobile vs desktop viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Reset banner index when switching between mobile and desktop view
  useEffect(() => {
    setCurrentBannerIndex(0);
  }, [isMobile]);

  // Fetch all images uploaded with position === 'hero_banner' or 'hero_banner_mobile' from backend
  useEffect(() => {
    let isMounted = true;

    const loadHeroData = async () => {
      try {
        const [generalRes, mobileRes, allRes] = await Promise.all([
          getGalleryByPosition('hero_banner').catch(() => ({ data: [] })),
          getGalleryByPosition('hero_banner_mobile').catch(() => ({ data: [] })),
          getGallery().catch(() => ({ data: [] }))
        ]);

        if (isMounted) {
          // Put mobile banners into the pool with general banners and all gallery
          const combined = [
            ...(mobileRes?.data || []),
            ...(generalRes?.data || [])
          ];
          const finalBanners = combined.length > 0 ? combined : (allRes?.data || []);
          setAllBanners(finalBanners);
        }
      } catch (err) {
        console.warn('Could not fetch hero banner images from backend:', err);
      }

      // Fetch real student results from backend (featured first, then general)
      try {
        const resultsRes = await getResults({ featured: 'true' });
        if (isMounted && resultsRes?.data && resultsRes.data.length > 0) {
          setToppersList(resultsRes.data);
        } else {
          const allResultsRes = await getResults();
          if (isMounted && allResultsRes?.data && allResultsRes.data.length > 0) {
            setToppersList(allResultsRes.data);
          }
        }
      } catch (err) {
        console.warn('Could not fetch results from backend (using fallback):', err);
      }
    };

    loadHeroData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to reliably check if banner is designed for mobile view
  const isMobileBannerItem = (b) => {
    if (!b) return false;
    const view = (b.view || '').toLowerCase();
    const pos = (b.position || b.placement || '').toLowerCase();
    const title = (b.title || '').toLowerCase();
    return (
      view === 'mobile' ||
      pos === 'hero_banner_mobile' ||
      pos.includes('mobile') ||
      title.includes('mobile')
    );
  };

  // Filter banners dynamically according to whether current viewport is Mobile or Desktop
  const mobileBanners = allBanners.filter(isMobileBannerItem);
  const desktopBanners = allBanners.filter((b) => !isMobileBannerItem(b));

  // If on mobile, strictly show mobile banners; only fallback to desktop if no mobile banner exists
  const activeBanners = isMobile
    ? (mobileBanners.length > 0 ? mobileBanners : (desktopBanners.length > 0 ? desktopBanners : allBanners))
    : (desktopBanners.length > 0 ? desktopBanners : allBanners);

  // Reset index if out of bounds on viewport resize
  useEffect(() => {
    if (currentBannerIndex >= activeBanners.length) {
      setCurrentBannerIndex(0);
    }
  }, [activeBanners.length, currentBannerIndex]);

  // Horizontal Banner Slide Handler
  const paginateBanner = useCallback(
    (newDirection) => {
      setSlideDirection(newDirection);
      setCurrentBannerIndex((prev) => {
        const next = prev + newDirection;
        if (next >= activeBanners.length) return 0;
        if (next < 0) return activeBanners.length - 1;
        return next;
      });
    },
    [activeBanners.length]
  );

  // Auto-scroll horizontal banner animation every 6 seconds
  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      paginateBanner(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeBanners.length, paginateBanner]);

  // Topper rotation timer
  useEffect(() => {
    if (toppersList.length <= 1) return;
    const timer = setInterval(() => {
      setTopperIndex((prev) => (prev + 1) % toppersList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [toppersList.length]);

  // Touch gestures for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      paginateBanner(1); // Swipe left -> Next
    } else if (diff < -50) {
      paginateBanner(-1); // Swipe right -> Previous
    }
  };

  const currentBanner = activeBanners[currentBannerIndex] || activeBanners[0];
  const currentTopper = toppersList[topperIndex] || toppersList[0];
  const isDedicatedMobileBanner = isMobile && (currentBanner?.view === 'mobile' || currentBanner?.position === 'hero_banner_mobile');

  // Horizontal slide animation variants for background
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 28 },
        opacity: { duration: 0.6 },
        scale: { duration: 6, ease: 'easeOut' }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.5 }
    })
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-primary text-on-primary select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[760px] flex items-center" 
        id="hero-slider"
      >
        {/* ================= BACKGROUND HORIZONTAL SLIDING ANIMATION ================= */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
            <motion.div
              key={currentBanner?._id || currentBannerIndex}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`absolute inset-0 bg-cover w-full h-full ${
                isMobile ? 'bg-[center_top]' : 'bg-[center_35%]'
              }`}
              style={{
                backgroundImage: currentBanner?.imageUrl ? `url("${currentBanner.imageUrl}")` : undefined,
                filter: isMobile ? 'brightness(1.05) contrast(1.03)' : 'brightness(1.08) contrast(1.04) saturate(1.08)'
              }}
            >
              {/* Responsive Gradient Overlays: Richer on mobile to guarantee crystal-clear text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40 lg:from-primary/85 lg:via-primary/45 lg:to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-black/30 lg:from-primary/85 lg:via-transparent lg:to-black/25" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Left & Right Horizontal Navigation Controls (Desktop & Tablet) */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={() => paginateBanner(-1)}
              aria-label="Previous Banner"
              className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/70 hover:bg-secondary text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">chevron_left</span>
            </button>
            <button
              onClick={() => paginateBanner(1)}
              aria-label="Next Banner"
              className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/70 hover:bg-secondary text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">chevron_right</span>
            </button>
          </>
        )}

        {/* Hero Main Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-space-xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-space-xl items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-space-md" style={{ textShadow: '0 2px 10px rgba(0, 15, 30, 0.95), 0 4px 20px rgba(0, 0, 0, 0.85)' }}>
              
              {/* Heraldic Affiliation Chip & Mobile Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-wrap items-center gap-2"
              >
                <div className="inline-flex items-center gap-2 bg-primary-container/85 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded shadow-sm border border-primary-container">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[16px] sm:text-[18px]">verified</span>
                  <span className="font-label-sm text-[10px] sm:text-label-sm text-tertiary-fixed tracking-wider uppercase font-bold">
                    UP Board AFFILIATED • NURSERY TO XII • CODE: 1221
                  </span>
                </div>

                {/* Mobile View Badge Indicator */}
                {isDedicatedMobileBanner && (
                  <div className="inline-flex items-center gap-1 bg-secondary/80 backdrop-blur-md text-on-secondary px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    <span className="material-symbols-outlined text-[13px]">smartphone</span>
                    <span>Mobile View</span>
                  </div>
                )}
              </motion.div>

              {/* Hero Headline with Staggered Entrance */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-display-lg font-bold text-on-primary tracking-tight leading-tight sm:leading-snug"
              >
                Building Character.<br />
                <span className="text-tertiary-fixed font-serif italic font-normal">Inspiring Academic Excellence.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm sm:text-base lg:text-body-xl text-primary-fixed leading-relaxed max-w-2xl font-normal"
              >
                <span className="text-white font-semibold">
                  Welcome to <span className="text-tertiary-fixed font-serif font-bold">Iqura Public School</span> —{' '}
                </span>
                where traditional Indian values, bilingual fluency in English &amp; Hindi, and modern scientific inquiry shape confident global leaders equipped for tomorrow's world.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              >
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry()}
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary px-6 py-3.5 rounded text-sm sm:text-label-lg font-semibold hover:bg-on-secondary-container transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 text-center"
                >
                  <span>Admissions Open 2026–27</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <a
                  href="#about-section"
                  className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest/15 backdrop-blur-sm text-on-primary px-5 py-3.5 rounded text-sm sm:text-label-lg font-medium hover:bg-surface-container-lowest/25 transition-all hover:scale-105 text-center"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">explore</span>
                  <span>Explore Our School</span>
                </a>
              </motion.div>

              {/* Credentials Micro-badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-3 sm:pt-space-md grid grid-cols-3 gap-2 sm:gap-4 border-t border-primary-container/60 max-w-lg"
              >
                <div className="hover:-translate-y-1 transition-transform p-1">
                  <span className="block text-xl sm:text-2xl lg:text-headline-md font-bold text-tertiary-fixed">25+</span>
                  <span className="block text-[11px] sm:text-body-sm text-primary-fixed-dim">Years Legacy</span>
                </div>
                <div className="hover:-translate-y-1 transition-transform p-1">
                  <span className="block text-xl sm:text-2xl lg:text-headline-md font-bold text-tertiary-fixed">100%</span>
                  <span className="block text-[11px] sm:text-body-sm text-primary-fixed-dim">Pass Rate</span>
                </div>
                <div className="hover:-translate-y-1 transition-transform p-1">
                  <span className="block text-xl sm:text-2xl lg:text-headline-md font-bold text-tertiary-fixed">Eng / हिं</span>
                  <span className="block text-[11px] sm:text-body-sm text-primary-fixed-dim">Dual Medium</span>
                </div>
              </motion.div>
            </div>

            {/* Right Content (5 Cols): EXECUTIVE ENTERPRISE TOPPER PLAQUE */}
            {toppersList.length > 0 && currentTopper && (
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0"
              >
                <div className="relative w-full max-w-[350px] sm:max-w-[370px]" id="hero-topper-widget">
                  {/* Ambient golden glow */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400/20 via-secondary/25 to-amber-300/20 rounded-[22px] blur-xl opacity-75 pointer-events-none" />

                  {/* Main Executive Glass Card */}
                  <div className="relative rounded-[22px] bg-gradient-to-b from-[#0a1c34]/95 via-[#061426]/95 to-[#020b18]/98 backdrop-blur-2xl border border-amber-400/35 shadow-[0_20px_50px_-12px_rgba(0,10,25,0.85)] p-4 sm:p-5 overflow-hidden">
                    {/* Top Gold Foil Accent Rim */}
                    <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-300/90 to-transparent" />
                    {/* Radial Ambient Backlight */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-24 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

                    {/* Header Bar */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 relative z-10">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300">
                        <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                          workspace_premium
                        </span>
                        <span className="text-[10px] font-black tracking-widest uppercase">
                          HALL OF FAME
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-slate-300 bg-white/[0.06] border border-white/10 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{currentTopper.academicYear ? `Session ${currentTopper.academicYear}` : 'Session 2024–25'}</span>
                      </div>
                    </div>

                    {/* Animated Student Showcase Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTopper._id || topperIndex}
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="pt-3.5 relative z-10"
                      >
                        {/* Center Profile Row: Portrait & Score Details */}
                        <div className="flex items-center gap-4">
                          {/* Portrait Frame with Gold-to-Ruby Ring */}
                          <div className="relative flex-shrink-0">
                            <div className="w-[82px] h-[82px] sm:w-[92px] sm:h-[92px] rounded-2xl p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-200 shadow-xl transition-transform duration-300 hover:scale-105">
                              <div className="w-full h-full rounded-[13px] overflow-hidden bg-slate-900 border-2 border-[#0a1c34]">
                                <img
                                  alt={currentTopper.studentName}
                                  className="w-full h-full object-cover"
                                  src={currentTopper.photoUrl}
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src =
                                      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400';
                                  }}
                                />
                              </div>
                            </div>

                            {/* Rank Badge Attached to Portrait */}
                            <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-max max-w-[88px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-[9px] tracking-wider uppercase shadow-md border border-amber-200/80 flex items-center justify-center gap-0.5 truncate">
                              <span className="material-symbols-outlined text-[12px] flex-shrink-0" style={{ fontVariationSettings: '"FILL" 1' }}>
                                military_tech
                              </span>
                              <span className="truncate">{currentTopper.rankTitle || 'State Star'}</span>
                            </div>
                          </div>

                          {/* Primary Metrics: Score & Category */}
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl sm:text-4xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 leading-none">
                                {currentTopper.percentage}
                              </span>
                              <span className="text-xl sm:text-2xl font-black text-amber-300 font-serif leading-none">%</span>
                            </div>

                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                              <span className="text-[10px] font-bold text-amber-300/80 uppercase tracking-widest">
                                AGGREGATE
                              </span>
                              <span className="w-1 h-1 rounded-full bg-amber-400/40" />
                              <span className="px-1.5 py-0.2 rounded bg-secondary/85 text-white text-[9px] font-extrabold uppercase tracking-wider border border-secondary-container/30">
                                {currentTopper.tag || (currentTopper.category === 'class_12' ? 'Class XII' : 'Class X')}
                              </span>
                            </div>

                            {/* Student Name */}
                            <h4 className="text-base sm:text-[17px] font-bold text-white font-serif tracking-tight truncate mt-1.5" title={currentTopper.studentName}>
                              {currentTopper.studentName}
                            </h4>

                            {/* Stream / Wing Subtitle */}
                            <p className="text-xs text-slate-300/85 font-medium truncate mt-0.5">
                              {currentTopper.stream || (currentTopper.category === 'class_12' ? 'Senior Secondary (10+2)' : 'Secondary High School')}
                            </p>
                          </div>
                        </div>

                        {/* Special Honors Distinction Plaque */}
                        {currentTopper.specialHonors && (
                          <div className="mt-3.5 py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-left gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="material-symbols-outlined text-[15px] text-amber-300 flex-shrink-0" style={{ fontVariationSettings: '"FILL" 1' }}>
                                award_star
                              </span>
                              <span className="text-[11px] text-amber-200/95 font-medium truncate">
                                {currentTopper.specialHonors}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex-shrink-0">
                              MERIT
                            </span>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Footer Controls: Navigation & Link to Results */}
                    <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between relative z-10 text-xs">
                      {/* Carousel Controls */}
                      <div className="flex items-center gap-1.5">
                        {toppersList.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setTopperIndex((prev) => (prev - 1 + toppersList.length) % toppersList.length);
                              }}
                              aria-label="Previous Topper"
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-secondary text-white border border-white/15 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                            >
                              <span className="material-symbols-outlined text-[15px]">chevron_left</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setTopperIndex((prev) => (prev + 1) % toppersList.length);
                              }}
                              aria-label="Next Topper"
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-secondary text-white border border-white/15 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                            >
                              <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                            </button>
                          </>
                        )}
                        {toppersList.length > 1 && (
                          <span className="text-[10px] font-mono font-bold text-amber-300/80 ml-1">
                            0{topperIndex + 1} / 0{toppersList.length}
                          </span>
                        )}
                      </div>

                      {/* Direct Link to Results */}
                      <button
                        onClick={() => onNavigate && onNavigate('results')}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-300 hover:text-white transition-colors group"
                      >
                        <span>Merit List</span>
                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                      </button>
                    </div>

                    {/* Progress Indicator Dots */}
                    {toppersList.length > 1 && (
                      <div className="mt-2.5 flex items-center justify-center gap-1.5">
                        {toppersList.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setTopperIndex(i)}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              topperIndex === i ? 'w-4 bg-amber-400' : 'w-1 bg-white/25 hover:bg-white/50'
                            }`}
                            aria-label={`Topper ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Bottom Horizontal Slider Pagination Dots & Slide Counter for Background Banners */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-5 inset-x-0 z-20 flex items-center justify-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-primary/80 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20 shadow-lg">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSlideDirection(idx > currentBannerIndex ? 1 : -1);
                    setCurrentBannerIndex(idx);
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    currentBannerIndex === idx
                      ? 'w-6 sm:w-7 bg-tertiary-fixed shadow-md'
                      : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
              <span className="ml-2 pl-2 border-l border-white/20 text-[10px] sm:text-[11px] font-mono font-bold text-tertiary-fixed">
                0{currentBannerIndex + 1} / 0{activeBanners.length}
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}