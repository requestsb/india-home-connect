import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Info, Plus } from 'lucide-react';

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
  amenities: string[];
};

interface PropertyListingFormProps {
  onExternalSubmit?: (data: PropertyListingFormValues) => void;
  isExternalSubmitting?: boolean;
}

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const subPropertyTypes = [
  'Multistorey Apartment',
  'Builder Floor Apartment',
  'Penthouse',
  'Studio Apartment',
  'Residential House',
  'Villa'
];

const saleTypes = ['New', 'Resale'];

const ownershipTypes = [
  'Freehold',
  'Leasehold',
  'Power Of Attorney',
  'Co-operative Society'
];

const furnishingTypes = [
  'Furnished',
  'Semi-Furnished',
  'Unfurnished'
];

const facingOptions = [
  'East',
  'North',
  'North - East',
  'North - West',
  'South',
  'South - East',
  'South - West',
  'West'
];

const bathroomOptions = ['1', '2', '3', '4', '5'];

const amenitiesOptions = [
  'Reserved Parking',
  'Lift',
  'Power Back Up',
  'Piped Gas',
  'Park',
  'Kids play area',
  'Gymnasium',
  'Swimming Pool',
  'Club House',
  'Vaastu Compliant',
  'Air Conditioned'
];

const possessionOptions = [
  'Ready to Move',
  'Under Construction',
  'Immediately Available',
  'Available in 3 Months',
  'Available in 6 Months'
];

const PropertyListingForm: React.FC<PropertyListingFormProps> = ({ 
  onExternalSubmit,
  isExternalSubmitting = false
}) => {
  const { toast } = useToast();
  const [listingType, setListingType] = useState<'buy' | 'rent'>('buy');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PropertyListingFormValues>({
    defaultValues: {
      title: '',
      description: '',
      propertyType: 'residential',
      subPropertyType: '',
      listingType: 'buy',
      price: '',
      locality: '',
      city: '',
      coverArea: '',
      floor: '',
      totalFloors: '',
      possession: '',
      saleType: '',
      ownership: '',
      furnishing: '',
      bathrooms: '',
      facing: '',
      amenities: [],
    },
  });

  const onSubmit = (data: PropertyListingFormValues) => {
    const formData = { ...data, amenities: selectedAmenities };
    
    if (onExternalSubmit) {
      onExternalSubmit(formData);
    } else {
      setIsSubmitting(true);
      
      console.log(formData);
      
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Property Listed Successfully",
          description: "Your property has been listed and will be visible to potential buyers/tenants.",
          variant: "default",
        });
        
        form.reset();
        setSelectedAmenities([]);
      }, 1500);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleListingTypeChange = (value: 'buy' | 'rent') => {
    setListingType(value);
    form.setValue('listingType', value);
  };

  const submissionInProgress = isExternalSubmitting || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Tabs 
              defaultValue="buy" 
              className="w-full"
              onValueChange={(value) => handleListingTypeChange(value as 'buy' | 'rent')}
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger 
                  value="buy" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue to-brand-darkBlue data-[state=active]:text-white"
                >
                  For Sale
                </TabsTrigger>
                <TabsTrigger 
                  value="rent" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-orange to-brand-warmAccent data-[state=active]:text-white"
                >
                  For Rent
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="buy" className="border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-4">
                  Choose from the following categories for sale properties:
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Ready to Move', 'Owner Properties', 'Budget Homes', 'Premium Homes', 'New Projects'].map((category) => (
                    <Card 
                      key={category} 
                      className="p-3 cursor-pointer hover:bg-brand-lightBlue/20 transition-colors border border-brand-lightBlue/30"
                      onClick={() => {
                        if (category === 'Ready to Move') {
                          form.setValue('possession', 'Ready to Move');
                        }
                      }}
                    >
                      <div className="text-sm font-medium">{category}</div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="rent" className="border p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-4">
                  Choose from the following categories for rental properties:
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Owner Properties', 'Furnished Homes', 'Bachelor Friendly', 'Immediately Available'].map((category) => (
                    <Card 
                      key={category} 
                      className="p-3 cursor-pointer hover:bg-brand-lightBlue/20 transition-colors border border-brand-lightBlue/30"
                      onClick={() => {
                        if (category === 'Furnished Homes') {
                          form.setValue('furnishing', 'Furnished');
                        } else if (category === 'Immediately Available') {
                          form.setValue('possession', 'Immediately Available');
                        }
                      }}
                    >
                      <div className="text-sm font-medium">{category}</div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., 3BHK Apartment in Malad West" 
                      {...field} 
                      className="focus:border-brand-blue focus:ring-brand-blue/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Description</FormLabel>
                  <FormControl>
                    <textarea 
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-brand-blue focus:ring-brand-blue/30 min-h-[120px] resize-y"
                      placeholder="Describe your property in detail..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-brand-blue/30">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locality</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Malad West" 
                        {...field} 
                        className="focus:border-brand-blue focus:ring-brand-blue/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder={listingType === 'buy' ? "e.g., 5000000" : "e.g., 25000"} 
                      {...field} 
                      className="focus:border-brand-blue focus:ring-brand-blue/30"
                    />
                  </FormControl>
                  <FormDescription>
                    {listingType === 'buy' 
                      ? "Enter the total price of the property" 
                      : "Enter the monthly rent amount"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subPropertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-brand-blue/30">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subPropertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Covered Area (sq.ft)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 1200" 
                        {...field} 
                        className="focus:border-brand-blue focus:ring-brand-blue/30" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 3" 
                        {...field} 
                        className="focus:border-brand-blue focus:ring-brand-blue/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalFloors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Floors</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g., 10" 
                        {...field} 
                        className="focus:border-brand-blue focus:ring-brand-blue/30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-brand-blue/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bathroomOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="possession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Possession Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus:ring-brand-blue/30">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {possessionOptions.map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Collapsible 
              open={showAdvancedOptions} 
              onOpenChange={setShowAdvancedOptions}
              className="border rounded-lg p-4 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Advanced Details</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {showAdvancedOptions ? (
                      <ChevronUp className="h-4 w-4 mr-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-2" />
                    )}
                    {showAdvancedOptions ? "Hide" : "Show"}
                  </Button>
                </CollapsibleTrigger>
              </div>
              
              <CollapsibleContent className="mt-4 space-y-4">
                {listingType === 'buy' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="saleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="focus:ring-brand-blue/30">
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {saleTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ownership"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ownership</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="focus:ring-brand-blue/30">
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {ownershipTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                <FormField
                  control={form.control}
                  name="furnishing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Furnishing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-brand-blue/30">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {furnishingTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="focus:ring-brand-blue/30">
                            <SelectValue placeholder="Select Direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {facingOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Amenities</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {amenitiesOptions.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`amenity-${amenity}`} 
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                          className="data-[state=checked]:bg-brand-blue"
                        />
                        <label
                          htmlFor={`amenity-${amenity}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => form.reset()}
            disabled={submissionInProgress}
          >
            Reset Form
          </Button>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-brand-blue to-brand-darkBlue hover:opacity-90 transition-all duration-300 shadow-md"
            disabled={submissionInProgress}
          >
            {submissionInProgress ? (
              "Submitting..."
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> List Property
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PropertyListingForm;
