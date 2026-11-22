import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGallery } from '../api/client';
import PageBanner from '../components/common/PageBanner';

// High-definition fallback gallery photos ensuring pristine initial view
const FALLBACK_GALLERY_ITEMS = [
  {
    _id: 'ips-gal-1',
    title: 'Main Academic Campus & Central Courtyard',
    category: 'Campus & Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    description: 'The expansive academic blocks of Iqura Public School surrounded by landscaped greens and open assembly grounds.',
    academicYear: '2024-25'
  },
  {
    _id: 'ips-gal-2',
    title: 'Advanced Computer & AI Technology Laboratory',
    category: 'Classroom & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200',
    description: 'Modern networked computer stations equipped with high-speed internet and computational coding tools.',
    academicYear: '2024-25'
  },
  {
    _id: 'ips-gal-3',
    title: 'Annual Sports Meet & Athletic Ground',
    category: 'Sports & Athletics',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1200',
    description: 'Track and field events, inter-house competitions, and physical fitness activities guided by athletic mentors.',
    academicYear: '2024-25'
  },
  {
    _id: 'ips-gal-4',
    title: 'Composite Physics, Chemistry & Biology Laboratories',
    category: 'Classroom & Labs',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
    description: 'Hands-on scientific experimentation and research aligned with UP Board standards.',
    academicYear: '2024-25'
  },
  {
    _id: 'ips-gal-5',
    title: 'Annual Cultural Festival & Theatrical Presentations',
    category: 'Cultural & Annual Functions',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    description: 'Students performing traditional Indian arts, music, dance, and elocution during Annual Day celebrations.',
    academicYear: '2024-25'
  },
  {
    _id: 'ips-gal-6',
    title: 'Central Library & Scholastic Reading Lounge',
    category: 'Campus & Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200',
    description: 'Curated repository of academic textbooks, reference encyclopedias, literature, and periodicals.',
    academicYear: '2024-25'
  }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  // Slider State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [activeModalImage, setActiveModalImage] = useState(null);

  // Touch Swipe Refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderContainerRef = useRef(null);

  // Fetch all gallery data
  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      const data = await getGallery();
      const rawItems = data?.data && data.data.length > 0 ? data.data : FALLBACK_GALLERY_ITEMS;

      // Filter out internal non-gallery slots if any, keeping real school photos
      const items = rawItems.filter((item) => {
        const cat = (item.category || '').toLowerCase();
        return !cat.includes('hero_banner') && !cat.includes('mobile');
      });

      const finalItems = items.length > 0 ? items : FALLBACK_GALLERY_ITEMS;
      setAllGalleryItems(finalItems);

      // Extract unique human-readable categories
      const uniqueCats = Array.from(
        new Set(
          finalItems
            .map((i) => i.category?.trim())
            .filter(Boolean)
        )
      );

      if (uniqueCats.length > 0) {
        setCategories(['All', ...uniqueCats]);
      } else {
        setCategories(['All', 'Campus & Facilities', 'Classroom & Labs', 'Sports & Athletics', 'Cultural & Annual Functions']);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
      setAllGalleryItems(FALLBACK_GALLERY_ITEMS);
      setCategories(['All', 'Campus & Facilities', 'Classroom & Labs', 'Sports & Athletics', 'Cultural & Annual Functions']);
    } finally {
      setLoading(false);
    }
  };

  // Filter items purely by the selected academic category
  const filteredGalleryItems = useMemo(() => {
    if (selectedCategory === 'All') {
      return allGalleryItems;
    }
    return allGalleryItems.filter(
      (item) => (item.category || '').toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [allGalleryItems, selectedCategory]);

  const totalSlides = filteredGalleryItems.length;

  // Slide navigation
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

  // Reset slide index on category change
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedCategory]);

  // Autoplay timer: 6 seconds interval
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1) return;
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, totalSlides, handleNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalImage) {
        if (e.key === 'Escape') setActiveModalImage(null);
        if (e.key === 'ArrowRight') navigateModal(1);
        if (e.key === 'ArrowLeft') navigateModal(-1);
        return;
      }
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, activeModalImage]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNextSlide();
    } else if (distance < -50) {
      handlePrevSlide();
    }
  };

  // Navigate inside lightbox modal
  const navigateModal = (direction) => {
    if (!activeModalImage || filteredGalleryItems.length <= 1) return;
    const currentIndex = filteredGalleryItems.findIndex(
      (item) => (item._id || item.imageUrl) === (activeModalImage._id || activeModalImage.imageUrl)
    );
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredGalleryItems.length) % filteredGalleryItems.length;
    setActiveModalImage(filteredGalleryItems[nextIndex]);
  };

  const currentSlide = filteredGalleryItems[currentSlideIndex] || null;

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div className="min-h-screen bg-slate-50 text-on-surface antialiased pb-20">
      {/* Top Page Banner */}
      <PageBanner
        title="Campus Infrastructure & Visual Gallery"
        subtitle="Explore high-definition glimpses of our campus: academic blocks, science laboratories, computer centres, and sports infrastructure."
        badge="Visual Archive"
        icon="photo_library"
        placementKey="campus_facilities"
        breadcrumbs={['Home', 'Campus Gallery']}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Category Navigation Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">collections_bookmark</span>
            <div>
              <h2 className="font-serif font-bold text-lg text-primary leading-tight">
                Campus Gallery
              </h2>
              <p className="text-xs text-slate-500">
                Browse official photographs by category
              </p>
            </div>
          </div>

          {/* Clean Category Filter Tabs */}
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* ENHANCED SHOWCASE SLIDER                                       */}
        {/* ============================================================== */}
        <div>
          {loading ? (
            <div className="w-full h-[420px] sm:h-[520px] bg-slate-900 rounded-3xl flex flex-col items-center justify-center text-white shadow-xl">
              <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-xs font-medium text-slate-300">
                Loading campus visual gallery...
              </p>
            </div>
          ) : filteredGalleryItems.length === 0 ? (
            <div className="w-full bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-slate-400 mb-2">collections</span>
              <h3 className="font-serif font-bold text-base text-slate-800">
                No photographs found in this category
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No photos currently uploaded under "{selectedCategory}".
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-secondary transition-all shadow cursor-pointer"
              >
                View All Photos
              </button>
            </div>
          ) : (
            <div
              ref={sliderContainerRef}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800 group select-none"
            >
              {/* Slider Viewport */}
              <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[560px] overflow-hidden">
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
                      {/* Crisp Image Display */}
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.title || 'Iqura Public School'}
                        className="w-full h-full object-cover object-center"
                      />

                      {/* Top Shadow Gradient for Overlays */}
                      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />

                      {/* Bottom Gradient Scrim for Text Overlay */}
                      <div className="absolute bottom-0 inset-x-0 pt-24 pb-6 px-4 sm:px-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none flex flex-col justify-end">
                        <div className="max-w-4xl space-y-2 pointer-events-auto">
                          {/* Tags row */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                              {currentSlide.category || 'Campus'}
                            </span>
                            {currentSlide.academicYear && (
                              <span className="bg-white/15 backdrop-blur-sm text-slate-200 text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-white/10">
                                Session {currentSlide.academicYear}
                              </span>
                            )}
                          </div>

                          {/* Slide Title */}
                          <h1 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                            {currentSlide.title || 'Iqura Public School Campus View'}
                          </h1>

                          {/* Slide Description */}
                          {currentSlide.description && (
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl line-clamp-2 drop-shadow">
                              {currentSlide.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Top Overlay Controls: Clean Category Label + Slide Counter & Actions */}
                <div className="absolute top-4 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between gap-2 pointer-events-auto">
                  {/* Left: Professional Badge (No blinking arcade dots) */}
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-white/15 text-white text-xs font-medium shadow-lg">
                    <span className="material-symbols-outlined text-[16px] text-amber-300" style={{ fontVariationSettings: '"FILL" 1' }}>
                      photo_library
                    </span>
                    <span className="truncate max-w-[200px] sm:max-w-xs font-semibold text-slate-100">
                      {selectedCategory === 'All' ? 'Campus Visual Archive' : selectedCategory}
                    </span>
                  </div>

                  {/* Right: Counter + Play/Pause + Fullscreen */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white font-mono text-xs font-semibold px-3 py-1.5 rounded-full border border-white/15 shadow-lg">
                      {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                    </span>

                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      title={isAutoPlay ? 'Pause Auto-slide' : 'Resume Auto-slide'}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 hover:bg-white hover:text-slate-950 text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all shadow-lg cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isAutoPlay ? 'pause' : 'play_arrow'}
                      </span>
                    </button>

                    {currentSlide && (
                      <button
                        onClick={() => setActiveModalImage(currentSlide)}
                        title="View Fullscreen"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/80 hover:bg-secondary text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all shadow-lg cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Floating Navigation Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevSlide();
                      }}
                      aria-label="Previous Slide"
                      className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg sm:text-xl">chevron_left</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextSlide();
                      }}
                      aria-label="Next Slide"
                      className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg sm:text-xl">chevron_right</span>
                    </button>
                  </>
                )}

                {/* Minimalist Progress Bar */}
                {isAutoPlay && totalSlides > 1 && (
                  <motion.div
                    key={`progress-${currentSlideIndex}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-1 bg-amber-400/90 z-20"
                  />
                )}
              </div>

              {/* Bottom Thumbnail Filmstrip */}
              {totalSlides > 1 && (
                <div className="bg-slate-900/90 border-t border-slate-800 p-3 sm:p-4">
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {filteredGalleryItems.map((item, idx) => {
                      const isActive = idx === currentSlideIndex;
                      return (
                        <button
                          key={item._id || idx}
                          onClick={() => handleSelectSlide(idx)}
                          className={`relative flex-shrink-0 w-20 sm:w-28 h-14 sm:h-18 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'ring-2 ring-amber-400 scale-105 opacity-100 shadow-md'
                              : 'opacity-55 hover:opacity-90'
                          }`}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title || `Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* ALL PHOTOGRAPHS GRID (ENTERPRISE PHOTO ALBUM)                  */}
        {/* ============================================================== */}
        {filteredGalleryItems.length > 0 && (
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-primary">
                  {selectedCategory === 'All' ? 'All Campus Photographs' : `${selectedCategory} Collection`}
                </h3>
                <p className="text-xs text-slate-500">
                  Click any image to view in full resolution
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredGalleryItems.length} Photo{filteredGalleryItems.length === 1 ? '' : 's'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleryItems.map((item, idx) => (
                <div
                  key={item._id || idx}
                  onClick={() => setActiveModalImage(item)}
                  className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-10 h-10 rounded-full bg-white/80 text-slate-900 flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                        {item.category || 'Campus'}
                      </span>
                      {item.academicYear && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          Session {item.academicYear}
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-primary group-hover:text-secondary transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LIGHTBOX MODAL FOR FULL RESOLUTION VIEW                        */}
        {/* ============================================================== */}
        {activeModalImage && (
          <div
            onClick={() => setActiveModalImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalImage(null)}
                aria-label="Close Preview"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>

              {/* Modal Image Box with Prev/Next Controls */}
              <div className="relative bg-slate-950 flex items-center justify-center max-h-[70vh] overflow-hidden">
                <img
                  src={activeModalImage.imageUrl}
                  alt={activeModalImage.title}
                  className="w-full max-h-[70vh] object-contain"
                />

                {filteredGalleryItems.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateModal(-1);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">chevron_left</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateModal(1);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">chevron_right</span>
                    </button>
                  </>
                )}
              </div>

              {/* Caption and Metadata */}
              <div className="p-5 bg-white space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {activeModalImage.category || 'Campus'}
                  </span>
                  {activeModalImage.academicYear && (
                    <span className="text-[11px] font-medium text-slate-500">
                      Session {activeModalImage.academicYear}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-primary">
                  {activeModalImage.title}
                </h3>

                {activeModalImage.description && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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

