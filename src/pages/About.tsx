import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTravelContext } from '@/contexts/TravelContext';
import ContactInfo from '@/components/ContactInfo';
const About = () => {
  const {
    contactInfo
  } = useTravelContext();
  const teamMembers = [{
    name: 'Rishabh Mehta',
    role: 'Founder & Travel Expert',
    bio: 'With over 10 years of experience in the travel industry, Rishabh is passionate about creating unforgettable travel experiences.',
    image: 'https://ik.imagekit.io/iubph2bta/Rishabh%20Bhai.png?updatedAt=1754555952305'
  }, {
    name: 'Harnish Budhbhatti',
    role: 'Operations Manager',
    bio: 'Harnish ensures every detail of your journey is perfectly planned and executed with precision and care.',
    image: 'https://ik.imagekit.io/iubph2bta/Harnish%20Bhai.png?updatedAt=1754556065917'
  }];
  const values = [{
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, from planning to execution.',
    icon: '🏆'
  }, {
    title: 'Authenticity',
    description: 'We believe in authentic travel experiences that connect you with local cultures.',
    icon: '🌍'
  }, {
    title: 'Sustainability',
    description: 'We are committed to responsible tourism that protects our planet for future generations.',
    icon: '🌱'
  }, {
    title: 'Innovation',
    description: 'We continuously innovate to provide unique and memorable travel experiences.',
    icon: '💡'
  }];
  return <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-compass-500 to-compass-600 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-compass-600 via-compass-500 to-compass-700">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]"></div>
        </div>

        {/* Background Image with Modern Overlay */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80" alt="About us background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000 hidden lg:block"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500 hidden lg:block"></div>

        <div className="container mx-auto px-4 text-center animate-fade-in relative z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Compass</h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-light">
            Your trusted partner in creating extraordinary travel experiences that last a lifetime.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        {/* Our Story */}
        <section className="mb-12 sm:mb-14 lg:mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto px-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-7 lg:mb-8 gradient-text">Our Story</h2>
            <div className="prose prose-sm sm:prose-base lg:prose-lg mx-auto text-gray-700 leading-relaxed">
              <p className="mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base lg:text-lg font-light">
                Founded with a passion for exploration and discovery, Compass Travel has been guiding adventurers to their dream destinations for over a decade. Our journey began with a simple belief: that travel has the power to transform lives, broaden perspectives, and create lasting memories.
              </p>
              <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-5 lg:mb-6 font-light">
                Based in the vibrant city of Bhuj, Gujarat, we have grown from a small local agency to a trusted name in the travel industry. Our team of experienced travel experts has personally visited every destination we offer, ensuring that we can provide you with insider knowledge and authentic recommendations.
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-light">
                We understand that every traveler is unique, which is why we specialize in creating personalized travel experiences that match your interests, budget, and dreams. Whether you're seeking adventure in the mountains, relaxation on pristine beaches, or cultural immersion in historic cities, we're here to make it happen.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-12 sm:mb-14 lg:mb-16 animate-fade-in-delay-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
            <Card className="p-6 sm:p-7 lg:p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">🎯</div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
                  To create exceptional travel experiences that inspire, educate, and connect people with the beauty and diversity of our world, while promoting sustainable and responsible tourism practices.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 sm:p-7 lg:p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">👁️</div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed font-light text-sm sm:text-base">
                  To be the leading travel company that makes extraordinary journeys accessible to everyone, fostering cultural understanding and environmental consciousness through meaningful travel experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12 sm:mb-14 lg:mb-16 animate-fade-in-delay-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 gradient-text">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {values.map((value, index) => <Card key={value.title} className={`p-4 sm:p-5 lg:p-6 text-center transition-shadow duration-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] animate-fade-in-delay-${index + 1}`}>
                <CardContent className="p-0">
                  <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">{value.icon}</div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Team Section */}
        <section className="animate-fade-in-delay-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 gradient-text">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => {
            // Find the corresponding phone number from contactInfo
            const memberPhone = contactInfo?.phones?.find(phone => phone.name.toLowerCase().includes(member.name.split(' ')[0].toLowerCase()));
            return <Card key={member.name} className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-delay-${index + 1}`}>
                  <div className="aspect-square overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-gray-800">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed font-normal text-sm sm:text-base">{member.bio}</p>
                    {memberPhone && <a href={`tel:${memberPhone.number}`} className="inline-flex items-center text-primary hover:text-primary/80 font-semibold text-sm sm:text-base">
                        📞 {memberPhone.number}
                      </a>}
                  </CardContent>
                </Card>;
          })}
          </div>
        </section>

        {/* Stats Section */}
        
      </div>
    </div>;
};
export default About;