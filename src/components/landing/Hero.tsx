
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import BannerSlider from './BannerSlider';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Enhanced banner data with more images
  const banners = [
    {
      id: '1',
      imageUrl: '/lovable-uploads/366c8ad9-d7e4-4dc0-9fc4-bf90bbd306da.png',
      title: 'Find Your Dream Home Today'
    },
    {
      id: '2',
      imageUrl: '/lovable-uploads/38d4ea24-24cb-46a9-8b02-0534e3701a65.png',
      title: 'Discover Perfect Properties For Your Family'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070',
      title: 'New Premium Projects in Hinjewadi Starting at ₹65 Lacs'
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2996',
      title: 'Luxury Flats in Prime Locations With Best Amenities'
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2970',
      title: 'Buy Your Dream Home in Viman Nagar'
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
