
import React from 'react';
import SearchForm from './SearchForm';

const SearchBar: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 max-w-4xl mx-auto">
      <SearchForm />
    </div>
  );
};

export default SearchBar;
