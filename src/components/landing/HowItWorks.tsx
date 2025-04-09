
import React from 'react';
import { Building, Search, MessageSquare } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
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
  );
};

export default HowItWorks;
