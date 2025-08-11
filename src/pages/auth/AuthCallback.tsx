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
        // Handle the fragment (#) or query params returned from OAuth redirect
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');

        if (access_token) {
          // If tokens are in the URL, set the session
          const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token: refresh_token || '',
          });

          if (error) {
            toast({
              title: 'Authentication Error',
              description: error.message,
              variant: 'destructive',
            });
            navigate('/auth/login');
            return;
          }

          toast({
            title: 'Welcome!',
            description: 'You have been successfully signed in.',
          });
          navigate('/');
          return;
        }

        // Fallback: try to get existing session
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          navigate('/auth/login');
          return;
        }

        toast({
          title: 'Welcome!',
          description: 'You have been successfully signed in.',
        });
        navigate('/');
      } catch (error) {
        console.error('Auth callback error:', error);
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
