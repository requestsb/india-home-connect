
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileAudio, MapPin, Banknote, SquareAsterisk, ArrowRight, PlusCircle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

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
  callRecording?: string;
  userContact: {
    name: string;
    phone: string;
  };
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
    callRecording: 'https://example.com/recording1.mp3',
    userContact: {
      name: 'Rajesh S.',
      phone: '+91 98xxxxxx45',
    }
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
    callRecording: 'https://example.com/recording2.mp3',
    userContact: {
      name: 'Amit K.',
      phone: '+91 87xxxxxx23',
    }
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
    callRecording: 'https://example.com/recording3.mp3',
    userContact: {
      name: 'Priya T.',
      phone: '+91 95xxxxxx78',
    }
  },
];

const LEAD_PRICE = '₹99';

const RequestCard: React.FC<{ 
  request: RequestProps, 
  isSelected: boolean, 
  onSelect: (id: string, isSelected: boolean) => void 
}> = ({ request, isSelected, onSelect }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const isMobile = useIsMobile();

  const handlePurchaseLead = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsPurchased(true);
      toast({
        title: 'Lead purchased successfully!',
        description: 'You can now contact the property seeker directly.',
      });
    }, 1500);
  };

  return (
    <Card className="mb-4 border-l-4 border-l-brand-blue">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`select-${request.id}`} 
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(request.id, checked as boolean)}
              className="mr-2"
            />
            <CardTitle className="text-lg">{request.propertyType}</CardTitle>
          </div>
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
      <CardFooter className="pt-2 flex flex-wrap justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center mb-2 sm:mb-0">
              <FileAudio className="h-4 w-4 mr-1" /> Listen to Call
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Voice Recording Preview</DialogTitle>
              <DialogDescription>
                Listen to the full call recording to understand buyer's requirements
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-24">
                <audio controls className="w-full">
                  <source src={request.callRecording} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <p className="text-sm mb-1"><span className="font-medium">Name:</span> {isPurchased ? request.userContact.name : '●●●●● ●.'}</p>
                <p className="text-sm"><span className="font-medium">Phone:</span> {isPurchased ? request.userContact.phone : '+91 ●●●●●●●●●●'}</p>
              </div>
            </div>
            <DialogFooter>
              {!isPurchased ? (
                <Button 
                  onClick={handlePurchaseLead} 
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : `Purchase Full Access (${LEAD_PRICE})`}
                </Button>
              ) : (
                <Button variant="outline" className="text-brand-green">
                  Contact Buyer
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!isPurchased ? (
          <Button 
            size="sm" 
            className="bg-brand-green hover:bg-brand-green/90 text-white"
            onClick={handlePurchaseLead}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Purchase Lead (${LEAD_PRICE})`} <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button 
            size="sm" 
            variant="outline"
            className="text-brand-green border-brand-green"
          >
            Contact Now <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const MaskedRequests: React.FC = () => {
  const { toast } = useToast();
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  const handleSelectLead = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedLeads([...selectedLeads, id]);
    } else {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    }
  };
  
  const handleAddToCart = () => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select at least one lead to add to cart.",
        variant: "destructive"
      });
      return;
    }
    
    setCartItems([...cartItems, ...selectedLeads]);
    setSelectedLeads([]);
    
    toast({
      title: `${selectedLeads.length} leads added to cart`,
      description: "You can purchase them all at once from your cart.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-brand-blue">Matching Requests</h2>
        <div className="flex gap-3 flex-wrap">
          <Button 
            onClick={handleAddToCart}
            disabled={selectedLeads.length === 0} 
            className="bg-brand-blue hover:bg-brand-darkBlue"
            size={isMobile ? "sm" : "default"}
          >
            <PlusCircle className="h-4 w-4 mr-2" /> Add to Cart ({selectedLeads.length})
          </Button>
          <Button 
            variant="outline" 
            className="relative"
            size={isMobile ? "sm" : "default"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> 
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      {requests.map((request) => (
        <RequestCard 
          key={request.id} 
          request={request} 
          isSelected={selectedLeads.includes(request.id)}
          onSelect={handleSelectLead}
        />
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
