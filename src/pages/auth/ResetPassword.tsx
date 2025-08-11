import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validatingLink, setValidatingLink] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleRecoverySession = async () => {
      try {
        setValidatingLink(true);
        
        // Check if this is a recovery type request
        const type = searchParams.get('type');
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');
        
        if (type !== 'recovery') {
          toast({
            title: 'Invalid Reset Link',
            description: 'This is not a valid password reset link.',
            variant: 'destructive',
          });
          navigate('/auth/login');
          return;
        }

        if (!accessToken || !refreshToken) {
          toast({
            title: 'Invalid Reset Link',
            description: 'This password reset link is missing required parameters.',
            variant: 'destructive',
          });
          navigate('/auth/login');
          return;
        }

        // Set the session but don't auto-login the user to the app
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          toast({
            title: 'Invalid Reset Link',
            description: 'This password reset link is invalid or has expired.',
            variant: 'destructive',
          });
          navigate('/auth/login');
          return;
        }

        // Verify this is actually a recovery session by checking the session metadata
        if (!data.session.user.recovery_sent_at && !data.session.user.email_confirmed_at) {
          toast({
            title: 'Invalid Reset Link',
            description: 'This password reset link is invalid.',
            variant: 'destructive',
          });
          navigate('/auth/login');
          return;
        }

        setValidatingLink(false);
      } catch (error) {
        console.error('Recovery session error:', error);
        toast({
          title: 'Invalid Reset Link',
          description: 'This password reset link is invalid or has expired.',
          variant: 'destructive',
        });
        navigate('/auth/login');
      }
    };

    handleRecoverySession();
  }, [searchParams, navigate, toast]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Sign out the user immediately after password update
      // This ensures they need to log in with their new password
      await supabase.auth.signOut();

      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully updated. Please sign in with your new password.',
      });
      
      // Navigate to login page
      navigate('/auth/login');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'password') {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Show loading state while validating the reset link
  if (validatingLink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Validating reset link...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Set New Password
            </h1>
            <p className="text-gray-600">
              Enter your new password below
            </p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button
                  onClick={() => navigate('/auth/login')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  disabled={loading}
                >
                  Sign In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
