
import React, { useState } from 'react';
import SupplierNavbar from '@/components/layout/SupplierNavbar';
import MaskedRequests from '@/components/supplier/MaskedRequests';
import PurchasedLeadsTable from '@/components/supplier/PurchasedLeadsTable';
import StatsCard from '@/components/dashboard/StatsCard';
import { FileText, Users, Building, Wallet, Percent, Plus, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const SupplierDashboardPage: React.FC = () => {
  const { toast } = useToast();
  const [walletBalance, setWalletBalance] = useState(5000);
  const [addAmount, setAddAmount] = useState('');
  const isMobile = useIsMobile();
  
  const handleAddToWallet = () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to add to your wallet.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setWalletBalance(prevBalance => prevBalance + amount);
      setAddAmount('');
      toast({
        title: "Amount added successfully",
        description: `₹${amount} has been added to your wallet.`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SupplierNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-darkBlue">Supplier Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 flex-wrap">
            <Card className="flex items-center px-4 py-2 gap-2 bg-white">
              <Wallet className="h-5 w-5 text-brand-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="font-semibold">₹{walletBalance.toLocaleString()}</p>
              </div>
            </Card>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-brand-blue hover:bg-brand-darkBlue" size={isMobile ? "sm" : "default"}>
                  <Plus className="h-4 w-4 mr-2" /> Add Money
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Money to Wallet</DialogTitle>
                  <DialogDescription>
                    Enter the amount you would like to add to your wallet.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">Amount (₹)</label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="1000"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[500, 1000, 5000, 10000].map((amount) => (
                      <Button 
                        key={amount} 
                        variant="outline" 
                        onClick={() => setAddAmount(amount.toString())}
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button onClick={handleAddToWallet} className="bg-brand-green hover:bg-brand-green/90">
                    Add to Wallet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="relative" size={isMobile ? "sm" : "default"}>
              <ShoppingCart className="h-4 w-4 mr-2" /> 
              Cart
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Matching Requests" 
            value="12"
            change={{ value: "30%", positive: true }}
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard 
            title="Purchased Leads" 
            value="5"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard 
            title="Conversion Rate" 
            value="40%"
            change={{ value: "5%", positive: true }}
            icon={<Percent className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard 
            title="Properties Listed" 
            value="8"
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        <Tabs defaultValue="matching" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="matching">Matching Requests</TabsTrigger>
            <TabsTrigger value="purchased">Purchased Leads</TabsTrigger>
          </TabsList>
          
          <TabsContent value="matching">
            <MaskedRequests />
          </TabsContent>
          
          <TabsContent value="purchased">
            <PurchasedLeadsTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SupplierDashboardPage;
