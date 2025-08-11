import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [isValidating, setIsValidating] = useState(true);
  const [isValidResetLink, setIsValidResetLink] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // 🚫 Prevent auto-login from token
  useEffect(() => {
    supabase.auth.signOut().catch(() => {});
  }, []);

  // ✅ Validate recovery token without creating a session
  useEffect(() => {
    const validateRecoveryLink = async () => {
      try {
        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
          throw new Error("Supabase config missing");
        }

        // Check both hash (#access_token) and query (?access_token)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const queryAccessToken = searchParams.get("access_token");

        const token = hashParams.get("access_token") || queryAccessToken;
        const type = hashParams.get("type") || searchParams.get("type");

        if (type === "recovery" && token) {
          const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              apikey: SUPABASE_ANON_KEY,
            },
          });

          if (!res.ok) throw new Error("Invalid or expired token");

          setRecoveryToken(token);
          setIsValidResetLink(true);
        } else {
          throw new Error("Invalid reset link");
        }
      } catch (err) {
        toast({
          title: "Invalid Reset Link",
          description: "This password reset link is invalid or expired.",
          variant: "destructive",
        });
        navigate("/auth/login");
      } finally {
        setIsValidating(false);
      }
    };

    validateRecoveryLink();
  }, [searchParams, SUPABASE_URL, SUPABASE_ANON_KEY, navigate, toast]);

  // ✅ Submit new password without auto-login
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryToken) return;

    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${recoveryToken}`,
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to reset password");
      }

      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated. Please log in.",
      });

      window.location.hash = ""; // remove token from URL
      navigate("/auth/login");
    } catch (err: any) {
      toast({
        title: "Password Reset Failed",
        description: err.message || "Something went wrong.",
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

  if (!isValidResetLink) return null;

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
