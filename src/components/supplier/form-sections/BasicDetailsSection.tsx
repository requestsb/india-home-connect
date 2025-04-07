
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { PropertyListingFormValues, priceRangeOptions, areaRangeOptions } from '../types/propertyTypes';
import { cities, cityLocalities } from '../data/propertyOptions';

interface BasicDetailsSectionProps {
  form: UseFormReturn<PropertyListingFormValues>;
  listingType: 'buy' | 'rent';
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  availableLocalities: string[];
  priceRangeOptions: {
    buy: string[];
    rent: string[];
  };
  areaRangeOptions: string[];
}

const BasicDetailsSection: React.FC<BasicDetailsSectionProps> = ({
  form,
  listingType,
  selectedCity,
  setSelectedCity,
  availableLocalities,
  priceRangeOptions,
  areaRangeOptions
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormLabel>Property Title</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., 3BHK Apartment in Malad West" 
                {...field} 
                className="focus:border-brand-blue focus:ring-brand-blue/30"
              />
            </FormControl>
            <FormDescription>
              Auto-generated based on bedrooms, locality and city
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormLabel>Property Description</FormLabel>
            <FormControl>
              <textarea 
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-brand-blue focus:ring-brand-blue/30 min-h-[120px] resize-y"
                placeholder="Describe your property in detail..." 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Auto-generated based on property details and amenities
            </FormDescription>
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
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedCity(value);
                }} 
                defaultValue={field.value}
              >
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
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={!selectedCity}
              >
                <FormControl>
                  <SelectTrigger className="focus:ring-brand-blue/30">
                    <SelectValue placeholder={selectedCity ? "Select Locality" : "Select City First"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableLocalities.map((locality) => (
                    <SelectItem key={locality} value={locality}>{locality}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-brand-blue/30">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listingType === 'buy' ? (
                    priceRangeOptions.buy.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))
                  ) : (
                    priceRangeOptions.rent.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Select a budget range for better matching with buyer requirements
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="coverArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Area Range</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="focus:ring-brand-blue/30">
                  <SelectValue placeholder="Select area range" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {areaRangeOptions.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Select an area range for your property
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="seoMetaTitle"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>SEO Meta Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Meta title for search engines" 
                  {...field} 
                  className="focus:border-brand-blue focus:ring-brand-blue/30"
                />
              </FormControl>
              <FormDescription>
                Auto-generated based on property details (for search engine visibility)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seoMetaDescription"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>SEO Meta Description</FormLabel>
              <FormControl>
                <textarea 
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-brand-blue focus:ring-brand-blue/30 min-h-[80px] resize-y"
                  placeholder="Meta description for search engines" 
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Auto-generated based on property details and price (for search engine visibility)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicDetailsSection;
