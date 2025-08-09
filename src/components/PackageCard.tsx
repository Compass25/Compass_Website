import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Clock } from 'lucide-react';
import { TravelPackage } from '@/contexts/TravelContext';
import { formatCurrency } from '@/lib/currency';
interface PackageCardProps {
  pkg: TravelPackage;
  onNavigate?: () => void;
}
const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  onNavigate
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (onNavigate) onNavigate();
  };
  return <div className="group transition-transform duration-300">
      <div className="bg-white rounded-lg overflow-hidden shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg focus:shadow-lg">
        <div className="relative overflow-hidden">
          <img src={pkg.images[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'} alt={pkg.title} className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105 group-focus:scale-105" />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {pkg.type}
          </div>
          {pkg.featured && <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              Featured
            </div>}
        </div>
        
        <div className="p-4 sm:p-5 lg:p-6 bg-white rounded-b-lg transition-all duration-300">
          <div className="flex items-start text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 mt-0.5 flex-shrink-0" />
            <span className="font-normal">{pkg.destination}</span>
          </div>
          
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-gray-900 leading-tight">
            {pkg.title}
          </h3>
          
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-2">
            {pkg.description}
          </p>
          
          <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
            <div className="flex items-center text-gray-500">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="text-xs sm:text-sm">{pkg.duration}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-primary text-lg lg:text-2xl sm:text-lg">
                {formatCurrency(pkg.price, pkg.currency)}
              </span>
            </div>
          </div>
          
          <Link to={`/package/${pkg.id}`} onClick={scrollToTop} className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 sm:py-2.5 lg:py-3 rounded-lg transition-colors text-xs sm:text-sm lg:text-base">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};
export default PackageCard;