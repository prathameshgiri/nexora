import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppDataProvider } from "./context/AppDataContext";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Lenis from "lenis";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}

function AppDataWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return <AppDataProvider key={user?.id || 'guest'}>{children}</AppDataProvider>;
}

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#f7faf8]"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1f9b78] border-t-transparent"></div></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/budget-planner" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/salary-slips" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/investments" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/financial-health" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/profile-settings" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/privacy-security" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/ai-coach" element={<ProtectedRoute><PageWrapper><Workspace /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin/bwpg" element={<PageWrapper><Admin /></PageWrapper>} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" attribute="class">
      <SmoothScroll>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppDataWrapper>
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <AnimatedRoutes />
            </ErrorBoundary>
          </BrowserRouter>
        </AppDataWrapper>
      </TooltipProvider>
      </AuthProvider>
      </SmoothScroll>
    </ThemeProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
