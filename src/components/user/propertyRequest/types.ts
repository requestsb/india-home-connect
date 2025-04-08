
// Form data type
export type FormData = {
  requestType: 'buy' | 'rent' | 'pg' | 'plot' | 'commercial';
  propertyType: string;
  subPropertyType?: string;
  location: string;
  locality: string;
  budget: string;
  areaSize: string;
  bedrooms: string;
  bathrooms?: string;
  gender?: 'male' | 'female' | 'any';
  furnishing?: string;
  facing?: string;
  amenities?: string[];
  possession?: string;
  requirements: string;
  commercialType?: 'buy' | 'lease';
  plotType?: string;
};
