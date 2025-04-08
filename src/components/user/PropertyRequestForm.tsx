
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  cities,
  cityLocalities,
  furnishingTypes,
  facingOptions,
  bathroomOptions,
  amenitiesOptions,
  possessionOptions
} from '@/components/supplier/data/propertyOptions';
import { 
  priceRangeOptions,
  areaRangeOptions 
} from '@/components/supplier/types/propertyTypes';

// Extended form data type to include all new fields
type FormData = {
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

  const getPropertyTypeOptions = () => {
    switch (formData.requestType) {
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

  const getSubPropertyTypeOptions = () => {
    if (formData.propertyType === 'flat') {
      return [
        { value: 'multistorey', label: 'Multistorey Apartment' },
        { value: 'builder_floor', label: 'Builder Floor Apartment' },
        { value: 'penthouse', label: 'Penthouse' },
        { value: 'studio', label: 'Studio Apartment' },
      ];
    } else if (formData.propertyType === 'house') {
      return [
        { value: 'residential_house', label: 'Residential House' },
        { value: 'villa', label: 'Villa' },
        { value: 'farmhouse', label: 'Farm House' },
      ];
    }
    return [];
  };

  const getBudgetOptions = () => {
    if (formData.requestType === 'pg') {
      return [
        '2,000 - 5,000',
        '5,000 - 8,000',
        '8,000 - 12,000',
        '12,000 - 15,000',
        '15,000 - 20,000',
        'Above 20,000',
      ];
    }
    
    return formData.requestType === 'rent' 
      ? priceRangeOptions.rent 
      : priceRangeOptions.buy;
  };

  const showAreaSizeField = () => {
    // Show area size for everything except PG
    return formData.requestType !== 'pg';
  };

  const showBedroomsField = () => {
    // Show bedrooms for residential properties (not for plots, commercial, or PG)
    return (formData.requestType === 'buy' || formData.requestType === 'rent') && 
           (formData.propertyType === 'flat' || formData.propertyType === 'house');
  };

  const showBathroomsField = () => {
    // Similar to bedrooms
    return showBedroomsField();
  };

  const showFurnishingField = () => {
    // For residential properties only
    return (formData.requestType === 'buy' || formData.requestType === 'rent') && 
           (formData.propertyType === 'flat' || formData.propertyType === 'house');
  };

  const showFacingField = () => {
    // For residential and commercial properties
    return formData.propertyType && formData.propertyType !== 'pg';
  };

  const showGenderField = () => {
    return formData.requestType === 'pg';
  };

  const showCommercialTypeField = () => {
    return formData.requestType === 'commercial';
  };

  const showPlotTypeField = () => {
    return formData.requestType === 'plot';
  };

  const showSubPropertyTypeField = () => {
    return (formData.propertyType === 'flat' || formData.propertyType === 'house') &&
           (formData.requestType === 'buy' || formData.requestType === 'rent');
  };

  const showAmenitiesField = () => {
    // Show amenities for residential properties
    return (formData.requestType === 'buy' || formData.requestType === 'rent') && 
           (formData.propertyType === 'flat' || formData.propertyType === 'house');
  };

  const showPossessionField = () => {
    return formData.requestType === 'buy' || formData.requestType === 'plot';
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Request Type</label>
            <RadioGroup
              value={formData.requestType}
              onValueChange={(value) => handleSelectChange('requestType', value)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy">Buy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rent" id="rent" />
                <Label htmlFor="rent">Rent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pg" id="pg" />
                <Label htmlFor="pg">PG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="plot" id="plot" />
                <Label htmlFor="plot">Plot/Land</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="commercial" />
                <Label htmlFor="commercial">Commercial</Label>
              </div>
            </RadioGroup>
          </div>

          {showCommercialTypeField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Commercial Property For</label>
              <RadioGroup
                value={formData.commercialType}
                onValueChange={(value) => handleSelectChange('commercialType', value)}
                className="flex flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buy" id="commercial-buy" />
                  <Label htmlFor="commercial-buy">Buy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lease" id="commercial-lease" />
                  <Label htmlFor="commercial-lease">Lease</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Property Type</label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => handleSelectChange('propertyType', value)}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {getPropertyTypeOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showSubPropertyTypeField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Property Sub-Type</label>
              <Select
                value={formData.subPropertyType}
                onValueChange={(value) => handleSelectChange('subPropertyType', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select property sub-type" />
                </SelectTrigger>
                <SelectContent>
                  {getSubPropertyTypeOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showPlotTypeField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Plot Type</label>
              <Select
                value={formData.plotType}
                onValueChange={(value) => handleSelectChange('plotType', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select plot type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential Plot</SelectItem>
                  <SelectItem value="commercial">Commercial Land</SelectItem>
                  <SelectItem value="agricultural">Agricultural Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleSelectChange('location', value)}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.location && localities.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Locality</label>
              <Select
                value={formData.locality}
                onValueChange={(value) => handleSelectChange('locality', value)}
                required
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select locality" />
                </SelectTrigger>
                <SelectContent>
                  {localities.map(locality => (
                    <SelectItem key={locality} value={locality.toLowerCase()}>{locality}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Budget</label>
            <Select
              value={formData.budget}
              onValueChange={(value) => handleSelectChange('budget', value)}
              required
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {getBudgetOptions().map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showAreaSizeField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Covered Area (sq.ft)</label>
              <Select
                value={formData.areaSize}
                onValueChange={(value) => handleSelectChange('areaSize', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select area range" />
                </SelectTrigger>
                <SelectContent>
                  {areaRangeOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showBedroomsField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Bedrooms</label>
              <Select
                value={formData.bedrooms}
                onValueChange={(value) => handleSelectChange('bedrooms', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select number of bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 BHK</SelectItem>
                  <SelectItem value="2">2 BHK</SelectItem>
                  <SelectItem value="3">3 BHK</SelectItem>
                  <SelectItem value="4">4 BHK</SelectItem>
                  <SelectItem value="5">5 BHK</SelectItem>
                  <SelectItem value="6">6+ BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {showBathroomsField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Bathrooms</label>
              <Select
                value={formData.bathrooms}
                onValueChange={(value) => handleSelectChange('bathrooms', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select number of bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bathroomOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showFurnishingField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Furnishing</label>
              <Select
                value={formData.furnishing}
                onValueChange={(value) => handleSelectChange('furnishing', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select furnishing type" />
                </SelectTrigger>
                <SelectContent>
                  {furnishingTypes.map(option => (
                    <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showFacingField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Facing</label>
              <Select
                value={formData.facing}
                onValueChange={(value) => handleSelectChange('facing', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select facing direction" />
                </SelectTrigger>
                <SelectContent>
                  {facingOptions.map(option => (
                    <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showGenderField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Gender</label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
                className="flex flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">Any</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {showPossessionField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Possession Status</label>
              <Select
                value={formData.possession}
                onValueChange={(value) => handleSelectChange('possession', value)}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select possession status" />
                </SelectTrigger>
                <SelectContent>
                  {possessionOptions.map(option => (
                    <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {showAmenitiesField() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Required Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {amenitiesOptions.map(amenity => (
                  <div key={amenity} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="mt-1"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="text-sm">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
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
