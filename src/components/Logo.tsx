
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 bg-brand-blue rounded-md flex items-center justify-center">
        <span className="text-white font-bold text-xl">R</span>
      </div>
      <span className="text-xl font-bold">
        <span className="text-brand-blue">Re</span>
        <span className="text-brand-orange">Quest</span>
      </span>
    </div>
  );
};

export default Logo;
