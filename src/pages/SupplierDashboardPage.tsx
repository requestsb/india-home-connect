import React, { useState } from 'react';
import SupplierNavbar from '@/components/layout/SupplierNavbar';
import MaskedRequests from '@/components/supplier/MaskedRequests';
import PurchasedLeadsTable from '@/components/supplier/PurchasedLeadsTable';
import SupabasePropertyForm from '@/components/supplier/SupabasePropertyForm';
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

  const handleCartClick = () => {
    // We'll navigate to cart page when it exists
    alert('Cart page will be implemented soon');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SupplierNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-brand-darkBlue">Supplier Dashboard</h1>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
            <Card className="flex items-center px-4 py-2 gap-2 bg-gradient-to-r from-brand-lightBlue to-brand-lightGreen border-0 shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto">
              <Wallet className="h-5 w-5 text-brand-blue" />
              <div>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="font-semibold">₹{walletBalance.toLocaleString()}</p>
              </div>
            </Card>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-brand-blue to-brand-darkBlue hover:opacity-90 transition-all duration-300 shadow-md w-full sm:w-auto" size="default">
                  <Plus className="h-4 w-4 mr-2" /> Add Money
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
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
                      className="border-slate-300 focus:border-brand-blue focus:ring-brand-blue/30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[500, 1000, 5000, 10000].map((amount) => (
                      <Button 
                        key={amount} 
                        variant="outline" 
                        onClick={() => setAddAmount(amount.toString())}
                        className="hover:bg-brand-lightBlue/20 border-slate-200"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button 
                    onClick={handleAddToWallet} 
                    className="bg-gradient-to-r from-brand-green to-brand-green/80 hover:opacity-90 w-full sm:w-auto"
                  >
                    Add to Wallet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              className="relative bg-white hover:bg-slate-50 border border-slate-200 shadow-md w-full sm:w-auto" 
              size="default" 
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-4 w-4 mr-2 text-brand-orange" /> 
              Cart
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-brand-orange to-brand-warmAccent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                3
              </span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            title="Matching Requests" 
            value="12"
            change={{ value: "30%", positive: true }}
            icon={<FileText className="h-4 w-4 text-brand-blue" />}
          />
          <StatsCard 
            title="Purchased Leads" 
            value="5"
            icon={<Users className="h-4 w-4 text-brand-darkBlue" />}
          />
          <StatsCard 
            title="Conversion Rate" 
            value="40%"
            change={{ value: "5%", positive: true }}
            icon={<Percent className="h-4 w-4 text-brand-green" />}
          />
          <StatsCard 
            title="Properties Listed" 
            value="8"
            icon={<Building className="h-4 w-4 text-brand-orange" />}
          />
        </div>
        
        <Tabs defaultValue="matching" className="w-full">
          <TabsList className="mb-6 flex flex-wrap bg-white shadow-sm">
            <TabsTrigger 
              value="matching" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue/10 data-[state=active]:to-brand-blue/5 data-[state=active]:text-brand-blue data-[state=active]:shadow-sm"
            >
              Matching Requests
            </TabsTrigger>
            <TabsTrigger 
              value="purchased" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-green/10 data-[state=active]:to-brand-green/5 data-[state=active]:text-brand-green data-[state=active]:shadow-sm"
            >
              Purchased Leads
            </TabsTrigger>
            <TabsTrigger 
              value="list-property" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-orange/10 data-[state=active]:to-brand-orange/5 data-[state=active]:text-brand-orange data-[state=active]:shadow-sm"
            >
              List Property
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="matching">
            <MaskedRequests />
          </TabsContent>
          
          <TabsContent value="purchased">
            <PurchasedLeadsTable />
          </TabsContent>
          
          <TabsContent value="list-property">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-brand-darkBlue mb-6">List Your Property</h2>
              <SupabasePropertyForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SupplierDashboardPage;
