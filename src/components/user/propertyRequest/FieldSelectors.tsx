
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  furnishingTypes,
  facingOptions,
  bathroomOptions,
  possessionOptions
} from '@/components/supplier/data/propertyOptions';

interface SelectFieldProps {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ 
  label, value, onChange, options, placeholder 
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const BudgetSelector: React.FC<{ 
  value: string; 
  onChange: (value: string) => void;
  options: string[];
}> = ({ value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Budget</label>
    <Select
      value={value}
      onValueChange={onChange}
      required
    >
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Select budget range" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const AreaSizeSelector: React.FC<{ 
  value: string; 
  onChange: (value: string) => void;
  options: string[];
}> = ({ value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Covered Area (sq.ft)</label>
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Select area range" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option} value={option}>{option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export const BedroomSelector: React.FC<{ 
  value: string; 
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">Bedrooms</label>
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Select number of bedrooms" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 BHK</SelectItem>
        <SelectItem value="2">2 BHK</SelectItem>
        <SelectItem value="3">3 BHK</SelectItem>
        <SelectItem value="4">4 BHK</SelectItem>
        <SelectItem value="5">5 BHK</SelectItem>
        <SelectItem value="6">6+ BHK</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export const BathroomSelector: React.FC<{ 
  value: string | undefined; 
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <SelectField
    label="Bathrooms"
    value={value}
    onChange={onChange}
    options={bathroomOptions}
    placeholder="Select number of bathrooms"
  />
);

export const FurnishingSelector: React.FC<{ 
  value: string | undefined; 
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <SelectField
    label="Furnishing"
    value={value}
    onChange={onChange}
    options={furnishingTypes}
    placeholder="Select furnishing type"
  />
);

export const FacingSelector: React.FC<{ 
  value: string | undefined; 
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <SelectField
    label="Facing"
    value={value}
    onChange={onChange}
    options={facingOptions}
    placeholder="Select facing direction"
  />
);

export const PossessionSelector: React.FC<{ 
  value: string | undefined; 
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <SelectField
    label="Possession Status"
    value={value}
    onChange={onChange}
    options={possessionOptions}
    placeholder="Select possession status"
  />
);
