
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FileAudio, Users, MessageSquare } from 'lucide-react';

const SupplierSection: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default SupplierSection;
