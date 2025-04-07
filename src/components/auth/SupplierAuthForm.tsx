
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Logo from '../Logo';
import { supabase } from "@/integrations/supabase/client";

const SupplierAuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    phone: '',
    supplierType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, supplierType: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "You've successfully signed in",
      });
      
      navigate('/supplier/dashboard');
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name || !formData.supplierType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            company: formData.company,
            phone: formData.phone,
            supplier_type: formData.supplierType,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      // Update profile if needed
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ supplier_type: formData.supplierType })
        .eq('id', data.user?.id);
      
      if (profileError) {
        console.error("Error updating profile:", profileError);
      }
      
      toast({
        title: "Account created!",
        description: "Your supplier account has been created successfully",
      });
      
      navigate('/supplier/dashboard');
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Property Supplier</CardTitle>
            <CardDescription className="text-center">
              Connect with property seekers who match your portfolio
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-darkBlue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company Name"
                      required
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Select onValueChange={handleSelectChange} value={formData.supplierType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Supplier Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Property Owner</SelectItem>
                        <SelectItem value="agent">Real Estate Agent</SelectItem>
                        <SelectItem value="broker">Property Broker</SelectItem>
                        <SelectItem value="builder">Builder/Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-brand-darkBlue"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        <div className="mt-4 text-center text-sm">
          <a href="/user/auth" className="text-brand-blue hover:underline">
            Looking for a property? Sign in as a user
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupplierAuthForm;
