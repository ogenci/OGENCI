import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, Suspense, lazy } from "react";

function CursorManager() {
  useEffect(() => {
    const updateCursor = () => {
      // Robust check: No touch support AND has a fine pointer (mouse) AND large screen
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasMouse = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.innerWidth >= 1024;
      
      const isDesktop = !isTouch && hasMouse && isLargeScreen;
      
      if (isDesktop) {
        document.documentElement.classList.add("desktop-custom-cursor-mode");
      } else {
        document.documentElement.classList.remove("desktop-custom-cursor-mode");
      }
    };
    
    updateCursor();
    window.addEventListener('resize', updateCursor);
    return () => window.removeEventListener('resize', updateCursor);
  }, []);
  return null;
}

const Home = lazy(() => import("@/pages/Home"));
const WorkPage = lazy(() => import("@/pages/WorkPage"));
const NotFound = lazy(() => import("@/pages/not-found"));
import CustomCursor from "@/components/CustomCursor";

import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/BookingModal";
import { useBooking } from "@/context/BookingContext";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Router() {
  const { isModalOpen, closeModal } = useBooking();

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[hsl(77,100%,38%)] border-t-transparent animate-spin" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">Loading OGENCI...</span>
        </div>
      </div>
    }>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/work/:slug" component={WorkPage} />
        <Route component={NotFound} />
      </Switch>
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingProvider>
          <WouterRouter base={
            import.meta.env.BASE_URL.startsWith("/") && import.meta.env.BASE_URL !== "/"
              ? import.meta.env.BASE_URL.replace(/\/$/, "")
              : window.location.pathname.startsWith("/OGENCI")
              ? "/OGENCI"
              : ""
          }>
            <CursorManager />
            <CustomCursor />
            <Router />
          </WouterRouter>
        </BookingProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
