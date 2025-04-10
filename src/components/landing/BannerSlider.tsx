
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
      <Carousel className="w-full" opts={{ loop: true, duration: 40 }}>
        <CarouselContent>
          {displayBanners.map((banner) => (
            <CarouselItem key={banner.id} className="relative">
              <div className="aspect-[16/6] relative overflow-hidden">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <div className="absolute bottom-10 left-10 z-20 text-white">
                  <h2 className="text-3xl font-bold drop-shadow-lg">{banner.title}</h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          <CarouselPrevious className="bg-white/80 border-none" />
          <CarouselNext className="bg-white/80 border-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSlider;
