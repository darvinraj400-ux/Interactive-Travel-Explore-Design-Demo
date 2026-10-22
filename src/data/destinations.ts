export type Region = 'asia' | 'europe' | 'americas' | 'africa' | 'oceania';
export type Budget = 'budget' | 'mid-range' | 'luxury';
export type Climate = 'tropical' | 'temperate' | 'arid' | 'mediterranean' | 'alpine' | 'polar';
export type Mood = 'adventure' | 'relaxation' | 'culture' | 'nature' | 'nightlife' | 'wellness';

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: Region;
  moods: Mood[];
  budget: Budget;
  climate: Climate;
  activities: string[];
  duration: { min: number; max: number };
  highlights: string[];
  description: string;
  tips: string[];
  suggestedItinerary: ItineraryDay[];
  estimatedBudgetPerDay: number;
  currency: string;
  bestSeason: string;
  language: string;
  emoji: string;
  gradient: string;
  stamp: string;
}

export const destinations: Destination[] = [
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'asia',
    moods: ['culture', 'nature', 'wellness'],
    budget: 'mid-range',
    climate: 'temperate',
    activities: ['Temple visits', 'Tea ceremonies', 'Bamboo forest walks', 'Geisha district tours', 'Zen gardens', 'Ramen tasting'],
    duration: { min: 4, max: 7 },
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji Golden Pavilion', 'Gion District'],
    description: 'Step into a living tapestry of ancient tradition and serene beauty. Kyoto whispers through its thousand temples, moss-covered gardens, and the rustle of bamboo. Here, time moves at the pace of a tea ceremony — deliberate, mindful, unforgettable.',
    tips: ['Visit temples early morning to avoid crowds', 'Get an IC card (ICOCA) for easy transit', 'Try kaiseki ryori for a multi-course culinary experience', 'Rent a bicycle — the city is very bike-friendly', 'Cherry blossom season (late March–April) is magical but crowded'],
    suggestedItinerary: [
      { day: 1, title: 'Arrival & Eastern Kyoto', activities: ['Check in at ryokan', 'Explore Higashiyama district', 'Visit Kiyomizu-dera Temple', 'Evening walk through Gion'] },
      { day: 2, title: 'Temples & Gardens', activities: ['Kinkaku-ji Golden Pavilion', 'Ryoan-ji Zen Garden', 'Nijo Castle', 'Nishiki Market for lunch'] },
      { day: 3, title: 'Arashiyama & Nature', activities: ['Bamboo Grove at dawn', 'Tenryu-ji Temple', 'Monkey Park Iwatayama', 'Togetsukyo Bridge sunset'] },
      { day: 4, title: 'Spiritual Journey', activities: ['Fushimi Inari at sunrise', 'Tofuku-ji Temple', 'Tea ceremony experience', 'Pontocho alley dinner'] },
      { day: 5, title: 'Day Trip & Departure', activities: ['Nara deer park (day trip)', 'Todai-ji Temple', 'Return for final shopping', 'Departure'] }
    ],
    estimatedBudgetPerDay: 120,
    currency: 'JPY',
    bestSeason: 'Spring (Mar-May) or Autumn (Oct-Nov)',
    language: 'Japanese',
    emoji: '⛩️',
    gradient: 'from-rose-200 via-amber-100 to-emerald-100',
    stamp: '京都'
  },
  {
    id: 'marrakech-morocco',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'africa',
    moods: ['culture', 'adventure', 'nightlife'],
    budget: 'budget',
    climate: 'arid',
    activities: ['Medina exploration', 'Spice market tours', 'Desert excursions', 'Hammam experiences', 'Cooking classes', 'Rooftop dining'],
    duration: { min: 3, max: 6 },
    highlights: ['Jemaa el-Fnaa Square', 'Bahia Palace', 'Majorelle Garden', 'Atlas Mountains'],
    description: 'Marrakech is a sensory overload in the best possible way. The medina pulses with color, sound, and aroma — saffron stacks tower beside hand-woven rugs, while the call to prayer drifts over terracotta rooftops. Every alleyway holds a story, every riad a hidden paradise.',
    tips: ['Negotiate prices — start at 30% of asking price', 'Dress modestly when visiting mosques', 'Stay in a traditional riad for the full experience', 'Carry small bills for tips', 'Avoid summer (July-August) — it can exceed 40°C'],
    suggestedItinerary: [
      { day: 1, title: 'Medina Immersion', activities: ['Arrive at Riad', 'Jemaa el-Fnaa at sunset', 'Street food dinner', 'Rooftop mint tea'] },
      { day: 2, title: 'Palaces & Gardens', activities: ['Bahia Palace morning tour', 'Saadian Tombs', 'Majorelle Garden', 'Hammam spa afternoon'] },
      { day: 3, title: 'Souks & Culture', activities: ['Souk navigation with guide', 'Leather tanneries visit', 'Moroccan cooking class', 'Dinner at Nomad restaurant'] },
      { day: 4, title: 'Atlas Mountains', activities: ['Day trip to Ourika Valley', 'Berber village visit', 'Waterfall hike', 'Traditional tagine lunch'] }
    ],
    estimatedBudgetPerDay: 55,
    currency: 'MAD',
    bestSeason: 'Spring (Mar-May) or Autumn (Sep-Nov)',
    language: 'Arabic / French',
    emoji: '🕌',
    gradient: 'from-orange-200 via-red-100 to-yellow-100',
    stamp: 'مراكش'
  },
  {
    id: 'patagonia-argentina',
    name: 'Patagonia',
    country: 'Argentina',
    region: 'americas',
    moods: ['adventure', 'nature'],
    budget: 'mid-range',
    climate: 'alpine',
    activities: ['Glacier trekking', 'Mountain hiking', 'Wildlife watching', 'Kayaking', 'Horseback riding', 'Photography'],
    duration: { min: 7, max: 14 },
    highlights: ['Perito Moreno Glacier', 'Fitz Roy Massif', 'Torres del Paine', 'Tierra del Fuego'],
    description: 'Patagonia is where the Earth shows off. Jagged granite towers pierce the sky, ancient glaciers crack and thunder into turquoise lakes, and guanacos roam vast steppe under impossibly wide skies. This is wilderness at its most dramatic and humbling.',
    tips: ['Book refugios (mountain huts) months in advance', 'Layer clothing — weather changes in minutes', 'Bring high SPF — UV is intense even when cold', 'Shoulder season (Oct/Nov, Mar/Apr) has fewer crowds', 'Rent a car for flexibility between parks'],
    suggestedItinerary: [
      { day: 1, title: 'El Calafate Arrival', activities: ['Arrive El Calafate', 'Settle into lodge', 'Lake Argentino sunset walk', 'Patagonian lamb dinner'] },
      { day: 2, title: 'Perito Moreno Glacier', activities: ['Glacier viewing platforms', 'Mini-trek on ice', 'Boat navigation', 'Whisky with glacier ice'] },
      { day: 3, title: 'El Chaltén Transfer', activities: ['Drive to El Chaltén', 'Short trail hike', 'Condor spotting', 'Craft beer evening'] },
      { day: 4, title: 'Fitz Roy Trek', activities: ['Laguna de los Tres hike', 'Sunrise at Fitz Roy', 'Picnic lunch at lake', 'Return via different trail'] },
      { day: 5, title: 'Torres del Paine', activities: ['Cross to Chile', 'Base of the Towers trek', 'Grey Glacier viewpoint', 'Refugio overnight'] }
    ],
    estimatedBudgetPerDay: 95,
    currency: 'ARS',
    bestSeason: 'Summer (Nov-Mar)',
    language: 'Spanish',
    emoji: '🏔️',
    gradient: 'from-blue-200 via-slate-100 to-emerald-100',
    stamp: 'PATAGONIA'
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    moods: ['relaxation', 'culture', 'nightlife'],
    budget: 'luxury',
    climate: 'mediterranean',
    activities: ['Sunset watching', 'Wine tasting', 'Sailing cruises', 'Beach hopping', 'Archaeological sites', 'Photography'],
    duration: { min: 3, max: 6 },
    highlights: ['Oia sunset', 'Caldera views', 'Red Beach', 'Ancient Akrotiri'],
    description: 'Santorini is a postcard that somehow exceeds its own legend. Whitewashed villages cascade down volcanic cliffs into the deepest blue caldera, while sunsets paint the sky in colors that seem almost unfair. Romance and beauty are woven into every stone.',
    tips: ['Stay in Oia for sunsets, Fira for nightlife', 'Book caldera-view hotels months ahead', 'Visit in May or September to avoid peak crowds', 'Take the boat to the volcanic hot springs', 'Rent an ATV — roads are narrow for cars'],
    suggestedItinerary: [
      { day: 1, title: 'Arrival & Fira', activities: ['Arrive by ferry or flight', 'Explore Fira town', 'Caldera walk', 'First sunset with wine'] },
      { day: 2, title: 'Oia & Sailing', activities: ['Morning in Oia', 'Catamaran caldera cruise', 'Hot springs swim', 'Famous Oia sunset'] },
      { day: 3, title: 'Beaches & History', activities: ['Red Beach morning', 'Akrotiri archaeological site', 'Wine tasting tour', 'Ammoudi Bay seafood dinner'] },
      { day: 4, title: 'Leisure & Departure', activities: ['Pool morning', 'Village of Pyrgos', 'Local shopping', 'Departure'] }
    ],
    estimatedBudgetPerDay: 200,
    currency: 'EUR',
    bestSeason: 'May-June or September-October',
    language: 'Greek',
    emoji: '🏛️',
    gradient: 'from-blue-200 via-white to-orange-100',
    stamp: 'ΣΑΝΤΟΡΙΝΗ'
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    moods: ['wellness', 'nature', 'culture', 'adventure'],
    budget: 'budget',
    climate: 'tropical',
    activities: ['Yoga retreats', 'Rice terrace walks', 'Surfing', 'Temple ceremonies', 'Waterfall hikes', 'Snorkeling'],
    duration: { min: 5, max: 14 },
    highlights: ['Tegallalang Rice Terraces', 'Uluwatu Temple', 'Mount Batur sunrise', 'Ubud Monkey Forest'],
    description: 'Bali is an island that works its magic slowly. Between emerald rice paddies, ancient temples wreathed in incense smoke, and surf breaks that draw pilgrims from around the world, you find a rhythm that is entirely its own. Wellness, adventure, and spirituality coexist effortlessly.',
    tips: ['Rent a scooter but drive carefully', 'Visit temples with proper sarong coverage', 'Ubud for culture, Seminyak for nightlife, Uluwatu for surf', 'Avoid rainy season (Dec-Feb) if possible', 'Try a Balinese massage — incredibly affordable'],
    suggestedItinerary: [
      { day: 1, title: 'Ubud Arrival', activities: ['Check into jungle villa', 'Tegallalang Rice Terraces', 'Ubud Market exploration', 'Traditional dance performance'] },
      { day: 2, title: 'Spiritual Ubud', activities: ['Sunrise yoga session', 'Tirta Empul water temple', 'Monkey Forest visit', 'Organic restaurant dinner'] },
      { day: 3, title: 'Mount Batur', activities: ['2am wake-up for sunrise trek', 'Breakfast at volcano summit', 'Hot springs recovery', 'Afternoon spa treatment'] },
      { day: 4, title: 'South Bali', activities: ['Transfer to Uluwatu', 'Uluwatu Temple & Kecak dance', 'Surf lesson at Padang Padang', 'Seafood at Jimbaran Bay'] },
      { day: 5, title: 'Island Hopping', activities: ['Day trip to Nusa Penida', 'Kelingking Beach viewpoint', 'Snorkeling with manta rays', 'Return for sunset'] }
    ],
    estimatedBudgetPerDay: 45,
    currency: 'IDR',
    bestSeason: 'April-October (dry season)',
    language: 'Indonesian / Balinese',
    emoji: '🌺',
    gradient: 'from-emerald-200 via-lime-100 to-teal-100',
    stamp: 'बाली'
  },
  {
    id: 'iceland-ring-road',
    name: 'Iceland Ring Road',
    country: 'Iceland',
    region: 'europe',
    moods: ['adventure', 'nature'],
    budget: 'luxury',
    climate: 'alpine',
    activities: ['Northern lights', 'Glacier hiking', 'Hot spring bathing', 'Whale watching', 'Ice cave exploration', 'Road tripping'],
    duration: { min: 7, max: 14 },
    highlights: ['Golden Circle', 'Jökulsárlón Glacier Lagoon', 'Blue Lagoon', 'Skógafoss Waterfall'],
    description: 'Iceland is Earth\'s rough draft — a place where tectonic plates pull apart, volcanoes simmer beneath glaciers, and waterfalls plunge from moss-covered cliffs into black sand beaches. Driving the Ring Road feels like crossing another planet, one impossible vista at a time.',
    tips: ['Book campervan or 4x4 for flexibility', 'Weather changes every 15 minutes — pack layers', 'Download offline maps — signal is patchy', 'Hot dogs are a legitimate food experience', 'Never drive off-road — fragile ecosystems'],
    suggestedItinerary: [
      { day: 1, title: 'Reykjavik & Golden Circle', activities: ['Arrive Reykjavik', 'Þingvellir National Park', 'Geysir geothermal area', 'Gullfoss waterfall'] },
      { day: 2, title: 'South Coast', activities: ['Seljalandsfoss waterfall', 'Skógafoss waterfall', 'Reynisfjara Black Beach', 'Vík village overnight'] },
      { day: 3, title: 'Glacier Lagoon', activities: ['Skaftafell glacier hike', 'Jökulsárlón lagoon boat tour', 'Diamond Beach', 'Seal watching'] },
      { day: 4, title: 'East Fjords', activities: ['Scenic fjord driving', 'Djúpivogur village', 'Reindeer spotting', 'Hot pot soaking'] },
      { day: 5, title: 'North Iceland', activities: ['Dettifoss waterfall', 'Mývatn nature baths', 'Goðafoss waterfall', 'Akureyri town'] }
    ],
    estimatedBudgetPerDay: 180,
    currency: 'ISK',
    bestSeason: 'June-August (midnight sun) or Sep-Mar (northern lights)',
    language: 'Icelandic',
    emoji: '🌋',
    gradient: 'from-slate-200 via-blue-100 to-gray-100',
    stamp: 'ÍSLAND'
  },
  {
    id: 'queenstown-nz',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'oceania',
    moods: ['adventure', 'nature', 'relaxation'],
    budget: 'mid-range',
    climate: 'temperate',
    activities: ['Bungee jumping', 'Skiing', 'Jet boating', 'Wine tours', 'Hiking', 'Stargazing'],
    duration: { min: 4, max: 8 },
    highlights: ['Milford Sound', 'Remarkables Ski Area', 'Lake Wakatipu', 'Glenorchy'],
    description: 'Queenstown sits on the shores of crystal-clear Lake Wakatipu, cradled by the dramatic Remarkables mountain range. Known as the adventure capital of the world, it offers everything from bungee jumping to serene wine country — often in the same day.',
    tips: ['Book Milford Sound trip well in advance', 'The Fergburger is worth the queue', 'Rent a car to explore Glenorchy road', 'Winter (Jun-Aug) for skiing, summer for hiking', 'Try a Fergburger — yes, it\'s that good'],
    suggestedItinerary: [
      { day: 1, title: 'Arrival & Lake', activities: ['Arrive Queenstown', 'Skyline Gondola ride', 'Luge runs', 'Lakefront dinner'] },
      { day: 2, title: 'Adventure Day', activities: ['Morning bungee at Kawarau Bridge', 'Shotover Jet boat ride', 'Afternoon wine tasting', 'Fergburger for dinner'] },
      { day: 3, title: 'Milford Sound', activities: ['Early drive to Milford', 'Scenic stops en route', 'Cruise the fiord', 'Waterfalls & wildlife'] },
      { day: 4, title: 'Glenorchy & Nature', activities: ['Drive to Glenorchy', 'Routeburn Track day hike', 'Paradise valley exploration', 'Stargazing evening'] }
    ],
    estimatedBudgetPerDay: 140,
    currency: 'NZD',
    bestSeason: 'Dec-Feb (summer) or Jun-Aug (skiing)',
    language: 'English',
    emoji: '🏔️',
    gradient: 'from-teal-200 via-cyan-100 to-emerald-100',
    stamp: 'AOTEAROA'
  },
  {
    id: 'lisbon-portugal',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'europe',
    moods: ['culture', 'nightlife', 'relaxation'],
    budget: 'budget',
    climate: 'mediterranean',
    activities: ['Tram riding', 'Fado music', 'Pastéis de nata tasting', 'Surfing', 'Street art tours', 'Wine bars'],
    duration: { min: 3, max: 6 },
    highlights: ['Alfama District', 'Belém Tower', 'Time Out Market', 'Sintra Day Trip'],
    description: 'Lisbon spills down seven hills to the Tagus River in a tumble of pastel buildings, vintage trams, and miradouros with sweeping views. It\'s a city that balances melancholic fado music with vibrant nightlife, ancient history with creative energy, all bathed in golden Atlantic light.',
    tips: ['Wear comfortable shoes — the hills are real', 'Tram 28 is iconic but crowded — go early', 'Try ginjinha (cherry liqueur) at A Ginjinha', 'Get the Lisboa Card for transit + museums', 'Sintra is a must day trip — go on weekdays'],
    suggestedItinerary: [
      { day: 1, title: 'Alfama & History', activities: ['São Jorge Castle', 'Alfama neighborhood walk', 'Tram 28 ride', 'Fado dinner in Alfama'] },
      { day: 2, title: 'Belém & Culture', activities: ['Jerónimos Monastery', 'Belém Tower', 'Pastéis de Belém', 'MAAT museum'] },
      { day: 3, title: 'Bairro Alto & Nightlife', activities: ['LX Factory creative hub', 'Time Out Market lunch', 'Bairro Alto bar crawl', 'Miradouro sunset'] },
      { day: 4, title: 'Sintra Day Trip', activities: ['Pena Palace', 'Quinta da Regaleira', 'Moorish Castle walls', 'Return for seafood dinner'] }
    ],
    estimatedBudgetPerDay: 70,
    currency: 'EUR',
    bestSeason: 'March-October',
    language: 'Portuguese',
    emoji: '🚋',
    gradient: 'from-yellow-200 via-orange-100 to-blue-100',
    stamp: 'LISBOA'
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
    country: 'Costa Rica',
    region: 'americas',
    moods: ['adventure', 'nature', 'wellness'],
    budget: 'mid-range',
    climate: 'tropical',
    activities: ['Zip-lining', 'Wildlife watching', 'Volcano hiking', 'Surfing', 'Hot springs', 'Coffee tours'],
    duration: { min: 7, max: 12 },
    highlights: ['Arenal Volcano', 'Monteverde Cloud Forest', 'Manuel Antonio Beach', 'Tortuguero Canal'],
    description: 'Pura Vida isn\'t just a saying — it\'s a way of life that permeates everything in Costa Rica. Between cloud forests dripping with orchids, volcanoes ringed by hot springs, and coastlines where monkeys swing above surf breaks, this small country punches far above its weight in natural wonder.',
    tips: ['Rent a 4x4 — many roads are unpaved', 'Green season (May-Nov) has lower prices and lush scenery', 'Bring binoculars for wildlife', 'Book zip-line tours in Monteverde', 'Don\'t try to see everything — pick 2-3 regions'],
    suggestedItinerary: [
      { day: 1, title: 'San José to Arenal', activities: ['Arrive San José', 'Drive to La Fortuna', 'Arenal Volcano views', 'Hot springs evening'] },
      { day: 2, title: 'Arenal Adventures', activities: ['Hanging bridges walk', 'Zip-line canopy tour', 'La Fortuna waterfall hike', 'Volcanic mud bath'] },
      { day: 3, title: 'Monteverde', activities: ['Drive to Monteverde', 'Cloud forest night tour', 'Hanging bridges', 'Coffee plantation visit'] },
      { day: 4, title: 'Pacific Coast', activities: ['Transfer to Manuel Antonio', 'Beach afternoon', 'National park wildlife', 'Sunset catamaran'] },
      { day: 5, title: 'Manuel Antonio', activities: ['Park morning hike', 'Sloth spotting', 'Snorkeling tour', 'Beach relaxation'] }
    ],
    estimatedBudgetPerDay: 85,
    currency: 'CRC',
    bestSeason: 'December-April (dry season)',
    language: 'Spanish',
    emoji: '🦜',
    gradient: 'from-green-200 via-emerald-100 to-yellow-100',
    stamp: 'PURA VIDA'
  }
];

export const regionLabels: Record<Region, string> = {
  asia: 'Asia',
  europe: 'Europe',
  americas: 'Americas',
  africa: 'Africa',
  oceania: 'Oceania'
};

export const moodLabels: Record<Mood, { label: string; emoji: string }> = {
  adventure: { label: 'Adventure', emoji: '🧗' },
  relaxation: { label: 'Relaxation', emoji: '🧘' },
  culture: { label: 'Culture', emoji: '🏛️' },
  nature: { label: 'Nature', emoji: '🌿' },
  nightlife: { label: 'Nightlife', emoji: '🌙' },
  wellness: { label: 'Wellness', emoji: '💆' }
};

export const budgetLabels: Record<Budget, string> = {
  budget: 'Budget-Friendly',
  'mid-range': 'Mid-Range',
  luxury: 'Luxury'
};

export const climateLabels: Record<Climate, string> = {
  tropical: 'Tropical',
  temperate: 'Temperate',
  arid: 'Arid / Desert',
  mediterranean: 'Mediterranean',
  alpine: 'Alpine / Cold',
  polar: 'Polar'
};
