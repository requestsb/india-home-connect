
import React from 'react';
import { Header, Hero, HowItWorks, SupplierSection, Footer } from '@/components/landing';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-8">
          GET STARTED WITH EXPLORING REAL ESTATE OPTIONS
        </h2>
        <HowItWorks />
      </div>
      <SupplierSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
