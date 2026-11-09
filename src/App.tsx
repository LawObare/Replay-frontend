import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsRibbon } from './components/StatsRibbon';
import { ProblemMatrix } from './components/ProblemMatrix';
import { WorkflowSection } from './components/WorkflowSection';
import { FeaturesSection } from './components/FeaturesSection';
import { AiTrustSection } from './components/AiTrustSection';
import { FooterCta } from './components/FooterCta';
import { DownloadPage } from './components/DownloadPage';

export const App: React.FC = () => {
  const getInitialView = (): 'home' | 'download' => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#download' || hash === '#/download' || path === '/download') {
        return 'download';
      }
    }
    return 'home';
  };

  const [currentView, setCurrentView] = useState<'home' | 'download'>(getInitialView);

  const navigateTo = useCallback((view: 'home' | 'download', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'download') {
      if (window.location.hash !== '#download') {
        window.history.pushState(null, '', '#download');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (sectionId) {
        window.history.pushState(null, '', `#${sectionId}`);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.history.pushState(null, '', window.location.pathname);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#download' || hash === '#/download' || path === '/download') {
        setCurrentView('download');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-['Inter',sans-serif] selection:bg-[#00B894]/20 selection:text-black">
      <Navbar currentView={currentView} onNavigate={navigateTo} />
      {currentView === 'download' ? (
        <>
          <DownloadPage onNavigate={navigateTo} />
          <FooterCta />
        </>
      ) : (
        <>
          <main>
            <Hero />
            <StatsRibbon />
            <ProblemMatrix />
            <WorkflowSection />
            <FeaturesSection />
            <AiTrustSection />
          </main>
          <FooterCta />
        </>
      )}
    </div>
  );
};

export default App;
