
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { PropertyListingFormValues } from '../types/propertyTypes';
import { 
  saleTypes, 
  ownershipTypes, 
  furnishingTypes, 
  facingOptions, 
  amenitiesOptions 
} from '../data/propertyOptions';

interface AdvancedDetailsSectionProps {
  form: UseFormReturn<PropertyListingFormValues>;
  listingType: 'buy' | 'rent';
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (show: boolean) => void;
  selectedAmenities: string[];
  toggleAmenity: (amenity: string) => void;
}

const AdvancedDetailsSection: React.FC<AdvancedDetailsSectionProps> = ({
  form,
  listingType,
  showAdvancedOptions,
  setShowAdvancedOptions,
  selectedAmenities,
  toggleAmenity
}) => {
  return (
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
  );
};

export default AdvancedDetailsSection;
