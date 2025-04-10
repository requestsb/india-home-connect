
import React from 'react';

interface BedroomSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const BedroomSelector: React.FC<BedroomSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 block mb-1.5">Bedrooms</label>
      <select 
        className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
        <option value="4">4 BHK</option>
        <option value="5">5 BHK</option>
        <option value="6">6+ BHK</option>
      </select>
    </div>
  );
};

export default BedroomSelector;
