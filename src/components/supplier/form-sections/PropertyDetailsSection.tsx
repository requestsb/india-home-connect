
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { PropertyListingFormValues } from '../types/propertyTypes';
import { subPropertyTypes, bathroomOptions, possessionOptions } from '../data/propertyOptions';

interface PropertyDetailsSectionProps {
  form: UseFormReturn<PropertyListingFormValues>;
}

const PropertyDetailsSection: React.FC<PropertyDetailsSectionProps> = ({ form }) => {
  return (
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

        {/* Removed the duplicate Covered Area field that was here */}
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
    </div>
  );
};

export default PropertyDetailsSection;
