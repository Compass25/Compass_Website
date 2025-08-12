import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState({});
const [isValidResetLink, setIsValidResetLink] = useState(false);
const [isValidating, setIsValidating] = useState(true);
  const [recoveryToken, setRecoveryToken] = useState<string | null>(null);
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
const { toast } = useToast();
const navigate = useNavigate();

  // ✅ Validate recovery link and set Supabase session
useEffect(() => {
const validateRecoveryToken = async () => {
try {
        const url = import.meta.env.VITE_SUPABASE_URL || window.location.origin;
        setSupabaseUrl(url);

        // Clear local/session storage to remove any lingering sessions
        localStorage.clear();
        sessionStorage.clear();

        // Extract recovery token from URL hash fragment only
const hashParams = new URLSearchParams(window.location.hash.substring(1));
const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
const type = hashParams.get('type');

        if (type === 'recovery' && accessToken) {
          const response = await fetch(`${url}/auth/v1/user`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || ''
            }
        if (type === 'recovery' && accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
});
          if (error) throw error;

          if (!response.ok) {
            throw new Error('Invalid recovery token');
          }

          setRecoveryToken(accessToken);
setIsValidResetLink(true);
} else {
throw new Error('Invalid recovery link');
@@ -69,8 +56,7 @@ const ResetPassword = () => {
}, [navigate, toast]);

const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const newErrors = {};
if (!password) {
newErrors.password = 'Password is required';
} else if (password.length < 8) {
@@ -89,39 +75,23 @@ const ResetPassword = () => {
return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e: React.FormEvent) => {
  // ✅ Update password using Supabase Auth
  const handleSubmit = async (e) => {
e.preventDefault();

    if (!validateForm() || !recoveryToken) return;
    if (!validateForm()) return;

setLoading(true);

try {
      const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${recoveryToken}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update password');
      }
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

toast({
title: 'Password Updated',
description: 'Your password has been successfully updated. Please log in with your new password.',
});

      // Clear URL hash to prevent reuse
      window.location.hash = '';

navigate('/auth/login');
    } catch (error: any) {
    } catch (error) {
toast({
title: 'Error',
description: error.message || 'An unexpected error occurred. Please try again.',
@@ -132,10 +102,9 @@ const ResetPassword = () => {
}
};

  const handleInputChange = (field: string, value: string) => {
  const handleInputChange = (field, value) => {
if (field === 'password') setPassword(value);
else setConfirmPassword(value);

if (errors[field]) {
setErrors(prev => ({ ...prev, [field]: '' }));
}
