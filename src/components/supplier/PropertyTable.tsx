
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Define the property type based on the database schema
type Property = {
  id: number;
  title: string;
  description: string | null;
  "Property Type": string | null;
  sub_property_type: string | null;
  property_category: string | null;
  listing_type: string | null;
  price: number | null;
  locality: string | null;
  city: string | null;
  "Covered Area (sq.ft)": number | null;
  "Floor Number": number | null;
  "Total Floors": number | null;
  "Possession Status": string | null;
  sale_type: string | null;
  ownership: string | null;
  furnishing: string | null;
  Bathrooms: number | null;
  facing: string | null;
  bedrooms: string | null;
  amenities: string[] | null;
  created_at: string;
  user_id: string | null;
};

// Define the match criteria type
type MatchCriteria = {
  key: string;
  label: string;
  matched: boolean;
  value: string | number | null;
};

const PropertyTable: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Example search criteria for matching (in a real app, this would come from user input)
  const searchCriteria = {
    "Property Type": "Apartment",
    city: "Mumbai",
    bedrooms: "2",
    price: 5000000, // Max price for buy properties
    amenities: ["Gym", "Swimming Pool"],
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data, error } = await supabase
          .from('property')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          setProperties(data);
        }
      } catch (error: any) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error fetching properties",
          description: error.message,
          variant: "destructive",
        });
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
        (payload) => {
          console.log('Realtime update:', payload);
          fetchProperties(); // Refetch the data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // Function to evaluate match criteria for a property
  const evaluateMatchCriteria = (property: Property): MatchCriteria[] => {
    const criteria: MatchCriteria[] = [];

    // Check Property Type match
    criteria.push({
      key: "propertyType",
      label: "Property Type",
      matched: property["Property Type"] === searchCriteria["Property Type"],
      value: property["Property Type"],
    });

    // Check city match
    criteria.push({
      key: "city",
      label: "City",
      matched: property.city === searchCriteria.city,
      value: property.city,
    });

    // Check bedrooms match
    criteria.push({
      key: "bedrooms",
      label: "Bedrooms",
      matched: property.bedrooms === searchCriteria.bedrooms,
      value: property.bedrooms,
    });

    // Check price match (below or equal to the search criteria)
    criteria.push({
      key: "price",
      label: "Price",
      matched: property.price !== null && property.price <= searchCriteria.price,
      value: property.price,
    });

    // Check amenities match (at least one amenity matches)
    const amenitiesMatch = property.amenities !== null && 
      searchCriteria.amenities.some(amenity => 
        property.amenities?.includes(amenity)
      );
    criteria.push({
      key: "amenities",
      label: "Amenities",
      matched: amenitiesMatch,
      value: property.amenities?.join(", ") || "",
    });

    return criteria;
  };

  // Function to get the number of matched criteria
  const getMatchCount = (matchCriteria: MatchCriteria[]): number => {
    return matchCriteria.filter(criteria => criteria.matched).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 text-brand-blue animate-spin" />
        <span className="ml-2 text-brand-darkBlue">Loading properties...</span>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-lg text-muted-foreground">No properties found. List your first property to see it here.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableCaption>A list of your properties</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Property Type</TableHead>
            <TableHead>Listing Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Bedrooms</TableHead>
            <TableHead>Bathrooms</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Match Criteria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => {
            const matchCriteria = evaluateMatchCriteria(property);
            const matchCount = getMatchCount(matchCriteria);
            
            return (
              <TableRow key={property.id}>
                <TableCell>{property.id}</TableCell>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property["Property Type"]}</TableCell>
                <TableCell>
                  <Badge variant={property.listing_type === 'buy' ? 'default' : 'outline'}>
                    {property.listing_type === 'buy' ? 'Sale' : 'Rent'}
                  </Badge>
                </TableCell>
                <TableCell>₹{property.price?.toLocaleString() || 'N/A'}</TableCell>
                <TableCell>{property.locality ? `${property.locality}, ${property.city}` : property.city}</TableCell>
                <TableCell>{property["Covered Area (sq.ft)"] || 'N/A'} sq.ft</TableCell>
                <TableCell>{property.bedrooms || 'N/A'}</TableCell>
                <TableCell>{property.Bathrooms || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(property.created_at).toLocaleDateString('en-IN')}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {matchCount} of {matchCriteria.length} criteria matched
                    </div>
                    <div className="text-xs space-y-1">
                      {matchCriteria.map((criteria) => (
                        <div key={criteria.key} className="flex items-center">
                          <span className={`w-2 h-2 rounded-full ${criteria.matched ? 'bg-green-500' : 'bg-red-500'} mr-1`}></span>
                          <span className={criteria.matched ? 'text-green-700' : 'text-red-700'}>
                            {criteria.label}: {criteria.value?.toString() || 'N/A'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};

export default PropertyTable;
