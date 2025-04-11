
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface GenderSelectorProps {
  value: 'male' | 'female' | 'any';
  onChange: (value: string) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 block mb-1">Gender</label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex gap-3"
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="male" id="search-male" className="h-3.5 w-3.5" />
          <Label htmlFor="search-male" className="text-sm">Male</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="female" id="search-female" className="h-3.5 w-3.5" />
          <Label htmlFor="search-female" className="text-sm">Female</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="any" id="search-any-gender" className="h-3.5 w-3.5" />
          <Label htmlFor="search-any-gender" className="text-sm">Any</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default GenderSelector;
