
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileAudio, MapPin, Banknote, SquareAsterisk, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface RequestProps {
  id: string;
  propertyType: string;
  location: string;
  budget: string;
  area: string;
  requestType: 'buy' | 'rent';
  matchScore: number;
  date: string;
  requirements: string;
}

const requests: RequestProps[] = [
  {
    id: '1',
    propertyType: '3 BHK Apartment',
    location: 'Powai, Mumbai',
    budget: '₹1.8 Cr',
    area: '1450 sq.ft',
    requestType: 'buy',
    matchScore: 95,
    date: '2 days ago',
    requirements: 'Looking for a property with garden view, 24x7 security, and good connectivity to Eastern Express Highway.',
  },
  {
    id: '2',
    propertyType: 'Commercial Space',
    location: 'Whitefield, Bangalore',
    budget: '₹85 Lakh',
    area: '1200 sq.ft',
    requestType: 'buy',
    matchScore: 80,
    date: '5 days ago',
    requirements: 'Need a commercial space with good frontage, parking space, and suitable for retail business.',
  },
  {
    id: '3',
    propertyType: '2 BHK Apartment',
    location: 'Gurgaon, Delhi NCR',
    budget: '₹45,000/month',
    area: '1050 sq.ft',
    requestType: 'rent',
    matchScore: 75,
    date: '1 day ago',
    requirements: 'Looking for a furnished apartment with gym and swimming pool in society. Preferred for 2 year lease.',
  },
];

const RequestCard: React.FC<{ request: RequestProps }> = ({ request }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchaseLead = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Lead purchased successfully!',
        description: 'You can now contact the property seeker directly.',
      });
    }, 1500);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{request.propertyType}</CardTitle>
          <Badge className="bg-brand-blue text-white">
            {request.matchScore}% Match
          </Badge>
        </div>
        <CardDescription>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {request.location}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
          <div className="flex items-center">
            <Banknote className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{request.budget}</span>
          </div>
          <div className="flex items-center">
            <SquareAsterisk className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{request.area}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          "{request.requirements}"
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              <FileAudio className="h-4 w-4 mr-1" /> Listen to Call Recording
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Voice Recording Preview</DialogTitle>
              <DialogDescription>
                Listen to a 30-second preview of the buyer's requirements
              </DialogDescription>
            </DialogHeader>
            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-24">
              <p className="text-muted-foreground">Audio player would appear here</p>
            </div>
            <DialogFooter>
              <Button onClick={handlePurchaseLead} className="bg-brand-orange hover:bg-amber-500">
                Purchase Full Access
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button 
          size="sm" 
          className="bg-brand-orange hover:bg-amber-500"
          onClick={handlePurchaseLead}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Purchase Lead'} <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const MaskedRequests: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Matching Requests</h2>
      </div>
      
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
      
      {requests.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No matching requests found.</p>
          <p className="text-sm text-muted-foreground">Update your property portfolio to receive matching requests.</p>
        </Card>
      )}
    </div>
  );
};

export default MaskedRequests;
