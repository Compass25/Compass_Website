import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTravelContext } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
const ContactForm: React.FC = () => {
  const {
    contactInfo,
    updateContactInfo
  } = useTravelContext();
  const {
    toast
  } = useToast();
  const [contactForm, setContactForm] = useState({
    phones: [{
      name: '',
      number: ''
    }],
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (contactInfo) {
      setContactForm({
        phones: contactInfo.phones.length > 0 ? contactInfo.phones : [{
          name: '',
          number: ''
        }],
        address: contactInfo.address
      });
    }
  }, [contactInfo]);
  const handleUpdateContact = async () => {
    setIsSubmitting(true);
    try {
      await updateContactInfo(contactForm);
      toast({
        title: 'Success',
        description: 'Contact information updated successfully!'
      });
    } catch (error) {
      // Error is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" value={contactForm.address} onChange={e => setContactForm(prev => ({
          ...prev,
          address: e.target.value
        }))} rows={3} />
        </div>

        <div>
          <Label>Phone Numbers</Label>
          {contactForm.phones.map((phone, index) => <div key={index} className="grid grid-cols-2 gap-4 mb-2">
              <Input value={phone.name} onChange={e => setContactForm(prev => ({
            ...prev,
            phones: prev.phones.map((p, i) => i === index ? {
              ...p,
              name: e.target.value
            } : p)
          }))} placeholder="Name" />
              <Input value={phone.number} onChange={e => setContactForm(prev => ({
            ...prev,
            phones: prev.phones.map((p, i) => i === index ? {
              ...p,
              number: e.target.value
            } : p)
          }))} placeholder="Phone Number" />
            </div>)}
        </div>

        <Button onClick={handleUpdateContact} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </> : 'Update Contact Information'}
        </Button>
      </CardContent>
    </Card>;
};
export default ContactForm;