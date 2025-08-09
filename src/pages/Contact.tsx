import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTravelContext } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';


const Contact = () => {
  const { contactInfo } = useTravelContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const backgroundImage = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const subject = `Contact Form Inquiry from ${formData.name}`;
      const body = `Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

      const mailtoLink = `mailto:compassholidays25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // ✅ Safe redirect
      window.location.href = mailtoLink;

      toast({
        title: 'Message Prepared!',
        description: 'Your email client should open with the message details. If it doesn’t, please check your email settings.'
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error opening mailto link:', error);
      toast({
        title: 'Error',
        description: 'Failed to open email client. Please email compassholidays25@gmail.com directly.',
        variant: 'destructive'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const whatsappNumber = contactInfo?.phones?.length > 0 
    ? contactInfo.phones[0].number.replace(/\D/g, '') 
    : '919712416099';

  if (!contactInfo) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-r from-compass-500 to-compass-600 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-compass-600 via-compass-500 to-compass-700">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]"></div>
        </div>

        <div className="absolute inset-0">
          <img src={backgroundImage} alt="Foggy mountain summit landscape for travel adventures" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 text-center animate-fade-in relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-light">
            Ready to start your next adventure? We're here to help you plan the perfect trip.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl gradient-text">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={6} required />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base lg:text-lg py-4 sm:py-5 lg:py-6">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 animate-fade-in-delay-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl gradient-text">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Phones */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Phone Numbers</h3>
                  <div className="space-y-3">
                    {contactInfo.phones?.map((phone, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-primary">📞</div>
                        <div>
                          <span className="font-semibold text-gray-800">{phone.name}</span>
                          <a href={`tel:${phone.number}`} className="text-primary block">{phone.number}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Email Address</h3>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-primary">✉️</div>
                    <div>
                      <p className="font-semibold text-gray-800">Official Email</p>
                      <a href="mailto:compassholidays25@gmail.com" className="text-primary block">
                        compassholidays25@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {contactInfo?.address && (
                  <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">Office Address</h3>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="text-primary mt-1">📍</div>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
        {contactInfo.address}
      </p>
    </a>
  </div>
)}

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Quick Contact</h3>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <div className="text-green-500">💬</div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-green-600">WhatsApp</p>
                        <p className="text-gray-600">Chat with us instantly.</p>
                      </div>
                    </a>
                    {/*<a
                      href="https://www.google.com/maps/dir//Balram+Complex,+203,+Station+Rd,+near+ICICI+Bank,+Lal+Tekri,+Bhuj,+Gujarat+370001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <div className="text-blue-500">🗺️</div>
                      <div>
                        <p className="font-semibold text-gray-800 group-hover:text-blue-600">Get Directions</p>
                        <p className="text-gray-600">Navigate to our office</p>
                      </div>
                    </a>*/}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-2xl gradient-text">Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Saturday</span>
                    <span className="font-semibold text-red-700">Closed</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Sunday</span>
                    <span className="font-semibold text-red-700">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-compass-50 rounded-lg">
                  <p className="text-sm sm:text-base text-red-700">
                    <strong>Emergency Support:</strong> Available 24×7 for travelers on active trips.
                  </p>
                </div>
              </CardContent>
            </Card>

 
            {/* 📍 Find Us / Google Map */}
            <Card>
              <CardHeader>
                <CardTitle className= "text-lg sm:text-2xl gradient-text">Find Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.234567890123!2d69.6702123!3d23.2515789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395119a6b5c5c5c5%3A0x1234567890abcdef!2sBalram%20Complex%2C%20203%2C%20Station%20Rd%2C%20near%20ICICI%20Bank%2C%20Lal%20Tekri%2C%20Bhuj%2C%20Gujarat%20370001%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-56"
                    title="Compass Holidays Map"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
