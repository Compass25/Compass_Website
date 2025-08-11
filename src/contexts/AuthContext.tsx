import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    // Your profile fetching logic here
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const isRecovery =
          typeof window !== "undefined" &&
          window.location.search.includes("type=recovery");

        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);

          if (isRecovery) {
            // If the login is from a recovery link, go to reset password page
            navigate("/auth/reset-password");
          } else {
            // Normal login goes home
            navigate("/");
          }
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      });
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{ profile, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
