import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import GoogleButton from '@/components/auth/GoogleButton';
import EmailPasswordForm from '@/components/auth/EmailPasswordForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { ArrowLeft } from "lucide-react";
const Login = () => {
  const {
    user,
    signInWithGoogle
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  if (user) {
    return <Navigate to={from} replace />;
  }
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
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
            <h1 className="text-2xl text-gray-900 mb-2 font-bold">
              {showForgotPassword ? 'Reset Password' : 'Join Compass'}
            </h1>
            {!showForgotPassword && <p className="text-gray-600">
                Sign in to access your travel experience
              </p>}
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            {showForgotPassword ? <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} /> : <div className="space-y-6">
                <EmailPasswordForm mode="login" />
                
                <div className="text-center">
                  <Button variant="ghost" onClick={() => setShowForgotPassword(true)} className="text-sm text-primary hover:text-primary/80">
                    Forgot your password?
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>
                
                <GoogleButton onClick={handleGoogleSignIn} loading={loading}>
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </GoogleButton>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/auth/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Sign up here
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
              </div>}
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Login;
