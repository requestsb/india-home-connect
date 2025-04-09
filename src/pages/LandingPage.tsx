
import React from 'react';
import { Header, Hero, HowItWorks, SupplierSection, Footer } from '@/components/landing';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <HowItWorks />
      <SupplierSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
