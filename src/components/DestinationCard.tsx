import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface DestinationCardProps {
  title: string;
  image: string;
  link: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ title, image, link }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="relative flex-shrink-0 w-64 h-80 sm:w-72 sm:h-80 md:w-80 md:h-96 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl"
      style={{
        WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Safari clipping fix
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: '100% 100%',
      }}
    >
      {/* Background Image */}
<div
  className="w-full h-full overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
  style={{
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    transform: 'translateZ(0)',
  }}
>
  <img
    src={image}
    alt={title}
    className="w-full h-full object-cover"
    loading="lazy"
    style={{ borderRadius: 'inherit' }}
  />
</div>


      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl"></div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 lg:p-6 rounded-2xl">
        <div className="flex items-end justify-between">
          {/* Destination Title - Bottom Left */}
          <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl leading-tight max-w-[70%]">
            {title}
          </h3>
          
          {/* Glassmorphism CTA Button - Bottom Right */}
          <Link 
            to={link} 
            onClick={scrollToTop}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 group-hover:translate-x-1 flex-shrink-0 shadow-lg"
          >
            <ArrowUpRight 
              className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
