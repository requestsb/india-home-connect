
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Building, Phone } from 'lucide-react';

interface ChatItem {
  id: string;
  supplierName: string;
  company: string;
  propertyType: string;
  location: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
}

const chats: ChatItem[] = [
  {
    id: '1',
    supplierName: 'Vikram Singh',
    company: 'VS Realty',
    propertyType: '3 BHK Apartment',
    location: 'Powai, Mumbai',
    lastMessage: 'I have a property that matches your requirements perfectly. When can we schedule a viewing?',
    time: '10:45 AM',
    unread: 2,
  },
  {
    id: '2',
    supplierName: 'Priya Mehta',
    company: 'Prime Properties',
    propertyType: '3 BHK Apartment',
    location: 'Powai, Mumbai',
    lastMessage: 'Hello, I saw your request. I have something that might interest you.',
    time: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    supplierName: 'Rahul Joshi',
    company: 'Horizon Homes',
    propertyType: '3 BHK Apartment',
    location: 'Powai, Mumbai',
    lastMessage: 'The property is available for possession in 3 months. Let me know if you have any other questions.',
    time: '2 days ago',
    unread: 0,
  },
];

const ChatItem: React.FC<{ chat: ChatItem }> = ({ chat }) => {
  return (
    <div className="p-4 border-b cursor-pointer hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={chat.avatar} alt={chat.supplierName} />
          <AvatarFallback className="bg-brand-orange text-white">
            {chat.supplierName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <div className="font-medium">{chat.supplierName}</div>
            <div className="text-xs text-muted-foreground">{chat.time}</div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <Building className="h-3 w-3 mr-1" />
            {chat.company}
          </div>
          
          <div className="text-sm font-medium mb-1">
            {chat.propertyType} in {chat.location}
          </div>
          
          <div className="text-sm text-muted-foreground truncate">
            {chat.lastMessage}
          </div>
        </div>
        
        {chat.unread > 0 && (
          <div className="bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
            {chat.unread}
          </div>
        )}
      </div>
    </div>
  );
};

const ActiveChats: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Active Conversations</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
        
        {chats.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">You don't have any active conversations yet.</p>
            <Button className="bg-brand-blue hover:bg-brand-darkBlue">Create a Property Request</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveChats;
