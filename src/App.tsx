import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams, Outlet } from "react-router-dom"; 
import { useEffect } from "react"; 
import { TravelProvider } from "@/contexts/TravelContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import DestinationDetail from "./pages/DestinationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AuthCallback from "./pages/auth/AuthCallback";
import ResetPassword from "./pages/auth/ResetPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

// Auto-redirect for Supabase recovery links
function RedirectRecovery() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "recovery" && window.location.pathname !== "/auth/reset-password") {
      navigate(`/auth/reset-password?${searchParams.toString()}`, { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
}

// Layout for all public pages
function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet /> {/* ⬅ This is where nested routes will render */}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TravelProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RedirectRecovery />
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />

              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="packages" element={<Packages />} />
                <Route path="package/:id" element={<PackageDetail />} />
                <Route path="destinations/:id" element={<DestinationDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route 
                  path="admin" 
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TravelProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
