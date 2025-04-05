
import React from 'react';
import { Bell, MessageSquare, User, Menu, Settings, FileText, Wallet } from 'lucide-react';
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

const SupplierNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    // We'll navigate to the specified page when it exists
    alert(`${path} page will be implemented soon`);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <span className="ml-2 text-sm font-medium text-muted-foreground">Supplier</span>
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
                  onClick={() => handleNavigation('Profile')}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2" 
                  onClick={() => handleNavigation('Purchased Leads')}
                >
                  <FileText className="h-5 w-5" />
                  Purchased Leads
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2" 
                  onClick={() => handleNavigation('Wallet')}
                >
                  <Wallet className="h-5 w-5" />
                  Wallet
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2" 
                  onClick={() => handleNavigation('Settings')}
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start gap-2 text-red-500" 
                  onClick={handleLogout}
                >
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
              5
            </span>
          </Button>

          <Button variant="outline" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
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
                <div className="rounded-full bg-brand-orange w-8 h-8 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">AP</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Amit Properties</p>
                  <p className="text-xs text-muted-foreground">amit@properties.in</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('Profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('Purchased Leads')}>Purchased Leads</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('Settings')}>Settings</DropdownMenuItem>
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

export default SupplierNavbar;
