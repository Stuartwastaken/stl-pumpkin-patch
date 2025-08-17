import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PackageDetail from "./pages/PackageDetail";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

const queryClient = new QueryClient();

const TrackPageViews = () => {
	const location = useLocation();
	useEffect(() => {
		trackPageView(location.pathname + location.search);
	}, [location.pathname, location.search]);
	return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <TrackPageViews />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/packages/:packageId" element={<PackageDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
