import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppFooter from "@/components/AppFooter";
import Home from "./pages/Home";
import PlanTrip from "./pages/PlanTrip";
import BusList from "./pages/BusList";
import LiveMap from "./pages/LiveMap";
import ScanQR from "./pages/ScanQR";
import OfflineSMS from "./pages/OfflineSMS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plan-trip" element={<PlanTrip />} />
              <Route path="/buses" element={<BusList />} />
              <Route path="/live-map/:busNumber" element={<LiveMap />} />
              <Route path="/scan-qr" element={<ScanQR />} />
              <Route path="/offline" element={<OfflineSMS />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <AppFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
