
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        {/* Search Bar above the hero content */}
        <div className="mb-12">
          <SearchBar />
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Find Your Perfect Property Without The Search
            </h1>
            <p className="text-xl mb-8 text-gray-700">
              Submit your property requirements and let the suppliers come to you. No more endless scrolling through listings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-brand-blue hover:bg-brand-darkBlue"
                onClick={() => navigate('/user/auth')}
              >
                I'm looking for property
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/supplier/auth')}
              >
                I'm a property supplier
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 hidden md:flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
              alt="Modern apartment building" 
              className="rounded-xl shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
