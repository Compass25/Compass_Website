import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
interface AdminLoginProps {
  onLogin: () => void;
}
const AdminLogin: React.FC<AdminLoginProps> = ({
  onLogin
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check credentials
    if (username === 'Admin' && password === 'Admin6099') {
      // Store admin session in localStorage
      localStorage.setItem('adminLoggedIn', 'true');
      onLogin();
      toast({
        title: 'Success',
        description: 'Welcome to the admin panel!'
      });
    } else {
      toast({
        title: 'Error',
        description: 'Invalid username or password',
        variant: 'destructive'
      });
    }
    setLoading(false);
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-50 px-[16px]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>;
};
export default AdminLogin;