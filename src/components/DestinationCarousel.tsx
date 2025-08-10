
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DestinationCard from './DestinationCard';

interface Destination {
  title: string;
  image: string;
  link: string;
}

interface DestinationCarouselProps {
  destinations: Destination[];
}

const DestinationCarousel: React.FC<DestinationCarouselProps> = ({ destinations }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320; // Width of one card plus gap
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check
    handleScroll();

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Left Arrow - Smaller and More Responsive */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </button>

      {/* Right Arrow - Smaller and More Responsive */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={!canScrollRight}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        <div className="flex gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-6 lg:px-8" style={{ width: 'max-content' }}>
          {destinations.map((destination, index) => (
            <div 
              key={index} 
              className="scroll-snap-align-start"
              style={{ scrollSnapAlign: 'start' }}
            >
              <DestinationCard 
                title={destination.title}
                image={destination.image}
                link={destination.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCarousel;
