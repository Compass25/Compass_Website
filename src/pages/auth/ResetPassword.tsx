import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidResetLink, setIsValidResetLink] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null);
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up broadcast channel for tab communication
    const channel = new BroadcastChannel('app-tabs');
    
    // Listen for messages from other tabs
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'CLOSE_OTHER_TABS' && event.data.source !== 'reset-password') {
        // This tab should close itself as it's not the reset password tab
        window.close();
      }
    };
    
    channel.addEventListener('message', handleMessage);
    
    // Broadcast message to close other tabs when reset password page loads
    const closeOtherTabs = () => {
      channel.postMessage({
        type: 'CLOSE_OTHER_TABS',
        source: 'reset-password',
        timestamp: Date.now()
      });
    };
    
    // Close other tabs immediately when this component mounts
    closeOtherTabs();
    
    // Also try to close any tabs that might have opened this page
    try {
      // If this window was opened by another window, close the opener
      if (window.opener && !window.opener.closed) {
        window.opener.close();
      }
    } catch (error) {
      // Silently fail if we can't close the opener due to security restrictions
      console.log('Could not close opener window due to security restrictions');
    }
    
    // Clean up broadcast channel on unmount
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  useEffect(() => {
    const validateRecoveryTokens = async () => {
      try {
        // Get Supabase URL from environment or current origin
        const url = import.meta.env.VITE_SUPABASE_URL || window.location.origin;
        setSupabaseUrl(url);

        // CRITICAL: Clear any existing Supabase session immediately
        // This prevents auto-login from recovery tokens
        try {
          await fetch(`${url}/auth/v1/logout`, {
            method: 'POST',
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ scope: 'local' })
          });
          
          // Also clear localStorage to ensure no session persists
          localStorage.removeItem(`sb-${url.split('//')[1]?.split('.')[0]}-auth-token`);
          sessionStorage.clear();
        } catch (clearError) {
          console.log('Session clear attempt completed');
        }

        // Parse URL hash for tokens (Supabase uses hash fragments)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        // Also check query parameters as fallback
        const queryAccessToken = searchParams.get('access_token');
        const queryType = searchParams.get('type');

        const finalAccessToken = accessToken || queryAccessToken;
        const finalType = type || queryType;

        if (finalType === 'recovery' && finalAccessToken) {
          // Validate the token by making a simple API call without establishing a session
          const response = await fetch(`${url}/auth/v1/user`, {
            headers: {
              'Authorization': `Bearer ${finalAccessToken}`,
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
            }
          });

          if (response.ok) {
            setRecoveryToken(finalAccessToken);
            setIsValidResetLink(true);
          } else {
            throw new Error('Invalid recovery token');
          }
        } else {
          throw new Error('Invalid recovery link');
        }
      } catch (error) {
        toast({
          title: 'Invalid Reset Link',
          description: 'This password reset link is invalid or has expired.',
          variant: 'destructive',
        });
        navigate('/auth/login');
      } finally {
        setIsValidating(false);
      }
    };

    validateRecoveryTokens();
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
    
    if (!validateForm() || !recoveryToken) {
      return;
    }

    setLoading(true);

    try {
      // Update password using direct API call to avoid any session creation
      const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${recoveryToken}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }

      toast({
        title: 'Password Updated',
        description: 'Your password has been successfully updated. Please log in with your new password.',
      });
      
      // Clear the URL hash to prevent reuse
      window.location.hash = '';
      
      navigate('/auth/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred. Please try again.',
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

  // Don't render the form until we have validated the reset link
  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="px-8 py-16 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Verifying reset link...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If validation failed, this component will have already navigated away
  if (!isValidResetLink) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-8">
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
