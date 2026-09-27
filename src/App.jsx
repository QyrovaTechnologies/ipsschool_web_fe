import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import StaffPage from './pages/StaffPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import CampusPage from './pages/CampusPage';

export default function App() {
  // Helper to map pathname to page identifier
  const getPageFromLocation = () => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (!path || path === 'home' || path === 'index.html') return 'home';
    if (path === 'results' || path === 'toppers') return 'results';
    if (path === 'staff' || path === 'faculty') return 'staff';
    if (path === 'gallery' || path === 'photos') return 'gallery';
    if (path === 'academics' || path === 'curriculum') return 'academics';
    if (path === 'about-us' || path === 'about') return 'about-us';
    if (path === 'campus' || path === 'facilities') return 'campus';
    return path;
  };

  const [currentPage, setCurrentPage] = useState(getPageFromLocation);

  // Synchronize browser history and page state
  const handleNavigate = (pageId, customPath) => {
    let targetPath = customPath;
    if (!targetPath) {
      if (pageId === 'home') targetPath = '/';
      else targetPath = `/${pageId}`;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({ pageId }, '', targetPath);
    }

    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser Back and Forward navigation buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased flex flex-col justify-between selection:bg-secondary selection:text-on-secondary">
      {/* Header and Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 shadow-[0_4px_20px_rgba(0,21,43,0.08)]">
        <Header />
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      </header>

      {/* Main Routed Content */}
      <main className="w-full pt-28 sm:pt-32 bg-surface min-h-[calc(100vh-320px)]">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenEnquiry={() => {
              const cta = document.getElementById('admission-cta');
              if (cta) cta.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
        {currentPage === 'results' && <ResultsPage onNavigate={handleNavigate} />}
        {currentPage === 'staff' && <StaffPage onNavigate={handleNavigate} />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'academics' && <AcademicsPage onNavigate={handleNavigate} />}
        {currentPage === 'about-us' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'campus' && <CampusPage onNavigate={handleNavigate} />}

        {/* Fallbacks for any other routes */}
        {!['home', 'results', 'staff', 'gallery', 'academics', 'about-us', 'campus'].includes(currentPage) && (
          <div className="max-w-5xl mx-auto px-gutter py-20 text-center space-y-4">
            <span className="inline-block px-3 py-1 bg-primary-container text-tertiary-fixed rounded text-label-sm uppercase font-bold tracking-wider">
              {currentPage.replace('-', ' ')}
            </span>
            <h1 className="font-serif text-3xl font-bold text-primary capitalize">
              {currentPage.replace('-', ' ')}
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto">
              Looking for information about Iqura Public School? Explore our official sections below:
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={() => handleNavigate('home')}
                className="px-5 py-2.5 bg-primary text-white rounded font-bold text-xs uppercase tracking-wider hover:bg-secondary transition-all"
              >
                Homepage
              </button>
              <button
                onClick={() => handleNavigate('results')}
                className="px-5 py-2.5 bg-surface-container-high text-primary rounded font-bold text-xs uppercase tracking-wider hover:bg-surface-container-highest transition-all"
              >
                Board Results
              </button>
              <button
                onClick={() => handleNavigate('gallery')}
                className="px-5 py-2.5 bg-surface-container-high text-primary rounded font-bold text-xs uppercase tracking-wider hover:bg-surface-container-highest transition-all"
              >
                Campus Gallery
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer setActivePage={handleNavigate} onNavigate={handleNavigate} />
    </div>
  );
}