import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './store/AppContext';
import { Navigation } from './components/Navigation';
import { Discovery } from './pages/Discovery';
import { DestinationDetail } from './pages/DestinationDetail';
import { ItineraryBuilder } from './pages/ItineraryBuilder';
import { SavedDestinations } from './pages/SavedDestinations';
import { TripSummary } from './pages/TripSummary';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Discovery />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/itinerary/:tripId" element={<ItineraryBuilder />} />
        <Route path="/saved" element={<SavedDestinations />} />
        <Route path="/summary" element={<TripSummary />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-earth-50 paper-texture">
          <AnimatedRoutes />
          <Navigation />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
