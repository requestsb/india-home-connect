
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserAuthPage from "./pages/UserAuthPage";
import SupplierAuthPage from "./pages/SupplierAuthPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import SupplierDashboardPage from "./pages/SupplierDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/user/auth" element={<UserAuthPage />} />
          <Route path="/supplier/auth" element={<SupplierAuthPage />} />
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/supplier/dashboard" element={<SupplierDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
