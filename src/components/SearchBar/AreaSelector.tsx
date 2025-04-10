
import React from 'react';

interface AreaSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const AreaSelector: React.FC<AreaSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 block mb-1.5">Area (sq.ft)</label>
      <select 
        className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Area</option>
        <option value="0-500">Below 500 sq.ft</option>
        <option value="500-1000">500 - 1000 sq.ft</option>
        <option value="1000-1500">1000 - 1500 sq.ft</option>
        <option value="1500-2000">1500 - 2000 sq.ft</option>
        <option value="2000-3000">2000 - 3000 sq.ft</option>
        <option value="3000-5000">3000 - 5000 sq.ft</option>
        <option value="5000+">Above 5000 sq.ft</option>
      </select>
    </div>
  );
};

export default AreaSelector;
