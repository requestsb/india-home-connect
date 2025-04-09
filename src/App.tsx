
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import UserAuthPage from "./pages/UserAuthPage";
import SupplierAuthPage from "./pages/SupplierAuthPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/user/auth" element={<UserAuthPage />} />
          <Route path="/supplier/auth" element={<SupplierAuthPage />} />
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/supplier/dashboard" element={<SupplierDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
