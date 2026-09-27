import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGalleryByPosition } from '../../api/client';

export default function PageBanner({
  title,
  subtitle,
  badge = 'Iqura Public School',
  icon = 'school',
  placementKey = 'campus_facilities',
  fallbackImage = '',
  breadcrumbs = []
}) {
  const [bannerImage, setBannerImage] = useState(fallbackImage);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      try {
        if (placementKey) {
          const res = await getGalleryByPosition(placementKey);
          if (isMounted && res?.data && res.data.length > 0) {
            setBannerImage(res.data[0].imageUrl);
            return;
          }
        }
        // Fallback to hero_banner or any uploaded gallery image from backend
        const heroRes = await getGalleryByPosition('hero_banner');
        if (isMounted && heroRes?.data && heroRes.data.length > 0) {
          setBannerImage(heroRes.data[0].imageUrl);
        }
      } catch (err) {
        console.warn(`Could not load banner image for ${placementKey}:`, err);
      }
    };
    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [placementKey]);

  return (
    <div className="relative w-full overflow-hidden bg-primary text-white py-14 sm:py-20 lg:py-24 border-b border-primary-container/60 shadow-lg">
      {/* Background Image with Rich Dual Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
        style={{
          backgroundImage: bannerImage ? `url("${bannerImage}")` : undefined,
          filter: 'brightness(0.9) contrast(1.05)'
        }}
      >
        {/* Gradients to guarantee crystal readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-black/30" />
      </div>

      {/* Decorative Gold Accent Stripe */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-tertiary-fixed to-transparent opacity-80" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-3"
        >
          {/* Badge & Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-secondary text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
              <span className="material-symbols-outlined text-[14px]">{icon}</span>
              <span>{badge}</span>
            </span>

            {breadcrumbs.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-primary-fixed-dim">
                <span>/</span>
                {breadcrumbs.map((crumb, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <span className={idx === breadcrumbs.length - 1 ? 'text-tertiary-fixed font-semibold' : ''}>
                      {crumb}
                    </span>
                    {idx < breadcrumbs.length - 1 && <span>/</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Page Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm sm:text-base text-primary-fixed leading-relaxed max-w-2xl font-normal drop-shadow">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
