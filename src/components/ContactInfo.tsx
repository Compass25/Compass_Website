
import React from 'react';
import { useTravelContext } from '@/contexts/TravelContext';

interface ContactInfoProps {
  variant?: 'footer' | 'about' | 'inline';
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ variant = 'inline', className = '' }) => {
  const { contactInfo } = useTravelContext();

  if (!contactInfo) {
    return null;
  }

  if (variant === 'footer') {
    return (
      <div className={`space-y-2 text-xs sm:text-sm text-gray-300 ${className}`}>
        {contactInfo.phones.map((phone, index) => (
          <div key={index}>
            <p className="font-medium">{phone.name}</p>
            <a href={`tel:${phone.number}`} className="hover:text-primary transition-colors">
              {phone.number}
            </a>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'about') {
    return (
      <div className={className}>
        {contactInfo.phones.map((phone, index) => (
          <div key={index} className="mb-3 sm:mb-4">
            <p className="font-medium text-gray-800 text-sm sm:text-base">{phone.name}</p>
            <a 
              href={`tel:${phone.number}`} 
              className="text-primary hover:text-primary/80 transition-colors text-base sm:text-lg"
            >
              {phone.number}
            </a>
          </div>
        ))}
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={className}>
      {contactInfo.phones.map((phone, index) => (
        <div key={index} className="flex items-center gap-2 text-sm sm:text-base">
          <span className="font-medium">{phone.name}:</span>
          <a href={`tel:${phone.number}`} className="text-primary hover:text-primary/80 transition-colors">
            {phone.number}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
