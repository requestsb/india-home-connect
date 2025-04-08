
// Property type option getters based on request type
export const getPropertyTypeOptions = (requestType: string) => {
  switch (requestType) {
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

export const getSubPropertyTypeOptions = (propertyType: string) => {
  if (propertyType === 'flat') {
    return [
      { value: 'multistorey', label: 'Multistorey Apartment' },
      { value: 'builder_floor', label: 'Builder Floor Apartment' },
      { value: 'penthouse', label: 'Penthouse' },
      { value: 'studio', label: 'Studio Apartment' },
    ];
  } else if (propertyType === 'house') {
    return [
      { value: 'residential_house', label: 'Residential House' },
      { value: 'villa', label: 'Villa' },
      { value: 'farmhouse', label: 'Farm House' },
    ];
  }
  return [];
};

// Field visibility functions
export const showAreaSizeField = (requestType: string) => {
  return requestType !== 'pg';
};

export const showBedroomsField = (requestType: string, propertyType: string) => {
  return (requestType === 'buy' || requestType === 'rent') && 
         (propertyType === 'flat' || propertyType === 'house');
};

export const showBathroomsField = showBedroomsField;

export const showFurnishingField = showBedroomsField;

export const showFacingField = (propertyType: string) => {
  return propertyType && propertyType !== 'pg';
};

export const showGenderField = (requestType: string) => {
  return requestType === 'pg';
};

export const showCommercialTypeField = (requestType: string) => {
  return requestType === 'commercial';
};

export const showPlotTypeField = (requestType: string) => {
  return requestType === 'plot';
};

export const showSubPropertyTypeField = (requestType: string, propertyType: string) => {
  return (propertyType === 'flat' || propertyType === 'house') &&
         (requestType === 'buy' || requestType === 'rent');
};

export const showAmenitiesField = showBedroomsField;

export const showPossessionField = (requestType: string) => {
  return requestType === 'buy' || requestType === 'plot';
};

export const getBudgetOptions = (requestType: string, priceRangeOptions: any) => {
  if (requestType === 'pg') {
    return [
      '2,000 - 5,000',
      '5,000 - 8,000',
      '8,000 - 12,000',
      '12,000 - 15,000',
      '15,000 - 20,000',
      'Above 20,000',
    ];
  }
  
  return requestType === 'rent' 
    ? priceRangeOptions.rent 
    : priceRangeOptions.buy;
};
