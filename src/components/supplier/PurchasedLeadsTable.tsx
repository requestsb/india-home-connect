
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Lead {
  id: string;
  customerName: string;
  contact: string;
  propertyType: string;
  location: string;
  budget: string;
  status: 'new' | 'contacted' | 'viewing' | 'negotiating' | 'closed' | 'lost';
  purchaseDate: string;
}

const leads: Lead[] = [
  {
    id: '1',
    customerName: 'Ananya Sharma',
    contact: '+91 98765 43210',
    propertyType: '3 BHK Apartment',
    location: 'Powai, Mumbai',
    budget: '₹1.8 Cr',
    status: 'new',
    purchaseDate: '2 days ago',
  },
  {
    id: '2',
    customerName: 'Ravi Kumar',
    contact: '+91 87654 32109',
    propertyType: '2 BHK Apartment',
    location: 'Indiranagar, Bangalore',
    budget: '₹92 Lakh',
    status: 'contacted',
    purchaseDate: '5 days ago',
  },
  {
    id: '3',
    customerName: 'Priyanka Patel',
    contact: '+91 76543 21098',
    propertyType: 'Commercial Space',
    location: 'Gurugram, Delhi NCR',
    budget: '₹1.2 Cr',
    status: 'viewing',
    purchaseDate: '1 week ago',
  },
  {
    id: '4',
    customerName: 'Deepak Verma',
    contact: '+91 65432 10987',
    propertyType: 'Villa',
    location: 'Koramangala, Bangalore',
    budget: '₹2.5 Cr',
    status: 'negotiating',
    purchaseDate: '2 weeks ago',
  },
  {
    id: '5',
    customerName: 'Sneha Reddy',
    contact: '+91 54321 09876',
    propertyType: '4 BHK Apartment',
    location: 'Worli, Mumbai',
    budget: '₹4.8 Cr',
    status: 'closed',
    purchaseDate: '3 weeks ago',
  },
];

const PurchasedLeadsTable: React.FC = () => {
  const isMobile = useIsMobile();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-purple-100 text-purple-800';
      case 'viewing':
        return 'bg-amber-100 text-amber-800';
      case 'negotiating':
        return 'bg-indigo-100 text-indigo-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isMobile) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Purchased Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{lead.customerName}</h3>
                    <p className="text-sm text-muted-foreground">{lead.contact}</p>
                  </div>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </div>
                <div className="mb-3">
                  <p className="text-sm">{lead.propertyType}</p>
                  <p className="text-xs text-muted-foreground">{lead.location} • {lead.budget}</p>
                  <p className="text-xs text-muted-foreground mt-1">Purchased: {lead.purchaseDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" /> Chat
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" /> Call
                  </Button>
                </div>
              </Card>
            ))}
            
            {leads.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground mb-4">You haven't purchased any leads yet.</p>
                <p className="text-sm text-muted-foreground">Browse matching requests to find potential customers.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Purchased Leads</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Property Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Purchased</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{lead.customerName}</div>
                    <div className="text-sm text-muted-foreground">{lead.contact}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{lead.propertyType}</div>
                    <div className="text-sm text-muted-foreground">{lead.location}</div>
                    <div className="text-sm">{lead.budget}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{lead.purchaseDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" /> Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" /> Call
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {leads.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven't purchased any leads yet.</p>
            <p className="text-sm text-muted-foreground">Browse matching requests to find potential customers.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PurchasedLeadsTable;
