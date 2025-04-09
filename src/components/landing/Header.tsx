
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/user/auth')}>
            Sign In
          </Button>
          <Button 
            className="bg-brand-blue hover:bg-brand-darkBlue"
            onClick={() => navigate('/user/auth')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
