
export type PropertyListingFormValues = {
  title: string;
  description: string;
  propertyType: string;
  subPropertyType: string;
  listingType: 'buy' | 'rent';
  price: string;
  locality: string;
  city: string;
  coverArea: string;
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
};

export interface PropertyListingFormProps {
  onExternalSubmit?: (data: PropertyListingFormValues) => void;
  isExternalSubmitting?: boolean;
}
