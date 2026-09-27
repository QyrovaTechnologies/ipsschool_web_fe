import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGallery } from '../api/client';
import PageBanner from '../components/common/PageBanner';

export default function GalleryPage({ onOpenAdmin }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Screen Viewport Detection with mobile userAgent detection
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        window.innerWidth < 768 ||
        window.matchMedia('(max-width: 767px)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    }
    return false;
  });

  // Slider State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [activeModalImage, setActiveModalImage] = useState(null);

  // Touch Swipe Refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile =
        window.innerWidth < 768 ||
        window.matchMedia('(max-width: 767px)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileScreen(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Fetch all gallery data once
  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      const data = await getGallery();
      const items = data.data || [];
      setAllGalleryItems(items);

      // Extract unique categories from items
      const uniqueCats = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
      if (uniqueCats.length > 0) {
        setCategories(['All', ...uniqueCats]);
      } else {
        setCategories(['All', 'Campus & Facilities', 'Classrooms & Labs', 'Sports & Events']);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to resolve clean subcategory metadata
  const getSubcategoryInfo = useCallback((item) => {
    const pos = (item.position || item.placement || '').toLowerCase();
    const view = (item.view || '').toLowerCase();
    const title = (item.title || '').toLowerCase();

    const isMobile =
      pos.includes('mobile') ||
      pos === 'hero_banner_mobile' ||
      view === 'mobile' ||
      title.includes('mobile');

    if (isMobile) {
      return {
        key: 'hero_banner_mobile',
        label: 'Hero Image (Mobile View)',
        icon: 'smartphone',
        badgeColor: 'bg-rose-700 text-white'
      };
    }
    if (pos === 'hero_banner') {
      return {
        key: 'hero_banner',
        label: 'Hero Image (Desktop View)',
        icon: 'desktop_windows',
        badgeColor: 'bg-[#a9343f] text-white'
      };
    }
    if (pos === 'campus_facilities') {
      return {
        key: 'campus_facilities',
        label: 'Campus & Facilities',
        icon: 'domain',
        badgeColor: 'bg-[#00152b] text-[#ffdea0]'
      };
    }
    if (pos === 'computer_lab') {
      return {
        key: 'computer_lab',
        label: 'Computer & AI Lab',
        icon: 'memory',
        badgeColor: 'bg-indigo-700 text-white'
      };
    }
    if (pos === 'science_lab') {
      return {
        key: 'science_lab',
        label: 'Science & STEM Labs',
        icon: 'biotech',
        badgeColor: 'bg-emerald-700 text-white'
      };
    }
    if (pos === 'sports_complex') {
      return {
        key: 'sports_complex',
        label: 'Sports & Athletics',
        icon: 'sports_cricket',
        badgeColor: 'bg-amber-600 text-white'
      };
    }
    return {
      key: item.position || 'general',
      label: (item.position || 'General').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      icon: 'photo_library',
      badgeColor: 'bg-slate-800 text-white'
    };
  }, []);

  // Compute distinct subcategories available within the active category
  const availableSubcategories = useMemo(() => {
    let items = allGalleryItems;
    if (selectedCategory !== 'All') {
      items = items.filter(
        (item) => (item.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    const subcatMap = {};
    items.forEach((item) => {
      const info = getSubcategoryInfo(item);
      if (!subcatMap[info.key]) {
        subcatMap[info.key] = {
          key: info.key,
          label: info.label,
          icon: info.icon,
          count: 0
        };
      }
      subcatMap[info.key].count += 1;
    });

    const subcats = Object.values(subcatMap);
    // Sort subcategories based on screen: on mobile screens, mobile banner first!
    subcats.sort((a, b) => {
      if (isMobileScreen) {
        if (a.key === 'hero_banner_mobile') return -1;
        if (b.key === 'hero_banner_mobile') return 1;
      } else {
        if (a.key === 'hero_banner') return -1;
        if (b.key === 'hero_banner') return 1;
      }
      return 0;
    });

    return [
      { key: 'all', label: 'All Photos', icon: 'view_module', count: items.length },
      ...subcats
    ];
  }, [allGalleryItems, selectedCategory, getSubcategoryInfo, isMobileScreen]);

  // Selected subcategory state
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  // When on mobile screen, auto-select mobile subcategory if available
  useEffect(() => {
    if (isMobileScreen) {
      const hasMobile = availableSubcategories.some((s) => s.key === 'hero_banner_mobile');
      if (hasMobile) {
        setSelectedSubcategory('hero_banner_mobile');
      }
    }
  }, [isMobileScreen, availableSubcategories]);

  // When category changes, reset or pick appropriate subcategory
  useEffect(() => {
    if (isMobileScreen) {
      const hasMobile = availableSubcategories.some((s) => s.key === 'hero_banner_mobile');
      setSelectedSubcategory(hasMobile ? 'hero_banner_mobile' : 'all');
    } else {
      setSelectedSubcategory('all');
    }
  }, [selectedCategory, isMobileScreen, availableSubcategories]);

  // Filter items for the dynamic showcase slider based on:
  // 1. Category (selectedCategory)
  // 2. Subcategory (selectedSubcategory: 'all' | 'hero_banner_mobile' | 'hero_banner' | ...)
  const categorySliderItems = useMemo(() => {
    let items = allGalleryItems;

    // 1. Filter by category
    if (selectedCategory !== 'All') {
      items = items.filter(
        (item) => (item.category || '').toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filter by subcategory if specific one chosen
    if (selectedSubcategory !== 'all') {
      items = items.filter((item) => {
        const info = getSubcategoryInfo(item);
        return info.key === selectedSubcategory;
      });
    } else {
      // If 'all' chosen, sort based on viewport:
      // Mobile screen -> mobile banners first
      // Desktop screen -> desktop banners first
      items = [...items].sort((a, b) => {
        const aIsMobile = getSubcategoryInfo(a).key === 'hero_banner_mobile';
        const bIsMobile = getSubcategoryInfo(b).key === 'hero_banner_mobile';
        if (isMobileScreen) {
          if (aIsMobile && !bIsMobile) return -1;
          if (!aIsMobile && bIsMobile) return 1;
        } else {
          if (!aIsMobile && bIsMobile) return -1;
          if (aIsMobile && !bIsMobile) return 1;
        }
        return 0;
      });
    }

    return items;
  }, [allGalleryItems, selectedCategory, selectedSubcategory, getSubcategoryInfo, isMobileScreen]);

  // Safe slide navigation functions
  const totalSlides = categorySliderItems.length;

  const handleNextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setSlideDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setSlideDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleSelectSlide = (index) => {
    if (index === currentSlideIndex) return;
    setSlideDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
  };

  // Reset slide index whenever category or subcategory changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedCategory, selectedSubcategory]);

  // Autoplay timer: 5 seconds interval
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides, handleNextSlide]);

  // Keyboard navigation when user interacts with slider
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalImage) return; // Modal handles its own keys
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, activeModalImage]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNextSlide(); // Swiped left -> next
    } else if (distance < -50) {
      handlePrevSlide(); // Swiped right -> prev
    }
  };

  const getPositionBadge = (pos, view) => {
    if (pos === 'hero_banner_mobile' || view === 'mobile') {
      return { label: 'Hero Image (Mobile View)', color: 'bg-rose-700 text-white' };
    }
    switch (pos) {
      case 'hero_banner':
        return { label: 'Hero Image (Desktop View)', color: 'bg-[#a9343f] text-white' };
      case 'computer_lab':
        return { label: 'Computer & AI Lab', color: 'bg-indigo-700 text-white' };
      case 'science_lab':
        return { label: 'Science Lab', color: 'bg-emerald-700 text-white' };
      case 'sports_complex':
        return { label: 'Sports Complex', color: 'bg-amber-600 text-white' };
      case 'campus_facilities':
        return { label: 'Campus & Facilities', color: 'bg-[#00152b] text-[#ffdea0]' };
      case 'library':
        return { label: 'Library', color: 'bg-teal-700 text-white' };
      case 'cultural_events':
        return { label: 'Events & Cultural', color: 'bg-purple-700 text-white' };
      default:
        return { label: 'General Gallery', color: 'bg-slate-800 text-white' };
    }
  };

  const currentSlide = categorySliderItems[currentSlideIndex] || null;

  // Animation variants for smooth sliding
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] pb-24 text-[#111c2d]">
      {/* Top Banner */}
      <PageBanner
        title="Campus Infrastructure & Visual Gallery"
        subtitle="Explore high-definition photographs mapped directly to key zones of our school: Campus grounds, AI & Science labs, Sports tracks, and Cultural auditoriums."
        badge="Visual Archive"
        icon="photo_library"
        placementKey="cultural_events"
        breadcrumbs={['Home', 'Campus Gallery']}
      />

      {/* Expanded Width Container for Wide Professional Theater View */}
      <div className="max-w-[1536px] w-full mx-auto px-3 sm:px-6 lg:px-8 mt-6">

        {/* Category & Subcategory Navigation Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-[24px] shadow-sm border border-slate-200/90 mb-8 space-y-4">
          {/* Row 1: Primary Category Pills */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a9343f] flex items-center gap-1.5 mb-1">
                <span className="material-symbols-outlined text-[16px]">category</span>
                Main Category
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#00152b]">
                Visual Showcase
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? allGalleryItems.length
                    : allGalleryItems.filter(
                        (i) => (i.category || '').toLowerCase() === cat.toLowerCase()
                      ).length;
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-[9999px] text-xs font-bold transition-all duration-300 flex items-center gap-2 shadow-sm cursor-pointer ${
                      isSelected
                        ? 'bg-[#00152b] text-white shadow-md scale-105 ring-2 ring-[#a9343f]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-[9999px] font-mono font-semibold ${
                        isSelected ? 'bg-[#a9343f] text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Dynamic Subcategory Filters (Hero Image Mobile View, Desktop View, etc.) */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600 font-semibold">
              <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
              <span className="text-slate-500 uppercase text-[11px] tracking-wider">Subcategory:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {availableSubcategories.map((subcat) => {
                const isSelected = selectedSubcategory === subcat.key;
                const isMobileOption = subcat.key === 'hero_banner_mobile';

                return (
                  <button
                    key={subcat.key}
                    onClick={() => setSelectedSubcategory(subcat.key)}
                    className={`px-3.5 py-1.5 rounded-[9999px] font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? isMobileOption
                          ? 'bg-rose-700 text-white shadow-md ring-2 ring-rose-400/50'
                          : 'bg-[#a9343f] text-white shadow-md ring-2 ring-white/20'
                        : isMobileOption
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">{subcat.icon}</span>
                    <span>{subcat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : isMobileOption
                          ? 'bg-rose-200 text-rose-900'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {subcat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FULL SCREEN / FULL-WIDTH CARD DYNAMIC SLIDER SHOWCASE BOX     */}
        {/* ============================================================== */}
        <div className="mb-14">
          {loading ? (
            <div className="w-full h-[480px] bg-slate-900 rounded-[32px] flex flex-col items-center justify-center text-white shadow-2xl">
              <div className="w-12 h-12 border-4 border-[#a9343f] border-t-transparent rounded-[9999px] animate-spin"></div>
              <p className="mt-4 text-sm font-semibold tracking-wide text-slate-300">
                Loading campus visual gallery...
              </p>
            </div>
          ) : categorySliderItems.length === 0 ? (
            <div className="w-full bg-white rounded-[28px] border border-dashed border-slate-300 p-12 text-center shadow-sm">
              <span className="material-symbols-outlined text-[54px] text-slate-400 mb-2">collections</span>
              <h3 className="font-serif font-bold text-lg text-slate-800">
                No photographs found for this selection
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                No photos found in "{selectedCategory}" under this subcategory.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className="bg-[#00152b] text-white px-4 py-2 rounded-[9999px] text-xs font-bold hover:bg-[#a9343f] transition-all shadow cursor-pointer"
                >
                  View All Subcategories
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubcategory('all');
                  }}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-[9999px] text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div
              ref={sliderContainerRef}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] bg-[#030712] border border-slate-800 group select-none"
            >
              {/* Dynamic Slider Viewport: Expansive Cinematic Height */}
              <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] overflow-hidden">
                <AnimatePresence initial={false} custom={slideDirection}>
                  {currentSlide && (
                    <motion.div
                      key={currentSlide._id || currentSlideIndex}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* Ambient Blurred Background (Ensures zero black empty space on odd aspect ratios) */}
                      <img
                        src={currentSlide.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110"
                      />

                      {/* Main Crisp High-Definition Image */}
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title || 'Campus Image'}
                        className="relative z-10 w-full h-full object-contain md:object-cover mx-auto"
                      />

                      {/* Top Gradient Shadow for Top Badges */}
                      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />

                      {/* Bottom Deep Gradient Scrim for Text Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 pt-36 pb-8 px-6 sm:px-12 bg-gradient-to-t from-black via-black/80 to-transparent z-10 flex flex-col justify-end">
                        <div className="max-w-5xl space-y-2.5">
                          {/* Tags row */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Category Tag */}
                            <span className="bg-[#a9343f] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-[9999px] shadow-sm flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[14px]">folder_special</span>
                              {currentSlide.category || 'Campus'}
                            </span>

                            {/* Position / Subcategory Tag */}
                            {currentSlide.position && (
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[9999px] shadow-sm ${
                                  getPositionBadge(currentSlide.position, currentSlide.view).color
                                }`}
                              >
                                {getPositionBadge(currentSlide.position, currentSlide.view).label}
                              </span>
                            )}

                            {/* Subcategory View Tag */}
                            <span className="bg-white/15 backdrop-blur-md text-slate-100 text-[10px] font-bold px-3 py-1 rounded-[9999px] border border-white/20 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">
                                {currentSlide.view === 'mobile' ? 'smartphone' : 'desktop_windows'}
                              </span>
                              <span>{currentSlide.view === 'mobile' ? 'Mobile View' : 'Standard View'}</span>
                            </span>

                            {/* Academic Year */}
                            {currentSlide.academicYear && (
                              <span className="bg-black/50 text-[#ffdea0] text-[10px] font-bold px-3 py-1 rounded-[9999px] border border-white/10">
                                Session {currentSlide.academicYear}
                              </span>
                            )}
                          </div>

                          {/* Slide Title */}
                          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-lg leading-tight">
                            {currentSlide.title || 'Iqura Public School Campus View'}
                          </h1>

                          {/* Slide Description */}
                          {currentSlide.description && (
                            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-4xl leading-relaxed line-clamp-2 md:line-clamp-3 drop-shadow">
                              {currentSlide.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Overlay Controls: Category Title, Counter & Action Buttons */}
                <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-auto">
                  {/* Left: Live Dynamic Slider Indicator */}
                  <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-[9999px] border border-white/20 text-white text-xs font-semibold shadow-xl">
                    <span className="w-2.5 h-2.5 rounded-[9999px] bg-emerald-400 animate-pulse"></span>
                    <span>Category:</span>
                    <span className="font-bold text-[#ffdea0]">{selectedCategory}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-slate-300 font-normal">
                      {selectedSubcategory === 'all'
                        ? 'All Photos'
                        : availableSubcategories.find((s) => s.key === selectedSubcategory)?.label || 'Showcase'}
                    </span>
                  </div>

                  {/* Right: Slide Counter + Fullscreen + Autoplay Toggle */}
                  <div className="flex items-center gap-2.5">
                    <span className="bg-black/60 backdrop-blur-md text-white font-mono text-xs font-bold px-4 py-2 rounded-[9999px] border border-white/20 shadow-xl">
                      {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>

                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      title={isAutoPlay ? 'Pause Auto-slide' : 'Resume Auto-slide'}
                      className="w-10 h-10 rounded-[9999px] bg-black/60 hover:bg-white hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        {isAutoPlay ? 'pause' : 'play_arrow'}
                      </span>
                    </button>

                    {currentSlide && (
                      <button
                        onClick={() => setActiveModalImage(currentSlide)}
                        title="View Fullscreen"
                        className="w-10 h-10 rounded-[9999px] bg-black/60 hover:bg-[#a9343f] text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[19px]">fullscreen</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* ============================================================== */}
                {/* PROMINENT SLIDE BUTTONS: < (PREVIOUS) AND > (NEXT)            */}
                {/* ============================================================== */}
                {totalSlides > 1 && (
                  <>
                    {/* Left Slide Button (<) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevSlide();
                      }}
                      aria-label="Previous Slide"
                      className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-[9999px] bg-black/60 hover:bg-[#a9343f] text-white backdrop-blur-md border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-2xl sm:text-3xl group-hover:-translate-x-0.5 transition-transform duration-200">
                        arrow_back_ios_new
                      </span>
                    </button>

                    {/* Right Slide Button (>) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextSlide();
                      }}
                      aria-label="Next Slide"
                      className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 rounded-[9999px] bg-black/60 hover:bg-[#a9343f] text-white backdrop-blur-md border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-2xl sm:text-3xl group-hover:translate-x-0.5 transition-transform duration-200">
                        arrow_forward_ios
                      </span>
                    </button>
                  </>
                )}

                {/* Auto-Slide Progress Bar */}
                {isAutoPlay && totalSlides > 1 && (
                  <motion.div
                    key={`progress-${currentSlideIndex}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-[#a9343f] via-[#ff757c] to-[#ffdea0] z-20"
                  />
                )}
              </div>

              {/* Dynamic Thumbnail Filmstrip Selector at the bottom of the card */}
              {totalSlides > 1 && (
                <div className="bg-[#050c18] border-t border-slate-800/80 p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#a9343f]">view_carousel</span>
                      Category Slide Strip ({totalSlides} Photos)
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Click any photo to slide or use <kbd className="bg-slate-800 px-2 py-0.5 rounded text-white font-mono">&lt;</kbd> and <kbd className="bg-slate-800 px-2 py-0.5 rounded text-white font-mono">&gt;</kbd>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {categorySliderItems.map((item, idx) => {
                      const isActive = idx === currentSlideIndex;
                      return (
                        <button
                          key={item._id || idx}
                          onClick={() => handleSelectSlide(idx)}
                          className={`relative flex-shrink-0 w-24 sm:w-32 h-16 sm:h-20 rounded-[14px] overflow-hidden transition-all duration-300 cursor-pointer ${
                            isActive
                              ? 'ring-2 ring-[#a9343f] scale-105 shadow-xl opacity-100'
                              : 'opacity-50 hover:opacity-90 hover:scale-100'
                          }`}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title || `Slide ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/75 text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                            {idx + 1}
                          </span>
                          {item.view === 'mobile' && (
                            <span className="absolute top-1 left-1 bg-rose-700/80 text-white text-[8px] font-bold px-1 rounded uppercase">
                              Mob
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Lightbox for High-Res Inspection */}
        {activeModalImage && (
          <div
            onClick={() => setActiveModalImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] max-w-4xl w-full overflow-hidden shadow-2xl relative border border-slate-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalImage(null)}
                aria-label="Close Preview"
                className="absolute top-4 right-4 w-9 h-9 rounded-[9999px] bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="relative bg-black flex items-center justify-center max-h-[75vh] overflow-hidden">
                <img
                  src={activeModalImage.imageUrl}
                  alt={activeModalImage.title}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] px-3 py-1 rounded-[9999px] font-bold uppercase tracking-wider ${getPositionBadge(activeModalImage.position).color}`}>
                    {getPositionBadge(activeModalImage.position).label}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-[9999px] uppercase tracking-wider">
                    {activeModalImage.category}
                  </span>
                  {activeModalImage.academicYear && (
                    <span className="text-[11px] font-semibold text-slate-500">
                      Session {activeModalImage.academicYear}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#00152b]">
                  {activeModalImage.title}
                </h3>

                {activeModalImage.description && (
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeModalImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}