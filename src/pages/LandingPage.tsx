
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Building, Search, FileAudio, Users, MessageSquare } from 'lucide-react';
import Logo from '@/components/Logo';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Find Your Perfect Property Without The Search
              </h1>
              <p className="text-xl mb-8 text-gray-700">
                Submit your property requirements and let the suppliers come to you. No more endless scrolling through listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-brand-blue hover:bg-brand-darkBlue"
                  onClick={() => navigate('/user/auth')}
                >
                  I'm looking for property
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/supplier/auth')}
                >
                  I'm a property supplier
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                alt="Modern apartment building" 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How ReQuest Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Your Request</h3>
                <p className="text-gray-600">
                  Specify exactly what you're looking for - location, budget, size, and all your requirements.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="text-gray-600">
                  Our system matches your request with property suppliers who have exactly what you need.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Directly</h3>
                <p className="text-gray-600">
                  Chat with property suppliers who have purchased your lead and can satisfy your requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* For Suppliers Section */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">For Property Suppliers</h2>
                <p className="text-xl mb-6">
                  Access high-quality leads from serious property seekers who match your portfolio.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <FileAudio className="h-5 w-5 text-brand-orange" />
                    </div>
                    <span>Listen to call recordings to understand exact requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <Users className="h-5 w-5 text-brand-orange" />
                    </div>
                    <span>Only pay for leads that match your property portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-1">
                      <MessageSquare className="h-5 w-5 text-brand-orange" />
                    </div>
                    <span>Connect directly with serious buyers and renters</span>
                  </li>
                </ul>
                <Button 
                  size="lg" 
                  className="bg-brand-orange hover:bg-amber-500 text-white"
                  onClick={() => navigate('/supplier/auth')}
                >
                  Register as a Supplier
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Real estate professional" 
                  className="rounded-xl shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Logo />
              <p className="mt-4 max-w-xs text-gray-400">
                Connecting property seekers with the right suppliers across India.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">For Users</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">How it Works</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Submit a Request</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">For Suppliers</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Benefits</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center md:text-left">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} ReQuest India. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
