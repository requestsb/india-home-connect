
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

type FormData = {
  propertyType: string;
  location: string;
  budget: number;
  areaSize: number;
  bedrooms: string;
  requirements: string;
};

const PropertyRequestForm: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: '',
    location: '',
    budget: 5000000, // 50 lakhs default
    areaSize: 1000, // 1000 sq ft default
    bedrooms: '',
    requirements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, budget: value[0] }));
  };

  const handleAreaChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, areaSize: value[0] }));
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${value.toLocaleString()}`;
    }
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
        propertyType: '',
        location: '',
        budget: 5000000,
        areaSize: 1000,
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
        <CardContent className="space-y-4">
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
                <SelectItem value="apartment">Apartment/Flat</SelectItem>
                <SelectItem value="house">House/Villa</SelectItem>
                <SelectItem value="plot">Land/Plot</SelectItem>
                <SelectItem value="commercial">Commercial Space</SelectItem>
                <SelectItem value="shop">Shop/Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Select
              value={formData.location}
              onValueChange={(value) => handleSelectChange('location', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi/NCR</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="kolkata">Kolkata</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Range: {formatCurrency(formData.budget)}</label>
            <Slider
              defaultValue={[formData.budget]}
              max={50000000}
              min={500000}
              step={100000}
              onValueChange={handleBudgetChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Area Size: {formData.areaSize} sq.ft</label>
            <Slider
              defaultValue={[formData.areaSize]}
              max={10000}
              min={100}
              step={100}
              onValueChange={handleAreaChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms (for residential)</label>
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
                <SelectItem value="5+">5+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Requirements</label>
            <Textarea
              name="requirements"
              placeholder="Mention any specific requirements like amenities, possession timeline, etc."
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-brand-blue hover:bg-brand-darkBlue"
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
