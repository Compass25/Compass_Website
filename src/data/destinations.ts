export interface Destination {
  id: string;
  title: string;
  country: string;
  image: string;
  overview: string;
  suggestedTime: string;
  whatToExpect: string;
  tips: string[];
}

export const destinations: Destination[] = [
  {
    id: 'delhi',
    title: 'Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    overview: 'A dynamic blend of history and modernity, Delhi is India\'s capital city where ancient forts stand alongside urban skylines. From Mughal marvels to bustling markets and leafy boulevards, Delhi offers a vivid tapestry of culture and heritage.',
    suggestedTime: '2 to 3 days',
    whatToExpect: 'Discover grand Mughal-era monuments, serene temples, and world-class museums. Explore vibrant street markets, indulge in authentic North Indian cuisine, and enjoy a rich mix of old-world charm and contemporary vibrancy.',
    tips: [
      'Consider hiring a certified guide for a deeper understanding of the city\'s layered history.',
      'Opt for metro travel to bypass traffic and cover more ground efficiently.',
      'Mornings and evenings are best for sightseeing—lighter crowds and pleasant weather.',
      'Dress comfortably but respectfully, especially when visiting places of worship.',
      'Keep some cash handy for local markets, though digital payments are widely accepted.'
    ]
  },
  {
    id: 'iceland',
    title: 'Iceland',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1539066019454-2c34e1d0eaa0?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    overview: 'Iceland is a Nordic island nation known for its dramatic landscapes of glaciers, volcanoes, geysers, and hot springs. This land of fire and ice offers some of the world\'s most spectacular natural phenomena, including the Northern Lights.',
    suggestedTime: '7 to 10 days',
    whatToExpect: 'Experience the Golden Circle route, witness the Northern Lights, relax in the Blue Lagoon, and explore ice caves and volcanic landscapes. Enjoy fresh seafood and experience the unique Nordic culture.',
    tips: [
      'Pack layers and waterproof clothing regardless of the season.',
      'Rent a 4WD vehicle for better access to remote locations.',
      'Book Northern Lights tours in advance during winter months.',
      'Try local delicacies like fresh fish and lamb.',
      'Respect nature and follow Leave No Trace principles.'
    ]
  },
  {
    id: 'dubai',
    title: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    overview: 'Dubai is a futuristic metropolis in the UAE known for its ultramodern architecture, luxury shopping, and vibrant nightlife. From the world\'s tallest building to artificial islands, Dubai represents the pinnacle of modern urban development.',
    suggestedTime: '4 to 6 days',
    whatToExpect: 'Visit the Burj Khalifa, explore traditional souks, enjoy world-class shopping, experience desert safaris, and indulge in diverse international cuisine in this cosmopolitan city.',
    tips: [
      'Dress modestly when visiting traditional areas and mosques.',
      'Use the Dubai Metro for convenient city transportation.',
      'Book desert safari tours through reputable operators.',
      'Stay hydrated and use sunscreen, especially during summer.',
      'Respect local customs and Islamic culture.'
    ]
  },
  {
    id: 'bali',
    title: 'Bali',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/3840188/pexels-photo-3840188.jpeg',
    overview: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. This tropical paradise combines spiritual culture with natural beauty and wellness retreats.',
    suggestedTime: '7 to 10 days',
    whatToExpect: 'Explore ancient temples, enjoy yoga and wellness retreats, surf world-class waves, trek through rice terraces, and experience the warm Balinese hospitality and rich cultural traditions.',
    tips: [
      'Respect temple etiquette and dress codes when visiting sacred sites.',
      'Rent a scooter for easy transportation around the island.',
      'Try local warungs for authentic Balinese cuisine.',
      'Book accommodations in advance during peak season.',
      'Be mindful of environmental impact and support eco-friendly businesses.'
    ]
  },
  {
    id: 'paris',
    title: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/32759914/pexels-photo-32759914.jpeg',
    overview: 'Paris, the City of Light, is renowned for its art, fashion, gastronomy, and culture. From the iconic Eiffel Tower to world-class museums and charming cafes, Paris embodies romance and sophistication.',
    suggestedTime: '4 to 7 days',
    whatToExpect: 'Visit iconic landmarks like the Eiffel Tower and Louvre, stroll along the Seine, enjoy world-class cuisine, explore charming neighborhoods, and immerse yourself in French art and culture.',
    tips: [
      'Learn basic French phrases to enhance your experience.',
      'Book museum tickets online to skip long queues.',
      'Explore different neighborhoods for varied experiences.',
      'Try local patisseries and traditional French cuisine.',
      'Use public transportation for efficient city travel.'
    ]
  },
  {
    id: 'tokyo',
    title: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    overview: 'Tokyo is Japan\'s bustling capital, mixing ultramodern and traditional elements. From neon-lit skyscrapers to serene temples, cherry blossoms to cutting-edge technology, Tokyo offers an unforgettable urban experience.',
    suggestedTime: '5 to 8 days',
    whatToExpect: 'Experience vibrant neighborhoods like Shibuya and Harajuku, visit ancient temples, enjoy incredible cuisine from street food to Michelin-starred restaurants, and immerse yourself in Japanese culture.',
    tips: [
      'Get a JR Pass for convenient train travel throughout the city.',
      'Learn basic Japanese etiquette and bow respectfully.',
      'Try different types of Japanese cuisine beyond sushi.',
      'Respect quiet zones on public transportation.',
      'Carry cash as many places don\'t accept cards.'
    ]
  },
  {
    id: 'new-york',
    title: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    overview: 'New York City is the most populous city in the United States, known for its iconic skyline, Broadway shows, world-class museums, and diverse neighborhoods. The city that never sleeps offers endless entertainment and cultural experiences.',
    suggestedTime: '5 to 7 days',
    whatToExpect: 'Visit Times Square, Central Park, and the Statue of Liberty. Enjoy Broadway shows, world-class museums, diverse cuisine, and experience the energy of this iconic metropolis.',
    tips: [
      'Use the subway system for efficient transportation.',
      'Book Broadway shows and popular attractions in advance.',
      'Explore different boroughs for varied experiences.',
      'Try food from various cultures in different neighborhoods.',
      'Walk a lot and wear comfortable shoes.'
    ]
  },
  {
    id: 'rome',
    title: 'Rome',
    country: 'Italy',
    image: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg',
    overview: 'Rome, the Eternal City, is Italy\'s capital and a treasure trove of ancient history. With landmarks like the Colosseum, Roman Forum, and Vatican City, Rome offers an unparalleled journey through Western civilization.',
    suggestedTime: '4 to 6 days',
    whatToExpect: 'Explore ancient ruins like the Colosseum and Roman Forum, visit Vatican City and the Sistine Chapel, enjoy authentic Italian cuisine, and walk through charming piazzas and fountains.',
    tips: [
      'Book skip-the-line tickets for major attractions.',
      'Dress appropriately when visiting religious sites.',
      'Try authentic Roman cuisine at local trattorias.',
      'Validate public transport tickets to avoid fines.',
      'Carry water and stay hydrated while sightseeing.'
    ]
  },
  {
    id: 'sydney',
    title: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop',
    overview: 'Sydney is Australia\'s largest city, famous for its Sydney Opera House, Harbour Bridge, and beautiful beaches. This vibrant coastal city combines stunning natural harbor views with cosmopolitan culture and outdoor lifestyle.',
    suggestedTime: '5 to 7 days',
    whatToExpect: 'Visit the iconic Opera House and Harbour Bridge, relax at Bondi Beach, explore the historic Rocks area, enjoy harbor cruises, and experience Australia\'s laid-back outdoor culture.',
    tips: [
      'Take a harbor cruise for the best city views.',
      'Use public ferries to explore different harbor areas.',
      'Apply sunscreen regularly due to strong UV rays.',
      'Try local seafood and Australian wine.',
      'Explore both city attractions and nearby beaches.'
    ]
  },
  {
    id: 'cape-town',
    title: 'Cape Town',
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
    overview: 'Cape Town is South Africa\'s legislative capital, nestled between Table Mountain and the Atlantic Ocean. Known for its stunning natural beauty, wine regions, and rich cultural heritage, it offers diverse experiences from urban sophistication to natural wonders.',
    suggestedTime: '6 to 8 days',
    whatToExpect: 'Climb Table Mountain, explore wine regions, visit penguin colonies, tour historic sites like Robben Island, and enjoy beautiful coastal drives along the Cape Peninsula.',
    tips: [
      'Book Table Mountain cable car tickets online to avoid queues.',
      'Join wine tours in Stellenbosch and Franschhoek.',
      'Be aware of safety guidelines, especially at night.',
      'Try local South African cuisine and wines.',
      'Pack layers as weather can change quickly.'
    ]
  },
  {
    id: 'bangkok',
    title: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&h=600&fit=crop',
    overview: 'Bangkok is Thailand\'s capital and most populous city, known for its vibrant street life, ornate temples, and incredible street food. This bustling metropolis combines traditional Thai culture with modern urban development.',
    suggestedTime: '4 to 6 days',
    whatToExpect: 'Explore magnificent temples like Wat Pho and Wat Arun, experience floating markets, enjoy world-famous street food, shop at bustling markets, and discover the city\'s vibrant nightlife.',
    tips: [
      'Try street food from busy stalls for the freshest options.',
      'Dress modestly when visiting temples.',
      'Use BTS Skytrain and MRT for efficient transportation.',
      'Stay hydrated and use air-conditioned spaces during hot weather.',
      'Learn basic Thai phrases for better local interactions.'
    ]
  },
  {
    id: 'barcelona',
    title: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop',
    overview: 'Barcelona is the capital of Catalonia, known for its unique architecture by Antoni Gaudí, vibrant culture, beautiful beaches, and world-class cuisine. This Mediterranean city perfectly blends historical charm with modern innovation.',
    suggestedTime: '4 to 6 days',
    whatToExpect: 'Visit Gaudí\'s masterpieces like Sagrada Familia and Park Güell, stroll down Las Ramblas, enjoy tapas culture, relax at city beaches, and experience the vibrant Catalan culture.',
    tips: [
      'Book Sagrada Familia tickets well in advance.',
      'Try authentic tapas at local bars rather than tourist areas.',
      'Learn some basic Catalan or Spanish phrases.',
      'Use public transportation or walk to explore the city.',
      'Be aware of pickpockets in crowded tourist areas.'
    ]
  },
  {
    id: 'london',
    title: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80',
    overview: 'London is the United Kingdom\'s capital, known for its rich history, royal heritage, world-class museums, and multicultural atmosphere. From Big Ben to the Tower of London, the city offers centuries of history alongside modern attractions.',
    suggestedTime: '5 to 7 days',
    whatToExpect: 'Visit iconic landmarks like Big Ben and Buckingham Palace, explore world-class museums, enjoy West End shows, experience diverse food scenes, and discover royal parks and historic neighborhoods.',
    tips: [
      'Get an Oyster Card for convenient public transportation.',
      'Many museums offer free admission.',
      'Book West End show tickets in advance.',
      'Try traditional pub food and afternoon tea.',
      'Always carry an umbrella as weather can be unpredictable.'
    ]
  },
  {
    id: 'singapore',
    title: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop',
    overview: 'Singapore is a modern city-state known for its efficient urban planning, diverse culture, incredible food scene, and futuristic attractions. This Southeast Asian hub combines tradition with innovation in a uniquely Singaporean way.',
    suggestedTime: '3 to 5 days',
    whatToExpect: 'Explore Gardens by the Bay, visit Marina Bay Sands, enjoy hawker center food, experience diverse neighborhoods, and discover the city\'s efficient blend of cultures and modern attractions.',
    tips: [
      'Try local hawker center food for authentic Singaporean cuisine.',
      'Use efficient public transportation system.',
      'Respect local laws and regulations strictly.',
      'Stay hydrated in the tropical climate.',
      'Explore different ethnic neighborhoods for cultural diversity.'
    ]
  },
  {
    id: 'rio-de-janeiro',
    title: 'Rio de Janeiro',
    country: 'Brazil',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop',
    overview: 'Rio de Janeiro is Brazil\'s cultural capital, famous for its beaches, Carnival celebration, and iconic landmarks. Set between mountains and sea, Rio combines natural beauty with vibrant Brazilian culture and infectious energy.',
    suggestedTime: '5 to 7 days',
    whatToExpect: 'Visit Christ the Redeemer statue, relax at Copacabana and Ipanema beaches, experience samba culture, explore colorful neighborhoods, and enjoy the city\'s famous nightlife and music scene.',
    tips: [
      'Stay aware of your surroundings and keep valuables secure.',
      'Learn basic Portuguese phrases for better interactions.',
      'Try local Brazilian cuisine and fresh fruit juices.',
      'Use official tour guides for favela visits.',
      'Plan beach visits during daylight hours.'
    ]
  }
];
