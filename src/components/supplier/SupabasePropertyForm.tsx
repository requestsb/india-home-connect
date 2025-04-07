
import React, { useState } from 'react';
import PropertyListingForm from './PropertyListingForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const SupabasePropertyForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // Get current user if logged in, or use a default user ID
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || 'anonymous-user';
      
      // Prepare data for submission
      const propertyData = {
        ...formData,
        user_id: userId,
        "Property Type": formData.propertyType,
        sub_property_type: formData.subPropertyType,
        "Floor Number": formData.floor ? parseFloat(formData.floor) : null,
        "Total Floors": formData.totalFloors ? parseFloat(formData.totalFloors) : null,
        "Covered Area (sq.ft)": formData.coverArea ? parseFloat(formData.coverArea) : null,
        Bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
        "Possession Status": formData.possession,
        price: formData.price ? parseFloat(formData.price) : null,
        listing_type: formData.listingType,
        created_at: new Date().toISOString(),
        supplier_type: formData.supplierType,
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('property')
        .insert(propertyData)
        .select();
      
      if (error) {
        console.error("Error submitting property:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to submit property. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Your property has been listed successfully!",
          variant: "default",
        });
        
        console.log("Property submitted successfully:", data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PropertyListingForm 
      onExternalSubmit={handleFormSubmit}
      isExternalSubmitting={isSubmitting}
    />
  );
};

export default SupabasePropertyForm;
