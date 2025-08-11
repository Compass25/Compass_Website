import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const type = searchParams.get('type');

      if (type === 'recovery') {
        // Redirect to reset password page, keep recovery token in URL
        navigate(`/reset-password?${searchParams.toString()}`);
        return;
      }

      // Handle other auth callback types (OAuth, email confirmation, etc.)
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session) {
        navigate('/');
      } else {
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return <p>Processing...</p>;
};

export default AuthCallback;
