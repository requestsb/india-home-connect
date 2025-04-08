
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface CommercialTypeSelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const CommercialTypeSelector: React.FC<CommercialTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Commercial Property For</label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-row gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buy" id="commercial-buy" />
          <Label htmlFor="commercial-buy">Buy</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lease" id="commercial-lease" />
          <Label htmlFor="commercial-lease">Lease</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default CommercialTypeSelector;
