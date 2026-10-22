# ROAM ATLAS

An immersive destination discovery and trip-planning web application designed as a digital travel journal. ROAM ATLAS combines cinematic design, map-inspired graphics, and interactive features to encourage exploration and adventure planning.

## 🌍 Overview

ROAM ATLAS is a modern travel discovery platform that helps users explore destinations, plan itineraries, and organize their dream trips. Built with a focus on mobile-first design, smooth animations, and an engaging user experience that feels like flipping through a travel journal.

## ✨ Features

### Destination Discovery
- **Region-based browsing**: Explore destinations organized by Asia, Europe, Americas, Africa, and Oceania
- **Advanced filtering**: Filter by travel mood (adventure, relaxation, culture, nature, nightlife, wellness), budget level, climate type, and trip duration
- **Search functionality**: Quick search across destination names and countries
- **Visual cards**: Beautiful gradient-based destination cards with emoji icons and passport-style stamps

### Destination Profiles
- **Detailed information**: Comprehensive destination data including highlights, activities, practical tips, and suggested itineraries
- **Visual design**: Each destination has unique gradient themes and cultural stamps
- **Practical info**: Estimated daily budgets, best seasons, climate, and duration recommendations
- **Save functionality**: Bookmark destinations to your personal collection

### Itinerary Builder
- **Day-by-day planning**: Create custom itineraries with multiple days
- **Activity management**: Add, remove, and reorder activities within each day
- **Drag-and-drop**: Reorder days and activities using intuitive drag-and-drop
- **Progress tracking**: Mark activities as completed and track your progress
- **Load suggestions**: Start with pre-built suggested itineraries for each destination
- **Notes**: Add personal notes to your trip plans

### Trip Management
- **Saved destinations**: Collection of bookmarked destinations persisted in localStorage
- **Trip summary**: Overview of all planned trips with budget breakdowns
- **Budget estimates**: Calculate total estimated costs across all trips
- **Progress visualization**: Track completion of planned activities

## 🎨 Design Philosophy

### Mobile-First Approach
- Designed for mobile screens starting at 320px width
- Progressive enhancement for tablets and desktops
- Touch-friendly interface with 44×44px minimum touch targets
- Responsive typography and spacing
- Safe area support for modern mobile devices

### Visual Identity
- **Earthy color palette**: Warm browns, forest greens, sunset oranges, and sky blues
- **Typography**: Playfair Display for headings (serif), Inter for body text (sans-serif)
- **Travel journal aesthetic**: Passport stamps, map illustrations, and editorial-style layouts
- **Smooth animations**: Framer Motion for page transitions, scroll reveals, and interactive feedback

### Accessibility
- Respects `prefers-reduced-motion` settings
- Keyboard navigation support
- Semantic HTML structure
- ARIA labels for interactive elements
- Sufficient color contrast

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **React Router v6** - Client-side routing
- **dnd-kit** - Drag-and-drop functionality
- **Lucide React** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Responsive navigation with mobile/desktop variants
│   └── StylizedMap.tsx      # Animated SVG world map illustration
├── data/
│   └── destinations.ts      # Destination data and type definitions
├── pages/
│   ├── Discovery.tsx        # Main destination browsing page
│   ├── DestinationDetail.tsx # Individual destination profile
│   ├── ItineraryBuilder.tsx  # Day-by-day trip planning
│   ├── SavedDestinations.tsx # Bookmarked destinations collection
│   └── TripSummary.tsx      # Overview of all trips and budgets
├── store/
│   └── AppContext.tsx       # Global state management with localStorage persistence
├── App.tsx                  # Main app component with routing
├── main.tsx                 # Application entry point
└── index.css                # Global styles and Tailwind configuration
```

## 🗺️ Sample Destinations

The app includes 9 handcrafted destinations with realistic data:

1. **Kyoto, Japan** - Cultural temples and traditional experiences
2. **Marrakech, Morocco** - Vibrant medinas and desert adventures
3. **Patagonia, Argentina** - Dramatic landscapes and glacier trekking
4. **Santorini, Greece** - Romantic sunsets and Mediterranean charm
5. **Bali, Indonesia** - Wellness retreats and tropical paradise
6. **Iceland Ring Road** - Northern lights and volcanic landscapes
7. **Queenstown, New Zealand** - Adventure capital with stunning scenery
8. **Lisbon, Portugal** - Historic trams and coastal beauty
9. **Costa Rica** - Rainforest adventures and pura vida lifestyle

Each destination includes:
- 4-5 day suggested itineraries
- Practical travel tips
- Activity recommendations
- Budget estimates (clearly marked as samples)
- Best travel seasons

## 🎯 Key Implementation Details

### State Management
- React Context API for global state
- useReducer for complex state logic
- Automatic localStorage persistence
- Type-safe actions and state

### Routing
- React Router v6 for client-side navigation
- Animated route transitions with AnimatePresence
- Nested route structure for logical organization

### Animations
- Page transitions with fade and slide effects
- Staggered content reveals on scroll
- Interactive hover states and button feedback
- Drag-and-drop animations for itinerary building
- Respect for reduced-motion preferences

### Responsive Design
- Mobile bottom navigation with active state indicators
- Desktop top navigation with horizontal layout
- Adaptive grid layouts (1 column mobile → 3 columns desktop)
- Touch-optimized controls and gestures

## 📱 Mobile Navigation

The app features a dual navigation system:
- **Mobile**: Fixed top header with hamburger menu + bottom tab bar
- **Desktop**: Fixed top navigation bar with horizontal menu
- Both include badges showing saved destination count

## 💾 Data Persistence

All user data is automatically saved to localStorage:
- Saved destinations
- Trip plans and itineraries
- Activity completion status
- Personal notes

## ⚠️ Important Notes

- **Sample Data Only**: All prices, durations, and travel information are estimates for demonstration purposes
- **No Live Data**: This is a frontend-only application with no backend or API integrations
- **No Real Bookings**: The app does not facilitate actual travel bookings or payments
- **Educational Purpose**: Designed as a portfolio project showcasing modern web development techniques

## 🎨 Color Palette

- **Earth tones**: `#2d1b0e` to `#faf7f2` (browns and creams)
- **Forest**: `#051309` to `#f0f7f4` (greens)
- **Sunset**: `#1f0e06` to `#fef5f0` (oranges)
- **Sky**: `#05131b` to `#f0f7fa` (blues)

## 🔧 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- CSS Grid and Flexbox support required

## 📄 License

This project is created for educational and portfolio purposes.

## 🚀 Future Enhancements

Potential features for future development:
- Integration with real travel APIs
- User authentication and cloud sync
- Social sharing of itineraries
- Weather integration
- Currency conversion
- Photo galleries for destinations
- Collaborative trip planning
- Offline support with service workers

---

Built with ❤️ for travelers and dreamers everywhere.
