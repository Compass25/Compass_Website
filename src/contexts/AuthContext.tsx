import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          toast({
            title: 'Authentication Error',
            description: error.message,
            variant: 'destructive',
          });
          navigate('/auth/login');
          return;
        }

        // Check if user is coming from a password reset link
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');

        if (type === 'recovery') {
          // Redirect to reset password page
          navigate('/auth/reset-password');
          return;
        }

        if (data.session) {
          toast({
            title: 'Welcome!',
            description: 'You have been successfully signed in.',
          });
          navigate('/');
        } else {
          navigate('/auth/login');
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/auth/login');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
