import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsRibbon } from './components/StatsRibbon';
import { ProblemMatrix } from './components/ProblemMatrix';
import { WorkflowSection } from './components/WorkflowSection';
import { FeaturesSection } from './components/FeaturesSection';
import { AiTrustSection } from './components/AiTrustSection';
import { FooterCta } from './components/FooterCta';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-['Inter',sans-serif] selection:bg-[#00B894]/20 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <StatsRibbon />
        <ProblemMatrix />
        <WorkflowSection />
        <FeaturesSection />
        <AiTrustSection />
      </main>
      <FooterCta />
    </div>
  );
};

export default App;
