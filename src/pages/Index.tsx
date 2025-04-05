
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, UserCircle, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-16 gap-4">
          <h1 className="font-bold text-3xl text-brand-darkBlue">ReQuest</h1>
          <nav className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/user/auth">Login</Link>
            </Button>
          </nav>
        </header>

        <main className="py-6 md:py-10">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 px-2">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-darkBlue mb-4 md:mb-6 leading-tight">
              Revolutionizing Real Estate Discovery in India
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
              Stop endless scrolling through listings. Submit your exact property requirements and connect directly with suppliers who have what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white py-4 md:py-6 px-4 md:px-8 text-base md:text-lg gap-2" asChild>
                <Link to="/user/auth">
                  <UserCircle className="h-5 w-5" />
                  I'm Looking for Property
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button className="bg-brand-green hover:bg-brand-green/90 text-white py-4 md:py-6 px-4 md:px-8 text-base md:text-lg gap-2" asChild>
                <Link to="/supplier/auth">
                  <Building className="h-5 w-5" />
                  I'm a Property Supplier
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-brand-lightBlue rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircle className="h-8 w-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-darkBlue">Property Seekers</h3>
              <p className="text-gray-600">Specify exactly what you're looking for and get connected to suppliers with matching properties.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-brand-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-darkBlue">Property Suppliers</h3>
              <p className="text-gray-600">Receive high-quality leads from users who are looking for exactly what you offer.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-brand-orange">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-darkBlue">Efficient Matches</h3>
              <p className="text-gray-600">Our intelligent system connects the right properties with the right people, saving time for everyone.</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-brand-darkBlue mb-4 md:mb-6">Ready to transform your real estate experience?</h3>
            <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white" asChild>
              <Link to="/user/auth">Get Started Today <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </main>

        <footer className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; 2025 ReQuest. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
