
import React, { useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface BannerProps {
  banners: Array<{
    id: string;
    imageUrl: string;
    title: string;
  }>;
}

const BannerSlider: React.FC<BannerProps> = ({ banners }) => {
  // Default banner if none provided
  const defaultBanners = [
    {
      id: '1',
      imageUrl: '/lovable-uploads/366c8ad9-d7e4-4dc0-9fc4-bf90bbd306da.png',
      title: 'Find Your Dream Home'
    }
  ];

  const displayBanners = banners?.length ? banners : defaultBanners;

  return (
    <div className="relative w-full h-full">
      <Carousel className="w-full" opts={{ loop: true, duration: 50 }}>
        <CarouselContent>
          {displayBanners.map((banner) => (
            <CarouselItem key={banner.id} className="relative">
              <div className="aspect-[16/6] relative overflow-hidden">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
                <div className="absolute bottom-12 left-12 z-20 text-white animate-fade-in">
                  <h2 className="text-4xl font-bold drop-shadow-lg max-w-2xl">{banner.title}</h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          <CarouselPrevious className="bg-white/90 hover:bg-white border-none shadow-md" />
          <CarouselNext className="bg-white/90 hover:bg-white border-none shadow-md" />
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
