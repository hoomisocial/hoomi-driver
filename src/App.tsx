import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "./components/BottomNav";
import PermissionsPage from "./pages/PermissionsPage";
import EarningsPage from "./pages/EarningsPage";
import JobsPage from "./pages/JobsPage";
import AccountPage from "./pages/AccountPage";
import JobOfferPage from "./pages/JobOfferPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Navigate to="/permissions" replace />} />
            <Route path="/permissions" element={<PermissionsPage />} />
            <Route path="/earnings" element={<EarningsPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/job-offer" element={<JobOfferPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
