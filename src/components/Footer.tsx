import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';
import { useTravelContext } from '@/contexts/TravelContext';
import ContactInfo from '@/components/ContactInfo';
import Logo from './Logo';
const Footer = () => {
  const {
    contactInfo
  } = useTravelContext();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <footer className="bg-gray-900 text-white py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-0
            -translate-x-[6px]
            sm:-translate-x-[9px]
            md:-translate-x-[9px]
            lg:-translate-x-[9px]
            xl:-translate-x-[9px]"
          >
              <Logo className="h-[36px] w-[40px] sm:h-[44px] sm:w-[48px] lg:h-[56px] lg:w-[64px]" />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-high-quality nav-text-quality font-poppins ultra-sharp-text
              -translate-x-[7px]
              sm:-translate-x-[8px]
              md:-translate-x-[8px]
              lg:-translate-x-[8px]
              xl:-translate-x-[8px]"
              >Compass</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed text-high-quality nav-text-quality font-poppins ultra-sharp-text">
              Discover the world with curated travel packages designed for unforgettable experiences.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 mt-3">
              <a 
                href="https://www.instagram.com/compassholidaysindia?igsh=MXYxZDZtemZpaXkyZg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#EC5B24] transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </a>
              <a 
                href="mailto:compassholidays25@gmail.com"
                className="text-white hover:text-[#EC5B24] transition-colors duration-300"
                aria-label="Send us an email"
              >
                <Mail size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-high-quality nav-text-quality font-poppins ultra-sharp-text">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/" onClick={scrollToTop} className="text-gray-300 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base text-high-quality nav-text-quality font-poppins ultra-sharp-text">
                Home
              </Link>
              <Link to="/packages" onClick={scrollToTop} className="text-gray-300 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base text-high-quality nav-text-quality font-poppins ultra-sharp-text">
                Packages
              </Link>
              <Link to="/about" onClick={scrollToTop} className="text-gray-300 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base text-high-quality nav-text-quality font-poppins ultra-sharp-text">
                About
              </Link>
              <Link to="/contact" onClick={scrollToTop} className="text-gray-300 hover:text-primary transition-colors text-xs sm:text-sm lg:text-base text-high-quality nav-text-quality font-poppins ultra-sharp-text">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-high-quality nav-text-quality font-poppins ultra-sharp-text">Contact Info</h4>
            <ContactInfo variant="footer" />
          </div>

          {/* Address */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-high-quality nav-text-quality font-poppins ultra-sharp-text">Address</h4>
            <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed text-high-quality nav-text-quality font-poppins ultra-sharp-text">{contactInfo?.address && (
  <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed text-high-quality nav-text-quality font-poppins ultra-sharp-text">
    {contactInfo.address}
  </p>
)}
</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-7 lg:mt-8 pt-6 sm:pt-7 lg:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm text-high-quality nav-text-quality font-poppins ultra-sharp-text">© 2025 Compass Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
