import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { PropertyData } from './types/propertyTypes';
import { Loader2 } from 'lucide-react';

const PropertyTable: React.FC = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch all properties without filtering by user_id
        const { data, error } = await supabase
          .from('property')
          .select('*');
        
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
      } catch (err: any) {
        console.error('Error fetching properties:', err);
        setError(err.message || 'Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    // Set up realtime subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'property'
        },
        () => {
          // Refresh the data when changes occur
          fetchProperties();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
        <p className="text-muted-foreground">No properties have been listed yet.</p>
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
