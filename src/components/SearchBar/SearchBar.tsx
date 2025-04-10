
import React from 'react';
import SearchForm from './SearchForm';

const SearchBar: React.FC = () => {
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 max-w-5xl mx-auto border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Find Your Perfect Property</h3>
      <SearchForm />
    </div>
  );
};

export default SearchBar;
