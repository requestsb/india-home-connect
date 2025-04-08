
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SearchTypeSelector from './SearchTypeSelector';
import PropertyTypeSelector from './PropertyTypeSelector';
import LocationSelector from './LocationSelector';
import BedroomSelector from './BedroomSelector';
import BudgetSelector from './BudgetSelector';
import AreaSelector from './AreaSelector';
import GenderSelector from './GenderSelector';
import { cities, cityLocalities } from '@/components/supplier/data/propertyOptions';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<'buy' | 'rent' | 'pg' | 'plot' | 'commercial'>('buy');
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
    if (location && cityLocalities[location as keyof typeof cityLocalities]) {
      setLocalities(cityLocalities[location as keyof typeof cityLocalities]);
    } else {
      setLocalities([]);
    }
  }, [location]);

  useEffect(() => {
    // Reset property type when search type changes
    setPropertyType('');
    setSubPropertyType('');
    setBedrooms('');
    setGender('');
    setCommercialType('');
  }, [searchType]);

  const getPropertyTypeOptions = () => {
    switch (searchType) {
      case 'buy':
      case 'rent':
        return [
          { value: 'flat', label: 'Flat/Apartment' },
          { value: 'house', label: 'House/Villa' },
          { value: 'plot', label: 'Plot/Land' },
        ];
      case 'pg':
        return [
          { value: 'pg', label: 'Paying Guest (PG)' },
        ];
      case 'plot':
        return [
          { value: 'residential', label: 'Residential Plot' },
          { value: 'commercial', label: 'Commercial Land' },
          { value: 'agricultural', label: 'Agricultural Land' },
          { value: 'farmhouse', label: 'Farm House' },
        ];
      case 'commercial':
        return [
          { value: 'office', label: 'Office Space' },
          { value: 'shop', label: 'Shop/Showroom' },
          { value: 'commercial_land', label: 'Commercial Land' },
          { value: 'coworking', label: 'Coworking Space' },
          { value: 'warehouse', label: 'Warehouse/Godown' },
          { value: 'industrial_building', label: 'Industrial Building' },
          { value: 'industrial_shed', label: 'Industrial Shed' },
        ];
      default:
        return [];
    }
  };

  const getBudgetOptions = () => {
    if (searchType === 'pg') {
      return [
        { value: '2000-5000', label: '₹2,000 - ₹5,000' },
        { value: '5000-8000', label: '₹5,000 - ₹8,000' },
        { value: '8000-12000', label: '₹8,000 - ₹12,000' },
        { value: '12000-15000', label: '₹12,000 - ₹15,000' },
        { value: '15000-20000', label: '₹15,000 - ₹20,000' },
        { value: '20000+', label: 'Above ₹20,000' },
      ];
    }
    
    if (searchType === 'rent') {
      return [
        { value: '5000-10000', label: '₹5,000 - ₹10,000' },
        { value: '10000-15000', label: '₹10,000 - ₹15,000' },
        { value: '15000-25000', label: '₹15,000 - ₹25,000' },
        { value: '25000-50000', label: '₹25,000 - ₹50,000' },
        { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
        { value: '100000+', label: 'Above ₹1,00,000' },
      ];
    }
    
    return [
      { value: '500000-2000000', label: '₹5 Lac - ₹20 Lac' },
      { value: '2000000-5000000', label: '₹20 Lac - ₹50 Lac' },
      { value: '5000000-10000000', label: '₹50 Lac - ₹1 Cr' },
      { value: '10000000-20000000', label: '₹1 Cr - ₹2 Cr' },
      { value: '20000000-50000000', label: '₹2 Cr - ₹5 Cr' },
      { value: '50000000+', label: 'Above ₹5 Cr' },
    ];
  };

  const handleSearch = () => {
    // Build search params and redirect to search results page
    // In a real app, you would navigate to a search results page with these parameters
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
    <div className="w-full bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <SearchTypeSelector 
            value={searchType} 
            onChange={(value) => setSearchType(value as 'buy' | 'rent' | 'pg' | 'plot' | 'commercial')}
          />
        </div>

        {searchType === 'commercial' && (
          <div>
            <label className="text-xs font-medium text-gray-600">Purpose</label>
            <select 
              className="w-full h-10 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-blue"
              value={commercialType}
              onChange={(e) => setCommercialType(e.target.value as 'buy' | 'lease')}
            >
              <option value="">Select Purpose</option>
              <option value="buy">Buy</option>
              <option value="lease">Lease</option>
            </select>
          </div>
        )}

        <div>
          <PropertyTypeSelector 
            options={getPropertyTypeOptions()}
            value={propertyType}
            onChange={setPropertyType}
          />
        </div>

        <div>
          <LocationSelector 
            cities={cities}
            location={location}
            locality={locality}
            localities={localities}
            onLocationChange={setLocation}
            onLocalityChange={setLocality}
          />
        </div>

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
            options={getBudgetOptions()}
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
        
        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
          <Button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-brand-blue hover:bg-brand-darkBlue px-8 py-2"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
