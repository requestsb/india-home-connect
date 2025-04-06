
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Plus, RotateCcw } from 'lucide-react';
import { PropertyListingFormValues, PropertyListingFormProps } from './types/propertyTypes';
import { cityLocalities } from './data/propertyOptions';
import ListingTypeSelector from './form-sections/ListingTypeSelector';
import BasicDetailsSection from './form-sections/BasicDetailsSection';
import PropertyDetailsSection from './form-sections/PropertyDetailsSection';
import AdvancedDetailsSection from './form-sections/AdvancedDetailsSection';

const PropertyListingForm: React.FC<PropertyListingFormProps> = ({ 
  onExternalSubmit,
  isExternalSubmitting = false
}) => {
  const { toast } = useToast();
  const [listingType, setListingType] = useState<'buy' | 'rent'>('buy');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [availableLocalities, setAvailableLocalities] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

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
      bedrooms: '',
      amenities: [],
    },
  });

  // Update localities when city changes
  useEffect(() => {
    if (selectedCity && cityLocalities[selectedCity as keyof typeof cityLocalities]) {
      setAvailableLocalities(cityLocalities[selectedCity as keyof typeof cityLocalities]);
      form.setValue('locality', ''); // Reset locality when city changes
    } else {
      setAvailableLocalities([]);
    }
  }, [selectedCity, form]);

  const handleFormReset = () => {
    form.reset();
    setSelectedAmenities([]);
    setSelectedCategory('');
    setSelectedCity('');
    setAvailableLocalities([]);
    setShowAdvancedOptions(false);
  };

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
        
        handleFormReset();
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
    setSelectedCategory('');
  };
  
  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'Ready to Move') {
      form.setValue('possession', 'Ready to Move');
    } else if (category === 'Furnished Homes') {
      form.setValue('furnishing', 'Furnished');
    } else if (category === 'Immediately Available') {
      form.setValue('possession', 'Immediately Available');
    }
  };

  const submissionInProgress = isExternalSubmitting || isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ListingTypeSelector 
              form={form}
              listingType={listingType}
              setListingType={handleListingTypeChange}
              selectedCategory={selectedCategory}
              handleCategorySelection={handleCategorySelection}
            />

            <BasicDetailsSection 
              form={form}
              listingType={listingType}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              availableLocalities={availableLocalities}
            />
          </div>

          <div className="space-y-6">
            <PropertyDetailsSection form={form} />

            <AdvancedDetailsSection 
              form={form}
              listingType={listingType}
              showAdvancedOptions={showAdvancedOptions}
              setShowAdvancedOptions={setShowAdvancedOptions}
              selectedAmenities={selectedAmenities}
              toggleAmenity={toggleAmenity}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleFormReset}
            disabled={submissionInProgress}
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Reset Form
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
