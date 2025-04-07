
import React, { useState, useEffect } from 'react';
import PropertyListingForm from './PropertyListingForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupabasePropertyForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  const handleFormSubmit = async (formData: any) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to list a property.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for submission
      const propertyData = {
        ...formData,
        user_id: user.id,
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

  const handleLoginRedirect = () => {
    navigate('/supplier/auth');
  };
  
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-brand-blue border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTitle className="text-amber-800 font-medium">Authentication Required</AlertTitle>
        <AlertDescription className="text-amber-700">
          <p className="mb-4">You must be logged in to list a property. Please sign in to your supplier account first.</p>
          <div className="flex justify-end">
            <Button 
              onClick={handleLoginRedirect}
              className="bg-gradient-to-r from-brand-blue to-brand-darkBlue hover:opacity-90 transition-all duration-300 shadow-md"
            >
              <LogIn className="h-4 w-4 mr-2" /> Sign In
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <PropertyListingForm 
      onExternalSubmit={handleFormSubmit}
      isExternalSubmitting={isSubmitting}
    />
  );
};

export default SupabasePropertyForm;
