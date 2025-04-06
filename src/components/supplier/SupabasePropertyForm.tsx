
import React, { useState } from 'react';
import PropertyListingForm from './PropertyListingForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const SupabasePropertyForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to list a property.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Prepare data for submission
      const propertyData = {
        ...formData,
        user_id: user.id,
        created_at: new Date().toISOString(),
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
        
        // You can add additional actions here, like redirecting to the property listing
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
