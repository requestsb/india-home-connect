
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { PropertyListingFormValues } from '../types/propertyTypes';
import { cities, cityLocalities } from '../data/propertyOptions';

interface BasicDetailsSectionProps {
  form: UseFormReturn<PropertyListingFormValues>;
  listingType: 'buy' | 'rent';
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  availableLocalities: string[];
}

const BasicDetailsSection: React.FC<BasicDetailsSectionProps> = ({
  form,
  listingType,
  selectedCity,
  setSelectedCity,
  availableLocalities
}) => {
  return (
    <div className="space-y-6">
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
  );
};

export default BasicDetailsSection;
