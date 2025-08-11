// src/pages/auth/AuthCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();

      // Check URL for type query
      const params = new URLSearchParams(window.location.hash.replace('#', '?'));
      const type = params.get('type');

      console.log('Auth callback type:', type);

      if (type === 'recovery') {
        // Reset password flow
        console.log('Redirecting to reset password page...');
        navigate('/auth/reset-password');
      } 
      else if (session && user) {
        // Normal login (Google Auth etc.)
        console.log('Logged in, redirecting to home...');
        navigate('/');
      } 
      else {
        console.log('No session, redirecting to login...');
        navigate('/auth/login');
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return <p>Processing authentication...</p>;
};

export default AuthCallback;
