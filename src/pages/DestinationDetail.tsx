
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { Button } from '@/components/ui/button';

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const destination = destinations.find(dest => dest.id === id);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!destination) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Destination Not Found</h1>
          <Link to="/" onClick={scrollToTop}>
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section with Background Image */}
      <section className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden">
        <img 
          src={destination.image} 
          alt={`${destination.title}, ${destination.country}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
          {/* Back Button */}
          <div className="flex justify-start">
            <Link to="/" onClick={scrollToTop}>
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Title */}
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2">
              {destination.title}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
              {destination.country}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Overview */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Overview</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {destination.overview}
            </p>
          </div>

          {/* Suggested Time */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-compass-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Suggested Time
              </h3>
            </div>
            <p className="text-gray-600 text-base sm:text-lg">
              {destination.suggestedTime}
            </p>
          </div>

          {/* What to Expect */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              What to Expect?
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {destination.whatToExpect}
            </p>
          </div>

          {/* Tips */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Tips</h3>
            <ul className="space-y-4">
              {destination.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-compass-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {tip}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to Home Button */}
          <div className="text-center">
            <Link to="/" onClick={scrollToTop}>
              <Button size="lg" className="px-8 py-4">
                Explore More Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
