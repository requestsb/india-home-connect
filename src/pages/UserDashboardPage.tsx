import React, { useRef } from 'react';
import UserNavbar from '@/components/layout/UserNavbar';
import PropertyRequestForm from '@/components/user/propertyRequest';
import ActiveChats from '@/components/user/ActiveChats';
import StatsCard from '@/components/dashboard/StatsCard';
import { Building, MessageSquare, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RequestList from '@/components/user/RequestList';

const UserDashboardPage: React.FC = () => {
  const requestsRef = useRef<HTMLDivElement>(null);

  const scrollToRequests = () => {
    if (requestsRef.current) {
      requestsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <UserNavbar onMyRequestsClick={scrollToRequests} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-brand-darkBlue">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard 
            title="Active Requests" 
            value="3"
            change={{ value: "20%", positive: true }}
            icon={<Building className="h-4 w-4 text-brand-blue" />}
            className="bg-gradient-to-br from-white to-brand-lightBlue/30 border-0 shadow-md hover:shadow-lg transition-all duration-300"
          />
          <StatsCard 
            title="Supplier Matches" 
            value="5"
            change={{ value: "10%", positive: true }}
            icon={<UserCheck className="h-4 w-4 text-brand-green" />}
            className="bg-gradient-to-br from-white to-brand-lightGreen/30 border-0 shadow-md hover:shadow-lg transition-all duration-300"
          />
          <StatsCard 
            title="Active Conversations" 
            value="2"
            change={{ value: "5%", positive: false }}
            icon={<MessageSquare className="h-4 w-4 text-brand-orange" />}
            className="bg-gradient-to-br from-white to-brand-lightBlue/20 border-0 shadow-md hover:shadow-lg transition-all duration-300"
          />
        </div>
        
        <div ref={requestsRef}>
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="mb-6 flex flex-wrap bg-white shadow-sm">
              <TabsTrigger 
                value="requests" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-blue/10 data-[state=active]:to-brand-blue/5 data-[state=active]:text-brand-blue data-[state=active]:shadow-sm text-base px-8 py-4 hover:bg-slate-100 font-medium transition-all"
              >
                <span className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  My Requests
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="chats" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-green/10 data-[state=active]:to-brand-green/5 data-[state=active]:text-brand-green data-[state=active]:shadow-sm text-base px-8 py-4 hover:bg-slate-100 font-medium transition-all"
              >
                <span className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Active Chats
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-orange/10 data-[state=active]:to-brand-orange/5 data-[state=active]:text-brand-orange data-[state=active]:shadow-sm text-base px-8 py-4 hover:bg-slate-100 font-medium transition-all"
              >
                <span className="flex items-center">
                  <UserCheck className="mr-2 h-5 w-5" />
                  New Request
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests">
              <RequestList />
            </TabsContent>
            
            <TabsContent value="chats">
              <ActiveChats />
            </TabsContent>
            
            <TabsContent value="new">
              <div className="max-w-2xl mx-auto">
                <PropertyRequestForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserDashboardPage;
