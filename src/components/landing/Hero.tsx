
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import BannerSlider from './BannerSlider';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for banner - in a real app, this would come from an API
  const banners = [
    {
      id: '1',
      imageUrl: '/lovable-uploads/38d4ea24-24cb-46a9-8b02-0534e3701a65.png',
      title: 'Find Your Dream Home'
    }
  ];

  return (
    <section className="relative">
      {/* Banner with rotating ads */}
      <div className="w-full">
        <BannerSlider banners={banners} />
      </div>
      
      {/* Search Bar overlay on the banner */}
      <div className="absolute top-1/2 left-0 w-full z-30 transform -translate-y-1/2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Content below the banner */}
      <div className="container mx-auto px-4 py-12">
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
