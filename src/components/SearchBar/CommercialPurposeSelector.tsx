
import React from 'react';

interface CommercialPurposeSelectorProps {
  value: 'buy' | 'lease' | '';
  onChange: (value: 'buy' | 'lease' | '') => void;
}

const CommercialPurposeSelector: React.FC<CommercialPurposeSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 block mb-1.5">Purpose</label>
      <select 
        className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-blue bg-white shadow-sm"
        value={value}
        onChange={(e) => onChange(e.target.value as 'buy' | 'lease')}
      >
        <option value="">Select Purpose</option>
        <option value="buy">Buy</option>
        <option value="lease">Lease</option>
      </select>
    </div>
  );
};

export default CommercialPurposeSelector;
