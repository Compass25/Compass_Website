import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const type = searchParams.get("type");

      // 1️⃣ Recovery link — redirect to reset-password with params
      if (type === "recovery") {
        navigate(`/auth/reset-password?${searchParams.toString()}`);
        return;
      }

      // 2️⃣ Normal login (Google, Email, etc.)
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        navigate("/auth/login");
        return;
      }

      // 3️⃣ Success → redirect to home
      navigate("/");
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return <p>Processing authentication...</p>;
}
