import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { useTravelContext } from '@/contexts/TravelContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ChevronDown, MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';

const PackageDetail = () => {
  const {
    id
  } = useParams();
  const {
    packages
  } = useTravelContext();
  const {
    toast
  } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const pkg = packages.find(p => p.id === id);
  if (!pkg) {
    return <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Package not found</h1>
          <Link to="/packages">
            <Button>Back to Packages</Button>
          </Link>
        </div>
      </div>;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare email content
    const subject = `Travel Inquiry for ${pkg.title}`;
    const body = `
Package: ${pkg.title}
Destination: ${pkg.destination}
Duration: ${pkg.duration}
Price: ${formatCurrency(pkg.price, pkg.currency)}

Customer Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:compassholidays25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.open(mailtoLink, '_blank');
    toast({
      title: 'Inquiry Prepared!',
      description: 'Your email client will open with the inquiry details.'
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="pt-16 min-h-screen bg-gray-50">
      {/* Full-Width Hero Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <img src={pkg.images[currentImageIndex]} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-10" />
        <div className="absolute bottom-6 left-6 text-white animate-fade-in space-y-2">
        </div>
      </section>

      {/* Image Thumbnails - Responsive with Vertical Scrolling */}
      {pkg.images.length > 1 && <section className="bg-white py-4 sm:py-6 lg:py-8 border-b shadow-sm mb-3 sm:mb-4 lg:mb-6">
        <div className="container mx-auto px-[16px]">
          <ScrollArea className="w-full">
            <div style={{
            WebkitOverflowScrolling: 'touch'
          }} className="flex gap-2 sm:gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent -mx-0 px-0">
              {pkg.images.map((image, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 border-2 ${index === currentImageIndex ? 'border-primary' : 'border-gray-200'}`}>
                  <img src={image} alt={`${pkg.title} ${index + 1}`} className="w-full h-full object-cover" />
                </button>)}
            </div>
          </ScrollArea>
        </div>
      </section>}

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* Package Info - Responsive Layout */}
            <Card className="animate-fade-in">
              <CardHeader className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Title and Destination */}
                  <div>
                    <CardTitle className="text-xl sm:text-2xl lg:text-3xl mb-2 leading-tight">
                      {pkg.title}
                    </CardTitle>
                    <div className="flex items-center text-gray-600 text-base sm:text-lg">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                      <span>{pkg.destination}</span>
                    </div>
                  </div>
                  
                  {/* Price and Tags - Stacked on mobile, side-by-side on larger screens */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                    <div className="order-2 sm:order-1">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {pkg.type}
                        </span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-1 sm:order-2">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {formatCurrency(pkg.price, pkg.currency)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
                  {pkg.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {pkg.tags.map(tag => <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm">
                      {tag}
                    </span>)}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary - Responsive */}
            <Card className="animate-fade-in-delay-1">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Day-wise Itinerary</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
                  {pkg.itinerary.map((day, index) => <Collapsible key={index}>
                      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors text-left" style={{
                    borderBottom: index < pkg.itinerary.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1 min-w-0">
                          <span className="text-[#EC5B24] font-semibold font-poppins text-sm sm:text-base flex-shrink-0">
                            {day.day}:
                          </span>
                          <span className="font-medium text-gray-800 font-poppins text-sm sm:text-base truncate">
                            {day.title}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-180 flex-shrink-0 ml-2" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2 bg-white" style={{
                    borderTop: '1px solid #e5e7eb'
                  }}>
                        <p className="text-gray-600 font-poppins text-xs sm:text-sm leading-relaxed">
                          {day.description}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>)}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 lg:gap-6 animate-fade-in-delay-2">
              <Card>
                <CardHeader className="p-4 sm:p-6 py-[16px]">
                  <CardTitle className="text-green-600 text-lg sm:text-xl">Inclusions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, index) => <li key={index} className="flex items-start text-sm sm:text-base">
                        <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 sm:p-6 py-[16px]">
                  <CardTitle className="text-red-600 text-lg sm:text-xl">Exclusions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, index) => <li key={index} className="flex items-start text-sm sm:text-base">
                        <span className="text-red-500 mr-2 mt-0.5 flex-shrink-0">✗</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Responsive */}
          <div className="space-y-6">
            {/* Inquiry Form */}
            <Card className="animate-fade-in-delay-1 xl:sticky xl:top-24">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Send Inquiry</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your travel preferences..." rows={4} className="mt-1 resize-none" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4">
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default PackageDetail;
