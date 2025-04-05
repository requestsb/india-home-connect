
import React, { useRef } from 'react';
import UserNavbar from '@/components/layout/UserNavbar';
import PropertyRequestForm from '@/components/user/PropertyRequestForm';
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserNavbar onMyRequestsClick={scrollToRequests} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard 
            title="Active Requests" 
            value="3"
            change={{ value: "20%", positive: true }}
            icon={<Building className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard 
            title="Supplier Matches" 
            value="5"
            change={{ value: "10%", positive: true }}
            icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard 
            title="Active Conversations" 
            value="2"
            change={{ value: "5%", positive: false }}
            icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        
        <div ref={requestsRef}>
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="requests">My Requests</TabsTrigger>
              <TabsTrigger value="chats">Active Chats</TabsTrigger>
              <TabsTrigger value="new">New Request</TabsTrigger>
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
