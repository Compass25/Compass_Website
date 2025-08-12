import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.hash
        ? window.location.hash.substring(1)
        : window.location.search
    );

    const type = params.get("type");
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    const handleAuth = async () => {
      if (type === "recovery" && accessToken && refreshToken) {
        // ✅ Set the recovery session
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error("Error setting recovery session:", error.message);
          navigate("/auth/login");
          return;
        }

        // ✅ Wait until session is confirmed
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate("/auth/reset-password");
        } else {
          console.error("Session not set after recovery.");
          navigate("/auth/login");
        }
        return;
      }

      // ✅ Normal sign-in handling
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      } else {
        navigate("/auth/login");
      }
    };

    handleAuth();
  }, [navigate]);

  return <p>Completing sign in...</p>;
}