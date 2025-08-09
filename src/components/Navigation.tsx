
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import Logo from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center space-x-0
          -translate-x-[6px]
          sm:-translate-x-[8px]
          md:-translate-x-[9px]
          lg:-translate-x-[9px]
          xl:-translate-x-[9px]"
          >
            <Logo className="h-[36px] w-[40px] sm:h-[44px] sm:w-[48px] lg:h-[56px] lg:w-[64px]" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-high-quality nav-text-quality font-poppins ultra-sharp-text
             -translate-x-[6px]
             sm:-translate-x-[7px]
             md:-translate-x-[7px]
             lg:-translate-x-[9px]
             xl:-translate-x-[9px]"
            >
              Compass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={scrollToTop}
                className={`text-sm lg:text-base font-medium transition-colors hover:text-primary text-high-quality nav-text-quality font-poppins ultra-sharp-text ${
                  location.pathname === item.path ? 'text-[#EC5B24] font-semibold' : 'text-[#8B8B8B] font-medium'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary text-white text-xs">
                      {profile?.name ? getInitials(profile.name) : 
                       user?.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex flex-col justify-center items-center">
              <span className={`block w-4 sm:w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-4 sm:w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${isOpen ? 'opacity-0' : 'my-1'}`} />
              <span className={`block w-4 sm:w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={scrollToTop}
                  className={`text-sm sm:text-base font-medium transition-colors hover:text-primary text-high-quality nav-text-quality font-poppins ultra-sharp-text ${
                    location.pathname === item.path ? 'text-[#EC5B24] font-semibold' : 'text-[#8B8B8B] font-medium'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              {user ? (
                <div className="flex flex-col space-y-3 pt-3 border-t border-white/20">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {profile?.name ? getInitials(profile.name) : 
                         user?.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {profile?.name || user?.user_metadata?.full_name || user?.email}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-3 border-t border-white/20">
                  <Link to="/auth/login" onClick={scrollToTop}>
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/signup" onClick={scrollToTop}>
                    <Button size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
