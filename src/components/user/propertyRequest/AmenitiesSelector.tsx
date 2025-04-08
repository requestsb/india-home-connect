
import React from 'react';
import { amenitiesOptions } from '@/components/supplier/data/propertyOptions';

interface AmenitiesSelectorProps {
  selectedAmenities: string[];
  onToggle: (amenity: string) => void;
}

const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({ 
  selectedAmenities, 
  onToggle 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Required Amenities</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {amenitiesOptions.map(amenity => (
          <div key={amenity} className="flex items-start space-x-2">
            <input
              type="checkbox"
              id={`amenity-${amenity}`}
              checked={selectedAmenities.includes(amenity)}
              onChange={() => onToggle(amenity)}
              className="mt-1"
            />
            <label htmlFor={`amenity-${amenity}`} className="text-sm">
              {amenity}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSelector;
