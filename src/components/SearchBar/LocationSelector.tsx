
import React from 'react';

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
    <div>
      <label className="text-xs font-medium text-gray-600">Location</label>
      <select 
        className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
        <div className="mt-2">
          <label className="text-xs font-medium text-gray-600">Locality</label>
          <select 
            className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue"
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
  );
};

export default LocationSelector;
