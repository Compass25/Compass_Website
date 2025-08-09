import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import GoogleButton from '@/components/auth/GoogleButton';
import EmailPasswordForm from '@/components/auth/EmailPasswordForm';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { ArrowLeft } from "lucide-react";
const Signup = () => {
  const {
    user,
    signInWithGoogle
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  if (user) {
    return <Navigate to={from} replace />;
  }
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <Link to="/" className="flex items-center space-x-3">
                <Logo className="h-10 w-10" />
                
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Join Compass
            </h1>
            <p className="text-gray-600">
              Create your account to start exploring amazing destinations
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <EmailPasswordForm mode="signup" />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or sign up with</span>
                </div>
              </div>
              
              <GoogleButton onClick={handleGoogleSignUp} loading={loading}>
                {loading ? 'Creating account...' : 'Sign up with Google'}
              </GoogleButton>
              
              <div className="text-xs text-gray-500 text-center leading-relaxed">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>
              
            <div className="text-center">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 text-gray-800 hover:text-gray-600"
                style={{ fontSize: "14px" }}
              >
              <ArrowLeft style={{ width: "16px", height: "14px" }} />
              <span>Back to Home</span>
              </Link>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Signup;
