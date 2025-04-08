
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  cityLocalities,
} from '@/components/supplier/data/propertyOptions';
import { 
  priceRangeOptions,
  areaRangeOptions 
} from '@/components/supplier/types/propertyTypes';

// Import custom components
import RequestTypeSelector from './RequestTypeSelector';
import PropertyTypeSelector from './PropertyTypeSelector';
import LocationSelector from './LocationSelector';
import CommercialTypeSelector from './CommercialTypeSelector';
import GenderSelector from './GenderSelector';
import AmenitiesSelector from './AmenitiesSelector';
import { 
  BudgetSelector, 
  AreaSizeSelector, 
  BedroomSelector,
  BathroomSelector,
  FurnishingSelector,
  FacingSelector,
  PossessionSelector
} from './FieldSelectors';

// Import helpers and types
import { FormData } from './types';
import {
  getPropertyTypeOptions,
  getSubPropertyTypeOptions,
  showAreaSizeField,
  showBedroomsField,
  showBathroomsField,
  showFurnishingField,
  showFacingField,
  showGenderField,
  showCommercialTypeField,
  showPlotTypeField,
  showSubPropertyTypeField,
  showAmenitiesField,
  showPossessionField,
  getBudgetOptions
} from './constants';

const PropertyRequestForm: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [localities, setLocalities] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    requestType: 'buy',
    propertyType: '',
    location: '',
    locality: '',
    budget: '',
    areaSize: '',
    bedrooms: '',
    requirements: '',
  });

  useEffect(() => {
    if (formData.location && cityLocalities[formData.location as keyof typeof cityLocalities]) {
      setLocalities(cityLocalities[formData.location as keyof typeof cityLocalities]);
    } else {
      setLocalities([]);
    }
  }, [formData.location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
    
    // Also update form data
    setFormData(prev => ({
      ...prev,
      amenities: selectedAmenities.includes(amenity) 
        ? prev.amenities?.filter(a => a !== amenity) 
        : [...(prev.amenities || []), amenity]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Request submitted!',
        description: 'We will notify you when we find matching properties.',
      });
      
      // Reset form
      setFormData({
        requestType: 'buy',
        propertyType: '',
        location: '',
        locality: '',
        budget: '',
        areaSize: '',
        bedrooms: '',
        requirements: '',
      });
      setSelectedAmenities([]);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-brand-darkBlue">Submit Property Request</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Specify exactly what you're looking for and let property suppliers come to you
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <RequestTypeSelector 
            value={formData.requestType} 
            onChange={(value) => handleSelectChange('requestType', value)} 
          />

          {showCommercialTypeField(formData.requestType) && (
            <CommercialTypeSelector
              value={formData.commercialType}
              onChange={(value) => handleSelectChange('commercialType', value)}
            />
          )}

          <PropertyTypeSelector
            value={formData.propertyType}
            onChange={(value) => handleSelectChange('propertyType', value)}
            options={getPropertyTypeOptions(formData.requestType)}
          />

          {showSubPropertyTypeField(formData.requestType, formData.propertyType) && (
            <PropertyTypeSelector
              value={formData.subPropertyType}
              onChange={(value) => handleSelectChange('subPropertyType', value)}
              options={getSubPropertyTypeOptions(formData.propertyType)}
              label="Property Sub-Type"
              placeholder="Select property sub-type"
            />
          )}

          {showPlotTypeField(formData.requestType) && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Plot Type</label>
              <PropertyTypeSelector
                value={formData.plotType}
                onChange={(value) => handleSelectChange('plotType', value)}
                options={[
                  { value: 'residential', label: 'Residential Plot' },
                  { value: 'commercial', label: 'Commercial Land' },
                  { value: 'agricultural', label: 'Agricultural Land' }
                ]}
                label="Plot Type"
                placeholder="Select plot type"
              />
            </div>
          )}

          <LocationSelector
            location={formData.location}
            locality={formData.locality}
            localities={localities}
            onLocationChange={(value) => handleSelectChange('location', value)}
            onLocalityChange={(value) => handleSelectChange('locality', value)}
          />

          <BudgetSelector
            value={formData.budget}
            onChange={(value) => handleSelectChange('budget', value)}
            options={getBudgetOptions(formData.requestType, priceRangeOptions)}
          />

          {showAreaSizeField(formData.requestType) && (
            <AreaSizeSelector
              value={formData.areaSize}
              onChange={(value) => handleSelectChange('areaSize', value)}
              options={areaRangeOptions}
            />
          )}

          {showBedroomsField(formData.requestType, formData.propertyType) && (
            <BedroomSelector
              value={formData.bedrooms}
              onChange={(value) => handleSelectChange('bedrooms', value)}
            />
          )}

          {showBathroomsField(formData.requestType, formData.propertyType) && (
            <BathroomSelector
              value={formData.bathrooms}
              onChange={(value) => handleSelectChange('bathrooms', value)}
            />
          )}

          {showFurnishingField(formData.requestType, formData.propertyType) && (
            <FurnishingSelector
              value={formData.furnishing}
              onChange={(value) => handleSelectChange('furnishing', value)}
            />
          )}

          {showFacingField(formData.propertyType) && (
            <FacingSelector
              value={formData.facing}
              onChange={(value) => handleSelectChange('facing', value)}
            />
          )}

          {showGenderField(formData.requestType) && (
            <GenderSelector
              value={formData.gender}
              onChange={(value) => handleSelectChange('gender', value)}
            />
          )}

          {showPossessionField(formData.requestType) && (
            <PossessionSelector
              value={formData.possession}
              onChange={(value) => handleSelectChange('possession', value)}
            />
          )}

          {showAmenitiesField(formData.requestType, formData.propertyType) && (
            <AmenitiesSelector
              selectedAmenities={selectedAmenities}
              onToggle={toggleAmenity}
            />
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Requirements</label>
            <Textarea
              name="requirements"
              placeholder="Mention any specific requirements like amenities, possession timeline, etc."
              value={formData.requirements}
              onChange={handleChange}
              rows={isMobile ? 3 : 4}
              className="resize-none bg-white"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            variant="blueGreen"
            className="w-full text-base py-6 transform hover:-translate-y-1 transition-all duration-300"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PropertyRequestForm;
