
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  description?: string;
  price: string;
  currency?: string;
  type: string;
  tags: string[];
  images: string[];
  itinerary: Array<{
    day: string | number;
    title: string;
    description: string;
  }>;
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
}

export interface BudgetOption {
  id: string;
  name: string;
}

export interface PhoneInfo {
  name: string;
  number: string;
}

export interface ContactInfo {
  id: string;
  phones: PhoneInfo[];
  address: string;
}

interface TravelContextType {
  packages: TravelPackage[];
  budgetOptions: BudgetOption[];
  contactInfo: ContactInfo | null;
  loading: boolean;
  addPackage: (packageData: Omit<TravelPackage, 'id'>) => Promise<void>;
  updatePackage: (id: string, packageData: Omit<TravelPackage, 'id'>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  addBudgetOption: (name: string) => Promise<void>;
  updateBudgetOption: (id: string, name: string) => Promise<void>;
  deleteBudgetOption: (id: string) => Promise<void>;
  updateContactInfo: (contactData: Omit<ContactInfo, 'id'>) => Promise<void>;
  refreshPackages: () => Promise<void>;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const useTravelContext = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravelContext must be used within a TravelProvider');
  }
  return context;
};

export const TravelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [budgetOptions, setBudgetOptions] = useState<BudgetOption[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPackages();
    fetchBudgetOptions();
    fetchContactInfo();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPackages: TravelPackage[] = data.map(pkg => ({
        id: pkg.id,
        title: pkg.title,
        destination: pkg.destination,
        duration: pkg.duration,
        description: pkg.description || '',
        price: pkg.price,
        currency: pkg.currency || 'INR',
        type: pkg.type,
        tags: Array.isArray(pkg.tags) ? pkg.tags : [],
        images: Array.isArray(pkg.images) ? pkg.images : [],
        itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary.map((item: any) => ({
          day: item.day || '',
          title: item.title || '',
          description: item.description || ''
        })) : [],
        inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
        exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
        featured: pkg.featured || false
      }));

      setPackages(formattedPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch packages',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgetOptions = async () => {
    try {
      const { data, error } = await supabase
        .from('budget_options')
        .select('*')
        .order('name');

      if (error) throw error;
      setBudgetOptions(data || []);
    } catch (error) {
      console.error('Error fetching budget options:', error);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setContactInfo({
          id: data.id,
          phones: Array.isArray(data.phones) ? data.phones.map((phone: any) => ({
            name: phone.name || '',
            number: phone.number || ''
          })) : [],
          address: data.address
        });
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const addPackage = async (packageData: Omit<TravelPackage, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .insert([{
          title: packageData.title,
          destination: packageData.destination,
          duration: packageData.duration,
          description: packageData.description,
          price: packageData.price,
          currency: packageData.currency || 'INR',
          type: packageData.type,
          tags: packageData.tags,
          images: packageData.images,
          itinerary: packageData.itinerary,
          inclusions: packageData.inclusions,
          exclusions: packageData.exclusions,
          featured: packageData.featured
        }])
        .select()
        .single();

      if (error) throw error;
      await fetchPackages();
    } catch (error) {
      console.error('Error adding package:', error);
      toast({
        title: 'Error',
        description: 'Failed to add package',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const updatePackage = async (id: string, packageData: Omit<TravelPackage, 'id'>) => {
    try {
      const { error } = await supabase
        .from('packages')
        .update({
          title: packageData.title,
          destination: packageData.destination,
          duration: packageData.duration,
          description: packageData.description,
          price: packageData.price,
          currency: packageData.currency || 'INR',
          type: packageData.type,
          tags: packageData.tags,
          images: packageData.images,
          itinerary: packageData.itinerary,
          inclusions: packageData.inclusions,
          exclusions: packageData.exclusions,
          featured: packageData.featured
        })
        .eq('id', id);

      if (error) throw error;
      await fetchPackages();
    } catch (error) {
      console.error('Error updating package:', error);
      toast({
        title: 'Error',
        description: 'Failed to update package',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete package',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const addBudgetOption = async (name: string) => {
    try {
      const { error } = await supabase
        .from('budget_options')
        .insert([{ name }]);

      if (error) throw error;
      await fetchBudgetOptions();
      toast({
        title: 'Success',
        description: 'Budget option added successfully'
      });
    } catch (error) {
      console.error('Error adding budget option:', error);
      toast({
        title: 'Error',
        description: 'Failed to add budget option',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const updateBudgetOption = async (id: string, name: string) => {
    try {
      const { error } = await supabase
        .from('budget_options')
        .update({ name })
        .eq('id', id);

      if (error) throw error;
      await fetchBudgetOptions();
      toast({
        title: 'Success',
        description: 'Budget option updated successfully'
      });
    } catch (error) {
      console.error('Error updating budget option:', error);
      toast({
        title: 'Error',
        description: 'Failed to update budget option',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const deleteBudgetOption = async (id: string) => {
    try {
      const { error } = await supabase
        .from('budget_options')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchBudgetOptions();
      toast({
        title: 'Success',
        description: 'Budget option deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting budget option:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete budget option',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const updateContactInfo = async (contactData: Omit<ContactInfo, 'id'>) => {
    try {
      // Convert PhoneInfo[] to JSON format for database storage
      const phonesAsJson = contactData.phones.map(phone => ({
        name: phone.name,
        number: phone.number
      }));

      if (contactInfo) {
        const { error } = await supabase
          .from('contact_info')
          .update({
            phones: phonesAsJson,
            address: contactData.address
          })
          .eq('id', contactInfo.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert([{
            phones: phonesAsJson,
            address: contactData.address
          }]);

        if (error) throw error;
      }

      await fetchContactInfo();
      toast({
        title: 'Success',
        description: 'Contact information updated successfully'
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      toast({
        title: 'Error',
        description: 'Failed to update contact information',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const refreshPackages = async () => {
    await fetchPackages();
  };

  const value: TravelContextType = {
    packages,
    budgetOptions,
    contactInfo,
    loading,
    addPackage,
    updatePackage,
    deletePackage,
    addBudgetOption,
    updateBudgetOption,
    deleteBudgetOption,
    updateContactInfo,
    refreshPackages
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
};
