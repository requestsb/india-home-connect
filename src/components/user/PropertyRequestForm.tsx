
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
  cityLocalities 
} from '@/components/supplier/data/propertyOptions';
import { 
  priceRangeOptions,
  areaRangeOptions 
} from '@/components/supplier/types/propertyTypes';

type FormData = {
  requestType: 'buy' | 'rent' | 'pg' | 'plot' | 'commercial';
  propertyType: string;
  location: string;
  locality: string;
  budget: string;
  areaSize: string;
  bedrooms: string;
  gender?: 'male' | 'female' | 'any';
  requirements: string;
  commercialType?: 'buy' | 'lease';
};

const PropertyRequestForm: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [localities, setLocalities] = useState<string[]>([]);
  
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
    return formData.requestType !== 'pg';
  };

  const showBedroomsField = () => {
    return (formData.requestType === 'buy' || formData.requestType === 'rent') && 
           (formData.propertyType === 'flat' || formData.propertyType === 'house');
  };

  const showGenderField = () => {
    return formData.requestType === 'pg';
  };

  const showCommercialTypeField = () => {
    return formData.requestType === 'commercial';
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
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit Property Request</CardTitle>
        <CardDescription>
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
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {getPropertyTypeOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleSelectChange('location', value)}
              required
            >
              <SelectTrigger>
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
                <SelectTrigger>
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
              <SelectTrigger>
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
                <SelectTrigger>
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
                <SelectTrigger>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Requirements</label>
            <Textarea
              name="requirements"
              placeholder="Mention any specific requirements like amenities, possession timeline, etc."
              value={formData.requirements}
              onChange={handleChange}
              rows={isMobile ? 3 : 4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            variant="blueGreen"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PropertyRequestForm;
