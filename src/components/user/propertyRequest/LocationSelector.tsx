
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities } from '@/components/supplier/data/propertyOptions';

interface LocationSelectorProps {
  location: string;
  locality: string;
  localities: string[];
  onLocationChange: (value: string) => void;
  onLocalityChange: (value: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  location, 
  locality, 
  localities, 
  onLocationChange, 
  onLocalityChange 
}) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <Select
          value={location}
          onValueChange={onLocationChange}
          required
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(city => (
              <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {location && localities.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Locality</label>
          <Select
            value={locality}
            onValueChange={onLocalityChange}
            required
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select locality" />
            </SelectTrigger>
            <SelectContent>
              {localities.map(locality => (
                <SelectItem key={locality} value={locality.toLowerCase()}>{locality}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default LocationSelector;
