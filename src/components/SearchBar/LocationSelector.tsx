
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
      <div className="flex items-center border-b-2 border-gray-200 pb-3 mb-3">
        <MapPin className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0" />
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">City</label>
            <select 
              className="w-full h-10 px-3 py-2 text-lg bg-transparent border-none focus:outline-none focus:ring-0 appearance-none cursor-pointer"
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
          </div>
          
          {location && (
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Locality</label>
              <select 
                className="w-full h-10 px-3 py-2 text-lg bg-transparent border-none focus:outline-none focus:ring-0 appearance-none cursor-pointer"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
