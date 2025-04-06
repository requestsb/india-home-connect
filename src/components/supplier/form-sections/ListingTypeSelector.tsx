
import React from 'react';
import { Card } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { PropertyListingFormValues } from '../types/propertyTypes';
import { bedroomOptions, buyCategories, rentCategories } from '../data/propertyOptions';

interface ListingTypeSelectorProps {
  form: UseFormReturn<PropertyListingFormValues>;
  listingType: 'buy' | 'rent';
  setListingType: (value: 'buy' | 'rent') => void;
  selectedCategory: string;
  handleCategorySelection: (category: string) => void;
}

const ListingTypeSelector: React.FC<ListingTypeSelectorProps> = ({
  form,
  listingType,
  setListingType,
  selectedCategory,
  handleCategorySelection
}) => {
  return (
    <Tabs 
      defaultValue={listingType} 
      className="w-full"
      onValueChange={(value) => setListingType(value as 'buy' | 'rent')}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {buyCategories.map((category) => (
            <Card 
              key={category} 
              className={`p-3 cursor-pointer transition-colors border ${
                selectedCategory === category 
                  ? 'bg-brand-lightBlue/30 border-brand-blue' 
                  : 'hover:bg-brand-lightBlue/20 border-brand-lightBlue/30'
              }`}
              onClick={() => handleCategorySelection(category)}
            >
              <div className="text-sm font-medium">{category}</div>
            </Card>
          ))}
        </div>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Bedrooms</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-brand-blue/30">
                      <SelectValue placeholder="Select Bedrooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bedroomOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="rent" className="border p-4 rounded-lg">
        <div className="text-sm text-muted-foreground mb-4">
          Choose from the following categories for rental properties:
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {rentCategories.map((category) => (
            <Card 
              key={category} 
              className={`p-3 cursor-pointer transition-colors border ${
                selectedCategory === category 
                  ? 'bg-brand-lightBlue/30 border-brand-blue' 
                  : 'hover:bg-brand-lightBlue/20 border-brand-lightBlue/30'
              }`}
              onClick={() => handleCategorySelection(category)}
            >
              <div className="text-sm font-medium">{category}</div>
            </Card>
          ))}
        </div>
        
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Bedrooms</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-brand-blue/30">
                      <SelectValue placeholder="Select Bedrooms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bedroomOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ListingTypeSelector;
