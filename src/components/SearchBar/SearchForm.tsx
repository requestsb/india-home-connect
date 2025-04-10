
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  SearchType, 
  getPropertyTypeOptions, 
  getBudgetOptions, 
  getLocalities, 
  SearchParams 
} from './searchUtils';
import LocationSelector from './LocationSelector';
import PropertyTypeSelector from './PropertyTypeSelector';
import BedroomSelector from './BedroomSelector';
import BudgetSelector from './BudgetSelector';
import AreaSelector from './AreaSelector';
import GenderSelector from './GenderSelector';
import CommercialPurposeSelector from './CommercialPurposeSelector';
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

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Location selector always shown first */}
      <div className="col-span-1">
        <LocationSelector 
          cities={cities}
          location={location}
          locality={locality}
          localities={localities}
          onLocationChange={setLocation}
          onLocalityChange={setLocality}
        />
      </div>

      {/* Search Type Tabs */}
      <div className="col-span-1 border-b border-gray-200">
        <div className="flex space-x-6">
          <button
            className={`py-2 px-4 font-medium text-lg ${searchType === 'buy' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500'}`}
            onClick={() => setSearchType('buy')}
          >
            Buy
          </button>
          <button
            className={`py-2 px-4 font-medium text-lg ${searchType === 'rent' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500'}`}
            onClick={() => setSearchType('rent')}
          >
            Rent
          </button>
          <button
            className={`py-2 px-4 font-medium text-lg ${searchType === 'pg' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500'}`}
            onClick={() => setSearchType('pg')}
          >
            PG
          </button>
          <button
            className={`py-2 px-4 font-medium text-lg ${searchType === 'commercial' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500'}`}
            onClick={() => setSearchType('commercial')}
          >
            Commercial
          </button>
          <button
            className={`py-2 px-4 font-medium text-lg ${searchType === 'plot' ? 'text-brand-blue border-b-2 border-brand-blue' : 'text-gray-500'}`}
            onClick={() => setSearchType('plot')}
          >
            Plot
          </button>
        </div>
      </div>

      {/* Property Search Options */}
      {location && locality && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
        </div>
      )}
      
      {/* Search Button */}
      <div className="col-span-1 flex justify-between items-center mt-2">
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="icon"
            className="rounded-full bg-white">
            <Mic className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-brand-blue hover:bg-brand-darkBlue px-8 py-2"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
