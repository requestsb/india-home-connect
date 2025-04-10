
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
      <div className="col-span-1">
        <Tabs value={searchType} onValueChange={(value) => setSearchType(value as SearchType)} className="w-full">
          <TabsList className="w-full bg-gray-100 p-0 h-auto rounded-lg mb-4">
            <TabsTrigger 
              value="buy" 
              className="flex-1 py-3 text-base data-[state=active]:bg-brand-blue data-[state=active]:text-white rounded-md"
            >
              Buy
            </TabsTrigger>
            <TabsTrigger 
              value="rent" 
              className="flex-1 py-3 text-base data-[state=active]:bg-brand-blue data-[state=active]:text-white rounded-md"
            >
              Rent
            </TabsTrigger>
            <TabsTrigger 
              value="pg" 
              className="flex-1 py-3 text-base data-[state=active]:bg-brand-blue data-[state=active]:text-white rounded-md"
            >
              PG
            </TabsTrigger>
            <TabsTrigger 
              value="commercial" 
              className="flex-1 py-3 text-base data-[state=active]:bg-brand-blue data-[state=active]:text-white rounded-md"
            >
              Commercial
            </TabsTrigger>
            <TabsTrigger 
              value="plot" 
              className="flex-1 py-3 text-base data-[state=active]:bg-brand-blue data-[state=active]:text-white rounded-md"
            >
              Plot
            </TabsTrigger>
          </TabsList>

          {/* Property Search Options */}
          {location && locality && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </Tabs>
      </div>
      
      {/* Search Button */}
      <div className="col-span-1 flex justify-between items-center mt-2">
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="icon"
            className="rounded-full bg-white shadow-sm hover:bg-gray-50">
            <Mic className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-brand-blue hover:bg-brand-darkBlue px-8 py-2 shadow-md transition-all duration-200 hover:-translate-y-1"
          disabled={!location || !locality}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
