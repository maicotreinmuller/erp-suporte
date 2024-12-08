import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import Clients from "./pages/Clients";
import ServiceOrders from "./pages/ServiceOrders";
import Purchases from "./pages/Purchases";
import Schedule from "./pages/Schedule";
import DataManagement from "./pages/DataManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/service-orders" element={<ServiceOrders />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/data-management" element={<DataManagement />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;