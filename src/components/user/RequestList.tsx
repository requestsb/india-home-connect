
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Edit, Trash2 } from 'lucide-react';

interface RequestProps {
  id: string;
  propertyType: string;
  location: string;
  budget: string;
  area: string;
  status: 'active' | 'matching' | 'expired';
  matches: number;
  date: string;
}

const requests: RequestProps[] = [
  {
    id: '1',
    propertyType: '3 BHK Apartment',
    location: 'Powai, Mumbai',
    budget: '₹1.8 Cr',
    area: '1450 sq.ft',
    status: 'matching',
    matches: 3,
    date: '2 days ago',
  },
  {
    id: '2',
    propertyType: 'Commercial Space',
    location: 'Whitefield, Bangalore',
    budget: '₹85 Lakh',
    area: '1200 sq.ft',
    status: 'active',
    matches: 0,
    date: '5 days ago',
  },
  {
    id: '3',
    propertyType: '2 BHK Apartment',
    location: 'Gurgaon, Delhi NCR',
    budget: '₹75 Lakh',
    area: '1050 sq.ft',
    status: 'expired',
    matches: 2,
    date: '2 weeks ago',
  },
];

const RequestCard: React.FC<{ request: RequestProps }> = ({ request }) => {
  const statusColor = {
    active: 'bg-blue-100 text-blue-800',
    matching: 'bg-green-100 text-green-800',
    expired: 'bg-gray-100 text-gray-800',
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{request.propertyType}</CardTitle>
          <Badge className={statusColor[request.status]}>
            {request.status === 'matching' ? `${request.matches} Matches` : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
        </div>
        <CardDescription>{request.location}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Budget:</span> {request.budget}
          </div>
          <div>
            <span className="text-muted-foreground">Area:</span> {request.area}
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Requested:</span> {request.date}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-500">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
        {request.status === 'matching' && (
          <Button size="sm" className="bg-brand-blue hover:bg-brand-darkBlue">
            <MessageSquare className="h-4 w-4 mr-1" /> View Matches
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const RequestList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Property Requests</h2>
        <Button className="bg-brand-blue hover:bg-brand-darkBlue">New Request</Button>
      </div>
      
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
      
      {requests.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">You haven't submitted any property requests yet.</p>
          <Button className="bg-brand-blue hover:bg-brand-darkBlue">Create Your First Request</Button>
        </Card>
      )}
    </div>
  );
};

export default RequestList;
