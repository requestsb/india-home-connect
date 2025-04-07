export type PropertyListingFormValues = {
  title: string;
  description: string;
  propertyType: string;
  subPropertyType: string;
  listingType: 'buy' | 'rent';
  budget: string;
  coverArea: string;
  locality: string;
  city: string;
  floor: string;
  totalFloors: string;
  possession: string;
  saleType: string;
  ownership: string;
  furnishing: string;
  bathrooms: string;
  facing: string;
  bedrooms: string;
  amenities: string[];
  supplierType: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
};

export interface PropertyListingFormProps {
  onExternalSubmit?: (data: PropertyListingFormValues) => void;
  isExternalSubmitting?: boolean;
}

export interface PropertyData {
  id: number;
  title: string;
  price: number;
  city: string;
  locality: string;
  "Property Type": string;
  bedrooms: string;
  bathrooms: number;
  "Covered Area (sq.ft)": number;
  created_at: string;
  listing_type: string;
  "Possession Status": string;
  user_id: string;
  supplierType: string;
  description: string;
  amenities: string[];
  matchCriteria?: {
    matches: string[];
    nonMatches: string[];
  };
}

export const priceRangeOptions = {
  buy: [
    '5 Lac - 10 Lac',
    '10 Lac - 15 Lac',
    '15 Lac - 20 Lac',
    '20 Lac - 30 Lac',
    '30 Lac - 40 Lac',
    '40 Lac - 50 Lac',
    '50 Lac - 60 Lac',
    '60 Lac - 70 Lac',
    '70 Lac - 80 Lac',
    '80 Lac - 90 Lac',
    '90 Lac - 1 Cr',
    '1 Cr - 1.5 Cr',
    '1.5 Cr - 2 Cr',
    '2 Cr - 3 Cr',
    '3 Cr - 4 Cr',
    '4 Cr - 5 Cr',
    '5 Cr - 6 Cr',
    'Above 6 Cr'
  ],
  rent: [
    'Below 5,000',
    '5,000 - 10,000',
    '10,000 - 15,000',
    '15,000 - 20,000',
    '20,000 - 25,000',
    '25,000 - 30,000',
    '30,000 - 40,000',
    '40,000 - 50,000',
    '50,000 - 75,000',
    '75,000 - 1 Lac',
    'Above 1 Lac'
  ]
};

export const areaRangeOptions = [
  '100 - 500 sq.ft',
  '500 - 1,000 sq.ft',
  '1,000 - 1,500 sq.ft',
  '1,500 - 2,000 sq.ft',
  '2,000 - 3,000 sq.ft',
  '3,000 - 5,000 sq.ft',
  '5,000 - 10,000 sq.ft',
  '10,000 - 20,000 sq.ft',
  '20,000 - 50,000 sq.ft',
  'Above 50,000 sq.ft'
];

export const generatePropertyTitle = (bedrooms: string, locality: string, city: string): string => {
  if (!bedrooms || !locality || !city) return '';
  
  return `${bedrooms} BHK Property for Sale in ${locality}, ${city}`;
};

export const generatePropertyDescription = (
  bedrooms: string, 
  locality: string, 
  city: string, 
  amenities: string[],
  price: string
): string => {
  if (!bedrooms || !locality || !city) return '';
  
  const amenitiesText = amenities && amenities.length > 0 
    ? `This property offers ${amenities.slice(0, 5).join(', ')}${amenities.length > 5 ? ' and more amenities' : ''}.` 
    : '';
  
  return `Beautiful ${bedrooms} BHK property located in ${locality}, ${city}. ${amenitiesText} Available for ${price ? `₹${price}` : 'affordable price'}.`;
};

export const generateSeoMetaTitle = (bedrooms: string, locality: string, city: string): string => {
  if (!bedrooms || !locality || !city) return '';
  
  return `${bedrooms} BHK Property in ${locality}, ${city} | Best Properties`;
};

export const generateSeoMetaDescription = (
  bedrooms: string, 
  locality: string, 
  city: string, 
  amenities: string[],
  price: string
): string => {
  if (!bedrooms || !locality || !city) return '';
  
  const amenitiesText = amenities && amenities.length > 0 
    ? `with ${amenities.slice(0, 3).join(', ')}` 
    : '';
  
  return `Buy ${bedrooms} BHK Property in ${locality}, ${city} ${amenitiesText} at just ₹${price}. Contact now for best deals!`;
};
