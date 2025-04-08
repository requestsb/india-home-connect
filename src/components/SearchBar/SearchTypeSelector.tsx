
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SearchTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="mb-2">
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-wrap gap-2"
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="buy" id="search-buy" className="h-3.5 w-3.5" />
          <Label htmlFor="search-buy" className="text-sm">Buy</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="rent" id="search-rent" className="h-3.5 w-3.5" />
          <Label htmlFor="search-rent" className="text-sm">Rent</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="pg" id="search-pg" className="h-3.5 w-3.5" />
          <Label htmlFor="search-pg" className="text-sm">PG</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="plot" id="search-plot" className="h-3.5 w-3.5" />
          <Label htmlFor="search-plot" className="text-sm">Plot/Land</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="commercial" id="search-commercial" className="h-3.5 w-3.5" />
          <Label htmlFor="search-commercial" className="text-sm">Commercial</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SearchTypeSelector;
