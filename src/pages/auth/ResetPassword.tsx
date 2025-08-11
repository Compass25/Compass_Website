import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; // your Supabase client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [isValidating, setIsValidating] = useState(true);
  const [isValidResetLink, setIsValidResetLink] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null);
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // ✅ Prevent Supabase from auto-logging in with token
  useEffect(() => {
    supabase.auth.signOut().catch(() => {});
  }, []);

  // ✅ Validate recovery link without creating a session
  useEffect(() => {
    const validateRecoveryTokens = async () => {
      try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        if (!url) throw new Error("Supabase URL not set");
        setSupabaseUrl(url);

        // Extract from hash fragment (#access_token) or query params (?access_token)
        const hashParams = new URLSearchParams(
          typeof window !== "undefined"
            ? window.location.hash.substring(1)
            : ""
        );
        const accessToken = hashParams.get("access_token");
        const type = hashParams.get("type");

        const queryAccessToken = searchParams.get("access_token");
        const queryType = searchParams.get("type");

        const finalAccessToken = accessToken || queryAccessToken;
        const finalType = type || queryType;

        if (finalType === "recovery" && finalAccessToken) {
          // Call Supabase REST API to verify token without creating session
          const response = await fetch(`${url}/auth/v1/user`, {
            headers: {
              Authorization: `Bearer ${finalAccessToken}`,
              apikey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
            },
          });

          if (response.ok) {
            setRecoveryToken(finalAccessToken);
            setIsValidResetLink(true);
          } else {
            throw new Error("Invalid recovery token");
          }
        } else {
          throw new Error("Invalid recovery link");
        }
      } catch {
        toast({
          title: "Invalid Reset Link",
          description: "This password reset link is invalid or has expired.",
          variant: "destructive",
        });
        navigate("/auth/login");
      } finally {
        setIsValidating(false);
      }
    };

    validateRecoveryTokens();
  }, [searchParams, navigate, toast]);

  // ✅ Handle password reset submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryToken) return;

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${recoveryToken}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been updated. Please log in again.",
        });

        // ✅ Redirect to login after clearing token
        if (typeof window !== "undefined") {
          window.location.hash = "";
        }
        navigate("/auth/login");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error: any) {
      toast({
        title: "Password Reset Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isValidating) {
    return (
      <div className="flex items-center justify-center h-screen">
        Validating reset link...
      </div>
    );
  }

  if (!isValidResetLink) {
    return null; // Already redirected
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold mb-4">Reset Your Password</h1>
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full mt-4">
          Update Password
        </Button>
      </form>
    </div>
  );
}
