
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  cities: string[];
  location: string;
  locality: string;
  localities: string[];
  onLocationChange: (value: string) => void;
  onLocalityChange: (value: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  cities, 
  location, 
  locality, 
  localities, 
  onLocationChange, 
  onLocalityChange 
}) => {
  return (
    <div className="relative">
      <div className="flex items-center border-b border-gray-200 pb-3 mb-2">
        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
        <div className="flex flex-1 items-center space-x-3">
          <select 
            className="w-full h-10 px-3 py-2 text-lg bg-transparent border-none focus:outline-none focus:ring-0 appearance-none"
            value={location}
            onChange={(e) => {
              onLocationChange(e.target.value);
              onLocalityChange(''); // Reset locality when location changes
            }}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city.toLowerCase()}>
                {city}
              </option>
            ))}
          </select>
          
          {location && localities.length > 0 && (
            <select 
              className="w-full h-10 px-3 py-2 text-lg bg-transparent border-none focus:outline-none focus:ring-0 appearance-none"
              value={locality}
              onChange={(e) => onLocalityChange(e.target.value)}
            >
              <option value="">Select Locality</option>
              {localities.map(loc => (
                <option key={loc} value={loc.toLowerCase()}>
                  {loc}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
