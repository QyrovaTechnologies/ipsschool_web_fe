import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGalleryByPosition, getGallery, getResults } from '../../api/client';

export default function HeroBanner({ onNavigate, onOpenEnquiry }) {
  const [allBanners, setAllBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [topperIndex, setTopperIndex] = useState(0);
  const checkIsMobile = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || window.matchMedia('(max-width: 767px)').matches;
    }
    return false;
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);
  const [toppersList, setToppersList] = useState([]);

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
    return () => window.removeEventListener('resize', handleResize);
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
          const combined = [
            ...(generalRes?.data || []),
            ...(mobileRes?.data || [])
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
          } else {
            setToppersList([]);
          }
        }
      } catch (err) {
        console.warn('Could not fetch results from backend:', err);
        if (isMounted) setToppersList([]);
      }
    };

    loadHeroData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter banners dynamically according to whether current viewport is Mobile or Desktop
  const mobileBanners = allBanners.filter(
    (b) => b.view === 'mobile' || b.position === 'hero_banner_mobile'
  );

  const desktopBanners = allBanners.filter(
    (b) => b.view === 'desktop' || (b.view !== 'mobile' && b.position !== 'hero_banner_mobile')
  );

  // If on mobile, prioritize mobile view images; if none uploaded yet, fallback to desktop/all banners
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

            {/* Right Content (5 Cols): REAL TOPPERS FROM BACKEND */}
            {toppersList.length > 0 && currentTopper && (
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0"
              >
                <div className="relative w-full max-w-sm" id="hero-topper-widget">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTopper._id || topperIndex}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="student-slide flex flex-col items-center text-center max-w-sm mx-auto"
                    >
                      {/* Circle Image with Floating Badge & Previous/Next Buttons */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full p-1.5 bg-gradient-to-tr from-tertiary-fixed-dim via-surface-container-lowest to-secondary shadow-2xl transition-transform duration-300 hover:scale-105">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-surface-container-lowest bg-surface-container shadow-inner">
                            <img
                              alt={currentTopper.studentName}
                              className="w-full h-full object-cover"
                              src={currentTopper.photoUrl}
                            />
                          </div>
                        </div>

                        {/* Rank / Award Badge */}
                        <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-3 sm:px-3.5 py-1 rounded-full bg-primary text-tertiary-fixed font-label-sm text-[10px] sm:text-[11px] tracking-wider uppercase font-bold shadow-xl border border-tertiary-fixed-dim flex items-center gap-1.5 backdrop-blur-md">
                          <span className="material-symbols-outlined text-[13px] text-tertiary-fixed" style={{ fontVariationSettings: '"FILL" 1' }}>
                            workspace_premium
                          </span>
                          {currentTopper.rankTitle || 'Board Star'}
                        </div>

                        {/* Left Navigation Chevron */}
                        {toppersList.length > 1 && (
                          <button
                            onClick={() =>
                              setTopperIndex((prev) => (prev - 1 + toppersList.length) % toppersList.length)
                            }
                            aria-label="Previous Topper"
                            className="topper-prev-btn absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/90 hover:bg-secondary text-on-primary shadow-lg border border-surface-container-lowest/40 flex items-center justify-center transition-all z-20 hover:scale-110 active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">chevron_left</span>
                          </button>
                        )}

                        {/* Right Navigation Chevron */}
                        {toppersList.length > 1 && (
                          <button
                            onClick={() =>
                              setTopperIndex((prev) => (prev + 1) % toppersList.length)
                            }
                            aria-label="Next Topper"
                            className="topper-next-btn absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/90 hover:bg-secondary text-on-primary shadow-lg border border-surface-container-lowest/40 flex items-center justify-center transition-all z-20 hover:scale-110 active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">chevron_right</span>
                          </button>
                        )}
                      </div>

                      {/* Result Details Card */}
                      <div className="mt-5 sm:mt-6 bg-surface-container-lowest/95 backdrop-blur-md px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl shadow-xl border border-surface-container-high/60 w-full max-w-xs transition-all hover:shadow-2xl text-slate-900">
                        <div className="inline-flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-secondary leading-none">
                            {currentTopper.percentage}
                          </span>
                          <span className="text-xl font-bold text-secondary">%</span>
                          <span className="ml-2 px-2 py-0.5 bg-primary text-on-primary rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                            {currentTopper.tag || currentTopper.category?.replace('_', ' ') || 'Top Rank'}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-primary uppercase tracking-tight mt-1 truncate">
                          {currentTopper.studentName}
                        </h3>

                        <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
                          {currentTopper.stream || `Session ${currentTopper.academicYear || '2024-25'}`}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-surface-container-high flex items-center justify-between text-xs">
                          <span className="text-on-surface-variant flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                            {currentTopper.specialHonors || 'Distinction'}
                          </span>
                          <button
                            onClick={() => onNavigate && onNavigate('results')}
                            className="text-primary font-bold hover:text-secondary inline-flex items-center gap-0.5 transition-colors group-hover:underline"
                          >
                            Honor Roll <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Topper Pagination indicators & slide counter */}
                  {toppersList.length > 1 && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1.5 bg-primary/70 backdrop-blur-md px-3 py-1 rounded-full border border-primary-container/40">
                        {toppersList.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setTopperIndex(i)}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                              topperIndex === i
                                ? 'bg-tertiary-fixed scale-125'
                                : 'bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80'
                            }`}
                            aria-label={`Topper ${i + 1}`}
                          />
                        ))}
                      </div>
                      <span className="topper-counter text-[10px] sm:text-[11px] font-mono font-bold text-tertiary-fixed bg-primary/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary-container/40">
                        0{topperIndex + 1} / 0{toppersList.length}
                      </span>
                    </div>
                  )}
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