
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import BannerSlider from './BannerSlider';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for banners - in a real app, this would come from an API
  const banners = [
    {
      id: '1',
      imageUrl: '/lovable-uploads/366c8ad9-d7e4-4dc0-9fc4-bf90bbd306da.png',
      title: 'Find Your Dream Home'
    },
    {
      id: '2',
      imageUrl: '/lovable-uploads/38d4ea24-24cb-46a9-8b02-0534e3701a65.png',
      title: 'Discover Perfect Properties'
    },
    {
      id: '3',
      imageUrl: '/lovable-uploads/366c8ad9-d7e4-4dc0-9fc4-bf90bbd306da.png',
      title: 'New Projects in Hinjewadi'
    },
    {
      id: '4',
      imageUrl: '/lovable-uploads/38d4ea24-24cb-46a9-8b02-0534e3701a65.png',
      title: 'Premium Flats for Sale'
    }
  ];

  return (
    <section className="relative">
      {/* Banner with rotating ads */}
      <div className="w-full">
        <BannerSlider banners={banners} />
      </div>
      
      {/* Search Bar overlay on the banner */}
      <div className="absolute top-2/3 left-0 w-full z-30 transform -translate-y-1/2">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
