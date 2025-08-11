
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface EmailPasswordFormProps {
  mode: 'login' | 'signup';
  onSuccess?: () => void;
}

const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({ mode, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (mode === 'signup' && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (mode === 'signup' && !/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain both letters and numbers';
    }

    // Full name validation for signup
    if (mode === 'signup' && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const redirectUrl = `${window.location.origin}/auth/callback`;
        
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: formData.fullName,
            }
          }
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: 'Account Already Exists',
              description: 'An account with this email already exists. Please sign in instead.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Signup Error',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Account Created!',
            description: 'Please check your inbox to verify your email before logging in.',
          });
          onSuccess?.();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Login Failed',
              description: 'Invalid email or password.',
              variant: 'destructive',
            });
          } else if (error.message.includes('Email not confirmed')) {
            toast({
              title: 'Email Not Verified',
              description: 'Please verify your email before logging in.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Login Error',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have been successfully signed in.',
          });
          onSuccess?.();
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && (
            <p className="text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder={mode === 'signup' ? 'Create a password (min. 8 characters)' : 'Enter your password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === 'signup' ? 'Creating Account...' : 'Signing In...'}
          </>
        ) : (
          mode === 'signup' ? 'Create Account' : 'Sign In'
        )}
      </Button>
    </form>
  );
};

export default EmailPasswordForm;
