import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import NoticeTicker from '../components/home/NoticeTicker';
import AboutSection from '../components/home/AboutSection';
import PillarsSection from '../components/home/PillarsSection';
import PrincipalDesk from '../components/home/PrincipalDesk';
import AcademicWings from '../components/home/AcademicWings';
import StatsSection from '../components/home/StatsSection';
import AdmissionCta from '../components/home/AdmissionCta';

export default function HomePage({ onNavigate, onOpenEnquiry }) {
  return (
    <div className="flex flex-col w-full">
      {/* 1. SIGNATURE HERO CAROUSEL / BANNER with Topper Widget */}
      <HeroBanner onNavigate={onNavigate} onOpenEnquiry={onOpenEnquiry} />

      {/* 2. NOTICE & CIRCULARS TICKER BAR */}
      <NoticeTicker onNavigate={onNavigate} onOpenEnquiry={onOpenEnquiry} />

      {/* 3. WELCOME TO IQURA PUBLIC SCHOOL (Education with Purpose) */}
      <AboutSection onNavigate={onNavigate} />

      {/* 4. WHY PARENTS CHOOSE IQURA (5 Institutional Pillars) */}
      <PillarsSection />

      {/* 5. FROM THE PRINCIPAL'S DESK */}
      <PrincipalDesk onNavigate={onNavigate} />

      {/* 6. ACADEMIC WINGS (NURSERY TO XII) */}
      <AcademicWings onNavigate={onNavigate} />

      {/* 7. STATS OF EXCELLENCE */}
      <StatsSection />

      {/* 8. ADMISSION ENQUIRY CTA SECTION */}
      <AdmissionCta onOpenEnquiry={onOpenEnquiry} />
    </div>
  );
}