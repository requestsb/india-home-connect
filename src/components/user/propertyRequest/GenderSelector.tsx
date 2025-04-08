
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface GenderSelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Gender</label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-row gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="any" id="any" />
          <Label htmlFor="any">Any</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default GenderSelector;
