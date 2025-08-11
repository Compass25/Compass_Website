import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = searchParams.get("access_token");

      if (!token) {
        setError("Invalid or missing access token.");
        setLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.api.updateUser(token, {
        password,
      });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      // Sign out to prevent auto-login after password reset
      await supabase.auth.signOut();

      // Redirect to login with success message
      navigate("/auth/login", {
        state: { message: "Password updated successfully. Please log in again." },
      });
    } catch {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
