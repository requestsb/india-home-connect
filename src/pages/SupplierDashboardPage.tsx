
import React from 'react';
import SupplierNavbar from '@/components/layout/SupplierNavbar';
import MaskedRequests from '@/components/supplier/MaskedRequests';
import PurchasedLeadsTable from '@/components/supplier/PurchasedLeadsTable';
import StatsCard from '@/components/dashboard/StatsCard';
import { FileText, Users, Building, DollarSign, Percent } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupplierDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SupplierNavbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Supplier Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            title="Lead Value" 
            value="₹25,000"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        <Tabs defaultValue="matching" className="w-full">
          <TabsList className="mb-6">
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
