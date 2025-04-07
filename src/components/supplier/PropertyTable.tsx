
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { PropertyData } from './types/propertyTypes';
import { Loader2, LogIn } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PropertyTable: React.FC = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsCheckingAuth(false);
        if (session?.user) {
          fetchProperties(session.user.id);
        }
      }
    );
    
    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsCheckingAuth(false);
      if (session?.user) {
        fetchProperties(session.user.id);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProperties = async (userId: string) => {
    try {
      // Fetch properties for the current user
      const { data, error } = await supabase
        .from('property')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      
      // Process data to add match criteria and map to PropertyData structure
      const processedData = data?.map(property => {
        // Add match criteria
        const matchCriteria = {
          matches: [] as string[],
          nonMatches: [] as string[]
        };
        
        // Simulate some matching logic
        if (property.bedrooms) matchCriteria.matches.push('Bedrooms');
        else matchCriteria.nonMatches.push('Bedrooms');
        
        if (property.locality) matchCriteria.matches.push('Locality');
        else matchCriteria.nonMatches.push('Locality');
        
        if (property.price && property.price > 0) matchCriteria.matches.push('Price');
        else matchCriteria.nonMatches.push('Price');
        
        if (property["Covered Area (sq.ft)"]) matchCriteria.matches.push('Area');
        else matchCriteria.nonMatches.push('Area');
        
        if (property.amenities && property.amenities.length > 0) matchCriteria.matches.push('Amenities');
        else matchCriteria.nonMatches.push('Amenities');
        
        // Map data structure to match PropertyData interface
        return {
          id: property.id,
          title: property.title || 'Untitled Property',
          price: property.price || 0,
          city: property.city || '',
          locality: property.locality || '',
          "Property Type": property["Property Type"] || '',
          bedrooms: property.bedrooms || '',
          bathrooms: property.Bathrooms || 0, // Map Bathrooms to bathrooms
          "Covered Area (sq.ft)": property["Covered Area (sq.ft)"] || 0,
          created_at: property.created_at,
          listing_type: property.listing_type || '',
          "Possession Status": property["Possession Status"] || '',
          user_id: property.user_id || '',
          supplierType: property.supplier_type || '', // Map supplier_type to supplierType
          description: property.description || '',
          amenities: property.amenities || [],
          matchCriteria
        } as PropertyData;
      }) || [];
      
      setProperties(processedData);
      setLoading(false);
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'Failed to load properties');
      setLoading(false);
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
          <p className="mb-4">You must be logged in to view your properties. Please sign in to your supplier account first.</p>
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't listed any properties yet.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your listed properties</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Match Criteria</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell className="font-medium">{property.title || 'Untitled Property'}</TableCell>
            <TableCell>{property["Property Type"] || property.bedrooms || 'Unknown'}</TableCell>
            <TableCell>{property.locality}, {property.city}</TableCell>
            <TableCell>₹{property.price?.toLocaleString() || 'N/A'}</TableCell>
            <TableCell>{property["Covered Area (sq.ft)"] || 'N/A'} sq.ft</TableCell>
            <TableCell>
              <Badge variant={property["Possession Status"] === "Ready to Move" ? "success" : "info"}>
                {property["Possession Status"] || 'Not Specified'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {property.matchCriteria?.matches.map(match => (
                  <Badge key={match} variant="success" className="mr-1 mb-1">
                    {match} ✓
                  </Badge>
                ))}
                {property.matchCriteria?.nonMatches.map(nonMatch => (
                  <Badge key={nonMatch} variant="warning" className="mr-1 mb-1">
                    {nonMatch} ✗
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropertyTable;
