
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { PropertyListingFormValues } from '../types/propertyTypes';

const supplierTypes = [
  'Broker',
  'Real Estate Agent',
  'Flat Owner',
  'Builder',
  'Property Manager',
  'Developer'
];

interface SupplierTypeSelectorProps {
  form: UseFormReturn<PropertyListingFormValues>;
}

const SupplierTypeSelector: React.FC<SupplierTypeSelectorProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-brand-darkBlue">Your Role</h3>
      <FormField
        control={form.control}
        name="supplierType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>I am a</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="focus:ring-brand-blue/30">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {supplierTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SupplierTypeSelector;
