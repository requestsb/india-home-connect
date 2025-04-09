
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchTypeSelector from './SearchTypeSelector';
import PropertyTypeSelector from './PropertyTypeSelector';
import LocationSelector from './LocationSelector';
import BedroomSelector from './BedroomSelector';
import BudgetSelector from './BudgetSelector';
import AreaSelector from './AreaSelector';
import GenderSelector from './GenderSelector';
import CommercialPurposeSelector from './CommercialPurposeSelector';
import { SearchType, getPropertyTypeOptions, getBudgetOptions, getLocalities, SearchParams } from './searchUtils';
import { cities } from '@/components/supplier/data/propertyOptions';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>('buy');
  const [propertyType, setPropertyType] = useState('');
  const [subPropertyType, setSubPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [localities, setLocalities] = useState<string[]>([]);
  const [locality, setLocality] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [budget, setBudget] = useState('');
  const [area, setArea] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'any' | ''>('');
  const [commercialType, setCommercialType] = useState<'buy' | 'lease' | ''>('');

  useEffect(() => {
    setLocalities(getLocalities(location));
  }, [location]);

  useEffect(() => {
    // Reset property type when search type changes
    setPropertyType('');
    setSubPropertyType('');
    setBedrooms('');
    setGender('');
    setCommercialType('');
  }, [searchType]);

  const handleSearch = () => {
    // Build search params and redirect to search results page
    console.log('Search params:', {
      searchType,
      propertyType,
      subPropertyType,
      location,
      locality,
      bedrooms,
      budget,
      area,
      gender,
      commercialType
    });
    
    // Redirect to user auth for now as a placeholder
    navigate('/user/auth');
  };

  // Show additional options only if location is selected
  const showAdditionalOptions = location && locality;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <SearchTypeSelector 
          value={searchType} 
          onChange={(value) => setSearchType(value as SearchType)}
        />
      </div>

      {/* Location selector always shown first */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <LocationSelector 
          cities={cities}
          location={location}
          locality={locality}
          localities={localities}
          onLocationChange={setLocation}
          onLocalityChange={setLocality}
        />
      </div>

      {/* Show additional options only when location and locality are selected */}
      {showAdditionalOptions && (
        <>
          {searchType === 'commercial' && (
            <div>
              <CommercialPurposeSelector
                value={commercialType}
                onChange={setCommercialType}
              />
            </div>
          )}

          {searchType !== 'pg' && (
            <div>
              <PropertyTypeSelector 
                options={getPropertyTypeOptions(searchType)}
                value={propertyType}
                onChange={setPropertyType}
              />
            </div>
          )}

          {(searchType === 'buy' || searchType === 'rent') && 
           (propertyType === 'flat' || propertyType === 'house') && (
            <div>
              <BedroomSelector 
                value={bedrooms} 
                onChange={setBedrooms}
              />
            </div>
          )}

          {searchType === 'pg' && (
            <div>
              <GenderSelector
                value={gender as 'male' | 'female' | 'any'}
                onChange={(value) => setGender(value as 'male' | 'female' | 'any')}
              />
            </div>
          )}

          <div>
            <BudgetSelector 
              options={getBudgetOptions(searchType)}
              value={budget}
              onChange={setBudget}
            />
          </div>

          {searchType !== 'pg' && searchType !== 'rent' && (
            <div>
              <AreaSelector 
                value={area}
                onChange={setArea}
              />
            </div>
          )}
        </>
      )}
      
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center mt-2">
        <Button 
          onClick={handleSearch}
          className="w-full sm:w-auto bg-brand-blue hover:bg-brand-darkBlue px-8 py-2"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
