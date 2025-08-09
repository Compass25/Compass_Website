import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useTravelContext } from '@/contexts/TravelContext';
import { Loader2 } from 'lucide-react';
import PackageCard from '@/components/PackageCard';

const Packages = () => {
  const { packages, budgetOptions, loading } = useTravelContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');

  const destinations = useMemo(() => {
    const uniqueDestinations = [...new Set(packages.map(pkg => pkg.destination))];
    return uniqueDestinations;
  }, [packages]);

  const durations = useMemo(() => {
    const uniqueDurations = [...new Set(packages.map(pkg => pkg.duration))];
    return uniqueDurations;
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDestination = destinationFilter === 'all' || pkg.destination === destinationFilter;
      const matchesType = typeFilter === 'all' || pkg.type === typeFilter;
      const matchesDuration = durationFilter === 'all' || pkg.duration === durationFilter;

      return matchesSearch && matchesDestination && matchesType && matchesDuration;
    });
  }, [packages, searchTerm, destinationFilter, typeFilter, durationFilter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-compass-500 to-compass-600 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-compass-600 via-compass-500 to-compass-700">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]"></div>
        </div>

        {/* Background Image with Modern Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80" 
            alt="Travel packages background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000 hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500 hidden lg:block"></div>

        <div className="container mx-auto px-4 text-center animate-fade-in relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Travel Packages</h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-light">
            Explore our carefully curated collection of travel experiences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 mb-6 sm:mb-7 lg:mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Search</label>
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Destination</label>
              <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="All Destinations" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="text-sm sm:text-base">All Destinations</SelectItem>
                  {destinations.map(destination => (
                    <SelectItem key={destination} value={destination} className="text-sm sm:text-base">{destination}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="text-sm sm:text-base">All Types</SelectItem>
                  {budgetOptions.map(option => (
                    <SelectItem key={option.id} value={option.name} className="text-sm sm:text-base">{option.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Duration</label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="All Durations" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all" className="text-sm sm:text-base">All Durations</SelectItem>
                  {durations.map(duration => (
                    <SelectItem key={duration} value={duration} className="text-sm sm:text-base">{duration}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex items-end">
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setDestinationFilter('all');
                  setTypeFilter('all');
                  setDurationFilter('all');
                }}
                variant="outline"
                className="w-full text-xs sm:text-sm lg:text-base py-2 sm:py-2.5"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-5 lg:mb-6 animate-fade-in">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing {filteredPackages.length} of {packages.length} packages.
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredPackages.map((pkg, index) => (
            <div key={pkg.id} className={`animate-fade-in-delay-${index % 3 + 1}`}>
              <PackageCard pkg={pkg} onNavigate={scrollToTop} />
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-8 sm:py-10 lg:py-12 animate-fade-in">
            <p className="text-gray-500 text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">No packages found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setDestinationFilter('all');
                setTypeFilter('all');
                setDurationFilter('all');
              }}
              variant="outline"
              className="text-sm sm:text-base"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
