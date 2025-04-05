
import React, { useState } from 'react';
import { Bell, MessageSquare, User, Menu, X, Settings, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface UserNavbarProps {
  onMyRequestsClick?: () => void;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ onMyRequestsClick }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleSettingsClick = () => {
    // We'll navigate to settings page when it exists
    alert('Settings page will be implemented soon');
  };

  const handleProfileClick = () => {
    // We'll navigate to profile page when it exists
    alert('Profile page will be implemented soon');
  };

  const handleMyRequestsClick = () => {
    if (onMyRequestsClick) {
      onMyRequestsClick();
    } else {
      navigate('/user/requests');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2" 
                  onClick={handleProfileClick}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2" 
                  onClick={handleMyRequestsClick}
                >
                  <FileText className="h-5 w-5" />
                  My Requests
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2" 
                  onClick={handleSettingsClick}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2 text-red-500" 
                  onClick={handleLogout}
                >
                  <X className="h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          <Button variant="outline" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="rounded-full bg-brand-blue w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">RK</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Rahul Kumar</p>
                  <p className="text-xs text-muted-foreground">rahul@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleMyRequestsClick}>My Requests</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsClick}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
