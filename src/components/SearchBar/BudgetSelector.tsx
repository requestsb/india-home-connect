
import React from 'react';

interface BudgetSelectorProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

const BudgetSelector: React.FC<BudgetSelectorProps> = ({ options, value, onChange }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 block mb-1.5">Budget</label>
      <select 
        className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Budget</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BudgetSelector;
