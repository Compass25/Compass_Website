import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTravelContext, TravelPackage } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';
import BudgetManager from '@/components/BudgetManager';
import PackageForm from '@/components/admin/PackageForm';
import PackageList from '@/components/admin/PackageList';
import ContactForm from '@/components/admin/ContactForm';
import { LogOut, Loader2 } from 'lucide-react';
const Admin = () => {
  const {
    isAdminLoggedIn,
    loading,
    login,
    logout
  } = useAdminAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }

  // Show login form if not authenticated
  if (!isAdminLoggedIn) {
    return <AdminLogin onLogin={login} />;
  }

  // Show admin panel if authenticated
  return <AdminPanel onLogout={logout} />;
};
const AdminPanel: React.FC<{
  onLogout: () => void;
}> = ({
  onLogout
}) => {
  const {
    budgetOptions,
    loading
  } = useTravelContext();
  const {
    toast
  } = useToast();
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const [newPackage, setNewPackage] = useState<Omit<TravelPackage, 'id'>>({
    title: '',
    destination: '',
    duration: '',
    description: '',
    price: '',
    currency: 'INR',
    type: 'Budget',
    tags: [],
    images: [''],
    itinerary: [{
      day: 1,
      title: '',
      description: ''
    }],
    inclusions: [''],
    exclusions: [''],
    featured: false
  });
  const handleEditPackage = (pkg: TravelPackage) => {
    setNewPackage({
      title: pkg.title,
      destination: pkg.destination,
      duration: pkg.duration,
      description: pkg.description || '',
      price: pkg.price,
      currency: pkg.currency || 'INR',
      type: pkg.type,
      tags: pkg.tags || [],
      images: pkg.images?.length > 0 ? pkg.images : [''],
      itinerary: pkg.itinerary || [{
        day: 1,
        title: '',
        description: ''
      }],
      inclusions: pkg.inclusions || [''],
      exclusions: pkg.exclusions || [''],
      featured: pkg.featured || false
    });
    setEditingPackage(pkg.id);
    toast({
      title: 'Edit Mode',
      description: 'Package loaded for editing. Make your changes and click "Update Package".'
    });
  };
  const handleCancelEdit = () => {
    setEditingPackage(null);
    setNewPackage({
      title: '',
      destination: '',
      duration: '',
      description: '',
      price: '',
      currency: 'INR',
      type: 'Budget',
      tags: [],
      images: [''],
      itinerary: [{
        day: 1,
        title: '',
        description: ''
      }],
      inclusions: [''],
      exclusions: [''],
      featured: false
    });
  };
  const handlePackageSubmitted = () => {
    setEditingPackage(null);
    setNewPackage({
      title: '',
      destination: '',
      duration: '',
      description: '',
      price: '',
      currency: 'INR',
      type: budgetOptions[0]?.name || 'Budget',
      tags: [],
      images: [''],
      itinerary: [{
        day: 1,
        title: '',
        description: ''
      }],
      inclusions: [''],
      exclusions: [''],
      featured: false
    });
  };
  if (loading) {
    return <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>;
  }
  return <div className="pt-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-3xl font-bold gradient-text sm:text-3xl">Admin Panel</h1>
              <p className="text-gray-600">Manage travel packages and site content</p>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="w-full flex flex-wrap sm:grid sm:grid-cols-3 gap-1 h-auto p-1 mb-8">
            <TabsTrigger value="packages" className="flex-1 min-w-fit whitespace-nowrap">
              Manage Packages
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex-1 min-w-fit whitespace-nowrap">
              Budget Options
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex-1 min-w-fit whitespace-nowrap">
              Contact Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <PackageForm editingPackage={editingPackage} onCancelEdit={handleCancelEdit} onPackageSubmitted={handlePackageSubmitted} initialPackage={newPackage} setInitialPackage={setNewPackage} />
              <PackageList onEditPackage={handleEditPackage} />
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <div className="max-w-2xl mx-auto">
              <BudgetManager />
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default Admin;