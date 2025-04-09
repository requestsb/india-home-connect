
import { cities, cityLocalities } from '@/components/supplier/data/propertyOptions';

export type SearchType = 'buy' | 'rent' | 'pg' | 'plot' | 'commercial';

export const getPropertyTypeOptions = (searchType: SearchType) => {
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

export const getBudgetOptions = (searchType: SearchType) => {
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

export const getLocalities = (location: string) => {
  if (location && cityLocalities[location as keyof typeof cityLocalities]) {
    return cityLocalities[location as keyof typeof cityLocalities];
  }
  return [];
};

export interface SearchParams {
  searchType: SearchType;
  propertyType: string;
  subPropertyType: string;
  location: string;
  locality: string;
  bedrooms: string;
  budget: string;
  area: string;
  gender: 'male' | 'female' | 'any' | '';
  commercialType: 'buy' | 'lease' | '';
}
