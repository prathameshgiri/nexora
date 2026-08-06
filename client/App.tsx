import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Workspace from "./pages/Workspace";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/budget-planner" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/salary-slips" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/investments" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/financial-health" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/profile-settings" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            <Route path="/privacy-security" element={<ProtectedRoute><Workspace /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
