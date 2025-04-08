
import React from 'react';

interface PropertyTypeSelectorProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({ options, value, onChange }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600">Property Type</label>
      <select 
        className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Property Type</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PropertyTypeSelector;
