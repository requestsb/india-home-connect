
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RequestTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RequestTypeSelector: React.FC<RequestTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Request Type</label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buy" id="buy" />
          <Label htmlFor="buy">Buy</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rent" id="rent" />
          <Label htmlFor="rent">Rent</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pg" id="pg" />
          <Label htmlFor="pg">PG</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="plot" id="plot" />
          <Label htmlFor="plot">Plot/Land</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="commercial" id="commercial" />
          <Label htmlFor="commercial">Commercial</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RequestTypeSelector;
