import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Shield, Users, ArrowRight } from 'lucide-react';
import { useTravelContext } from '@/contexts/TravelContext';
import PackageCard from '@/components/PackageCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import DestinationCarousel from '@/components/DestinationCarousel';

// Modern Typewriter Component
const TypewriterText = () => {
  const [currentText, setCurrentText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const phrases = ['Discover Amazing Destinations', 'Create Unforgettable Memories', 'Experience Premium Travel', 'Explore the World in Style'];
  React.useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : currentText.length === currentPhrase.length ? 100 : 100);
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, phrases]);
  return <div className="typewriter-container">
      <span className="typewriter-text">
        {currentText}
        <span className="typewriter-cursor"></span>
      </span>
    </div>;
};

// Improved: Simple Testimonials Column with truly seamless continuous scroll
const SimpleTestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    text: string;
    name: string;
    role: string;
  }>;
  duration?: number;
}) => {
  /*
    - No margin on the cards
    - py-8 only on the flex parent container
    - gap-y-8 only on the cards stack
    - Double the content, so when animating -50%, the next set starts perfectly
    - Animation uses translateY(-50%) for exactly half of total height, so it resets seamlessly
  */
  return <div className={props.className}>
      <div className="flex flex-col py-8 gap-y-8 bg-background" style={{
      position: "relative",
      height: "100%" // needed for proper animation if controlling by height elsewhere
    }}>
        <div className="flex flex-col gap-y-8 animate-[testimonial-seamless-scroll_var(--duration)_linear_infinite]" style={{
        '--duration': `${props.duration || 15}s`
      } as React.CSSProperties}>
          {/* Double testimonials for a true infinite loop effect */}
          {[...Array(2)].map((_, group) => <React.Fragment key={group}>
              {props.testimonials.map(({
            text,
            name,
            role
          }, i) => <div key={`${group}-${i}`} className="p-6 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-white">
                  <div className="text-gray-700 mb-4 text-sm leading-relaxed">{text}</div>
                  <div className="border-t pt-4">
                    <div className="font-medium text-gray-900 text-sm">{name}</div>
                    <div className="text-xs text-gray-500 mt-1">{role}</div>
                  </div>
                </div>)}
            </React.Fragment>)}
        </div>
      </div>
    </div>;
};
const Home = () => {
  const {
    packages
  } = useTravelContext();
  // Use sample packages if no packages exist, otherwise use existing packages
  const displayPackages = packages.filter(pkg => pkg.featured).slice(0, 3);

  const features = [{
    title: 'Trusted Experts',
    description: 'Years of experience crafting perfect travel experiences with local insights and professional guides.',
    icon: Star
  }, {
    title: 'Safe & Secure',
    description: 'Your safety is our priority with comprehensive insurance coverage and 24/7 support during travels.',
    icon: Shield
  }, {
    title: 'Tailor-Made Plans',
    description: 'Customizable packages designed to match your preferences, budget, and travel style perfectly.',
    icon: Users
  }];

  // Travel-focused testimonials without images
  const travelTestimonials = [{
    text: "The Himalayan trek was absolutely breathtaking! The guides were knowledgeable and the entire experience exceeded our expectations. Compass made our dream adventure come true.",
    name: "Priya Sharma",
    role: "Adventure Enthusiast"
  }, {
    text: "Excellent service from start to finish. The beach getaway in Goa was perfectly organized with amazing accommodations. Will definitely book with Compass again!",
    name: "Rahul Patel",
    role: "Travel Blogger"
  }, {
    text: "The desert safari in Rajasthan was magical! From camel rides to stargazing in the dunes, every moment was perfectly curated. Highly recommend Compass for authentic experiences.",
    name: "Anita Singh",
    role: "Cultural Explorer"
  }, {
    text: "Professional team with attention to detail. The customized itinerary was perfect for our family vacation. Great value for money and unforgettable memories created.",
    name: "Vikram Reddy",
    role: "Family Traveler"
  }, {
    text: "Compass transformed our honeymoon into a fairytale. The romantic destinations and thoughtful touches made it truly special. Their expertise in travel planning is unmatched.",
    name: "Meera Joshi",
    role: "Newlywed Traveler"
  }, {
    text: "Amazing customer service and incredible attention to detail. Our Kerala backwater tour was seamless and unforgettable. Thank you Compass for the memories!",
    name: "Arjun Nair",
    role: "Nature Lover"
  }, {
    text: "The mountain biking expedition in Ladakh was thrilling! Professional guides, top-notch equipment, and breathtaking scenery. Best adventure company in India!",
    name: "Kavya Iyer",
    role: "Adventure Cyclist"
  }, {
    text: "Our cultural tour of Tamil Nadu was enriching and well-organized. From temples to traditional performances, every detail was perfectly planned. Highly recommended!",
    name: "Ravi Kumar",
    role: "Heritage Explorer"
  }, {
    text: "The wildlife safari in Jim Corbett was spectacular! Saw tigers, elephants, and many exotic birds. The naturalist guides were incredibly knowledgeable.",
    name: "Deepika Rao",
    role: "Wildlife Enthusiast"
  }];

  // Split testimonials into three columns
  const firstColumn = travelTestimonials.slice(0, 3);
  const secondColumn = travelTestimonials.slice(3, 6);
  const thirdColumn = travelTestimonials.slice(6, 9);
  const featuredDestinations = [{
    title: 'Tokyo',
    image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    link: '/destinations/tokyo'
  }, {
    title: 'Paris',
    image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    link: '/destinations/paris'
  }, {
    title: 'New York',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    link: '/destinations/new-york'
  }, {
    title: 'Dubai',
    image: 'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    link: '/destinations/dubai'
  }, {
    title: 'Bali',
    image: 'https://images.pexels.com/photos/3348363/pexels-photo-3348363.jpeg',
    link: '/destinations/bali'
  }, {
    title: 'London',
    image: 'https://images.pexels.com/photos/1796706/pexels-photo-1796706.jpeg',
    link: '/destinations/london'
  }, {
    title: 'Rome',
    image: 'https://images.pexels.com/photos/3021382/pexels-photo-3021382.jpeg',
    link: '/destinations/rome'
  }];
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const PackageSkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
  return <div className="pt-16">
      {/* Modern Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 pb-10 sm:pt-20 sm:pb-14 lg:pt-28 lg:pb-20">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-compass-600 via-compass-500 to-compass-700">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]"></div>
        </div>

        {/* Background Image with Modern Overlay */}
        <div className="absolute inset-0 flex justify-center items-center">
          <img src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1920&q=80" alt="Beautiful mosque buildings" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000 hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500 hidden lg:block"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Modern Typewriter Animation */}
          <div className="flex justify-center mb-4 sm:mb-6 animate-fade-in">
            <div className="text-sm sm:text-base lg:text-lg text-white/90 font-light tracking-wider min-h-[24px] sm:min-h-[28px] lg:min-h-[32px]">
              <TypewriterText />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 xl:mb-8 leading-tight animate-fade-in px-2 sm:px-4">
            Discover the World with{' '}
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Compass
            </span>
          </h1>

          {/* Subtitle */}
          <p className="sm:text-lg lg:text-2xl xl:text-2xl mb-8 sm:mb-10 lg:mb-12 animate-fade-in-delay-1 text-white/90 font-light max-w-4xl mx-auto leading-relaxed text-sm px-4 md:text-base">
            Curated travel packages for unforgettable adventures across breathtaking destinations.
          </p>

          {/* Modern CTA Button */}
          <div className="animate-fade-in-delay-2">
            <Link to="/packages" onClick={scrollToTop}>
              <Button size="lg" className="group relative bg-white text-compass-600 hover:bg-white hover:text-compass-600 text-sm sm:text-base lg:text-lg xl:text-xl px-6 sm:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 lg:py-6 xl:py-7 font-semibold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-white/20 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-2 text-compass-600">
                  Explore Packages
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </Button>
            </Link>
          </div>

          {/* Stats or Trust Indicators with Animation */}
          <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 text-white/80 animate-fade-in-delay-3">
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tabular-nums">
                <AnimatedCounter end={1000} duration={1000} delay={300} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm lg:text-base">Happy Travelers</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tabular-nums">
                <AnimatedCounter end={50} duration={1000} delay={500} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm lg:text-base">Destinations</div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-0.5 text-xl sm:text-2xl lg:text-3xl font-bold text-white tabular-nums">
                <AnimatedCounter start={0} end={4.1} duration={1000} delay={700} className="inline-block" />
                <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400 -mt-0.5" />
              </div>
              <div className="text-xs sm:text-sm lg:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 my-[30px]">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-3 sm:mb-4 gradient-text sm:text-3xl">
              Popular <span className="text-orange-500">Destinations</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Dynamic urban hubs, peaceful hideaways, striking natural settings and cultural landmarks define these top travel experiences.
            </p>
          </div>
          
          <DestinationCarousel destinations={featuredDestinations} />
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14 lg:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 gradient-text">Exclusive Deals</h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Discover our most popular travel experiences, carefully crafted for unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {displayPackages.map((pkg, index) => <div key={pkg.id} className={`animate-fade-in-delay-${index + 1}`}>
                <PackageCard pkg={pkg} onNavigate={scrollToTop} />
              </div>)}
          </div>

          {/* View All Packages Button */}
          <div className="text-center mt-8 sm:mt-10 lg:mt-12 animate-fade-in-delay-3">
            <Link to="/packages" onClick={scrollToTop}>
              <Button variant="outline" size="lg" className="px-6 sm:px-7 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                View All Packages
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14 lg:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 gradient-text">Why Choose Compass?</h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">We make every journey extraordinary with our commitment to excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return <div key={feature.title} className={`text-center p-6 sm:p-7 lg:p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-delay-${index + 1}`}>
                  <div className="flex justify-center mb-4 sm:mb-5 lg:mb-6">
                    <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                </div>;
          })}
          </div>
        </div>
      </section>

      {/* Continuous Scrolling Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-14 lg:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 gradient-text">What Our Travelers Say</h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Real experiences from real travelers who have explored the world with Compass.
            </p>
          </div>
          
          {/* 
            Horizontal gap between columns only (no mt-10 or mb-10/more vertical margin).
            With the column using gap-y-8 py-8, all vertical spaces (top, bottom, between) match.
           */}
          <div className="flex justify-center gap-x-8 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <SimpleTestimonialsColumn testimonials={firstColumn} duration={15} />
            <SimpleTestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <SimpleTestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>
      <style>{`
        @keyframes testimonial-seamless-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>;
};
export default Home;