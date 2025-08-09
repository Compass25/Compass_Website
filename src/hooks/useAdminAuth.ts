
import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminLoggedIn(adminLoggedIn);
    setLoading(false);
  }, []);

  const login = () => {
    localStorage.setItem('adminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdminLoggedIn(false);
  };

  return {
    isAdminLoggedIn,
    loading,
    login,
    logout
  };
};
