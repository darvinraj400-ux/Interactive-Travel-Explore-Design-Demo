import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, DollarSign, Globe, Clock, Heart, Plus, Lightbulb, CheckCircle } from 'lucide-react';
import { destinations, moodLabels, budgetLabels, climateLabels } from '../data/destinations';
import { useApp } from '../store/AppContext';

export function DestinationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDestinationSaved, dispatch, getTripForDestination, state } = useApp();

  const destination = destinations.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="font-serif text-2xl text-earth-800 mb-2">Destination not found</h2>
          <p className="text-earth-500 mb-4">This destination doesn't exist in our atlas.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium"
          >
            Back to Explorer
          </button>
        </div>
      </div>
    );
  }

  const saved = isDestinationSaved(destination.id);
  const existingTrip = getTripForDestination(destination.id);

  const handleStartPlanning = () => {
    if (existingTrip) {
      navigate(`/itinerary/${existingTrip.id}`);
    } else {
      const newTripId = `trip-${Date.now()}`;
      dispatch({ type: 'CREATE_TRIP', destinationId: destination.id, tripId: newTripId });
      navigate(`/itinerary/${newTripId}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20 md:pb-8"
    >
      {/* Hero */}
      <div className={`relative h-64 md:h-80 lg:h-96 bg-gradient-to-br ${destination.gradient} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl md:text-9xl opacity-40">{destination.emoji}</span>
        </div>
        
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-earth-800/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-earth-800/80 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Save button */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SAVE_DESTINATION', destinationId: destination.id })}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            saved ? 'bg-sunset-500 text-white' : 'bg-earth-800/60 backdrop-blur-sm text-white hover:bg-earth-800/80'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save destination'}
        >
          <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>

        {/* Stamp */}
        <motion.div
          initial={{ scale: 2, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="absolute bottom-4 right-4 bg-earth-800/80 backdrop-blur-sm text-earth-100 px-3 py-1.5 rounded-md font-mono text-sm font-bold border-2 border-earth-500"
        >
          {destination.stamp}
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative z-10 max-w-4xl mx-auto">
        {/* Title card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-earth-50 rounded-2xl shadow-lg p-5 md:p-6 border border-earth-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-earth-800">
                {destination.name}
              </h1>
              <p className="text-earth-500 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {destination.country}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-earth-400 font-mono uppercase">Est. budget</div>
              <div className="text-lg font-bold text-forest-600">~${destination.estimatedBudgetPerDay}</div>
              <div className="text-[10px] text-earth-400">per day</div>
            </div>
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <InfoChip icon={<Calendar size={14} />} label="Duration" value={`${destination.duration.min}-${destination.duration.max} days`} />
            <InfoChip icon={<Globe size={14} />} label="Climate" value={climateLabels[destination.climate]} />
            <InfoChip icon={<DollarSign size={14} />} label="Budget" value={budgetLabels[destination.budget]} />
            <InfoChip icon={<Clock size={14} />} label="Best Season" value={destination.bestSeason.split('(')[0].trim()} />
          </div>

          {/* Moods */}
          <div className="flex flex-wrap gap-2 mt-4">
            {destination.moods.map(mood => (
              <span key={mood} className="px-2.5 py-1 bg-earth-100 text-earth-700 rounded-full text-xs font-medium">
                {moodLabels[mood].emoji} {moodLabels[mood].label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h2 className="font-serif text-xl font-bold text-earth-800 mb-2">The Story</h2>
          <p className="text-earth-600 leading-relaxed text-sm md:text-base">{destination.description}</p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className="font-serif text-xl font-bold text-earth-800 mb-3">Must-See Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {destination.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 bg-earth-100 rounded-lg"
              >
                <CheckCircle size={14} className="text-forest-500 shrink-0" />
                <span className="text-sm text-earth-700">{h}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h2 className="font-serif text-xl font-bold text-earth-800 mb-3">Activities</h2>
          <div className="flex flex-wrap gap-2">
            {destination.activities.map(activity => (
              <span key={activity} className="px-3 py-1.5 bg-forest-50 border border-forest-200 text-forest-700 rounded-full text-xs font-medium">
                {activity}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Practical Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <h2 className="font-serif text-xl font-bold text-earth-800 mb-3 flex items-center gap-2">
            <Lightbulb size={20} className="text-sunset-400" /> Practical Tips
          </h2>
          <div className="space-y-2">
            {destination.tips.map((tip, i) => (
              <div key={i} className="flex gap-2 px-3 py-2 bg-sunset-50 border border-sunset-100 rounded-lg">
                <span className="text-sunset-400 font-bold text-sm shrink-0">•</span>
                <span className="text-sm text-earth-700">{tip}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Suggested Itinerary Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <h2 className="font-serif text-xl font-bold text-earth-800 mb-3">Suggested Itinerary</h2>
          <div className="space-y-3">
            {destination.suggestedItinerary.map((day) => (
              <div key={day.day} className="border-l-2 border-earth-300 pl-4 py-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-sunset-500">DAY {day.day}</span>
                  <span className="text-sm font-semibold text-earth-800">{day.title}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {day.activities.map((act, i) => (
                    <span key={i} className="text-[11px] text-earth-500">
                      {act}{i < day.activities.length - 1 ? ' →' : ''}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mb-4 flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SAVE_DESTINATION', destinationId: destination.id })}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
              saved
                ? 'bg-earth-200 text-earth-700 hover:bg-earth-300'
                : 'bg-earth-800 text-earth-100 hover:bg-earth-700'
            }`}
          >
            <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
            {saved ? 'Saved ✓' : 'Save Destination'}
          </button>
          <button
            onClick={handleStartPlanning}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-sunset-500 text-white rounded-xl font-medium text-sm hover:bg-sunset-600 transition-colors shadow-md"
          >
            <Plus size={18} />
            {existingTrip ? 'Edit Itinerary' : 'Start Planning'}
          </button>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[11px] text-earth-400 font-mono mt-2 mb-4">
          * All prices, durations, and information are sample estimates for demonstration purposes. Not live travel data.
        </p>
      </div>
    </motion.div>
  );
}

function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-2 bg-earth-50 border border-earth-200 rounded-lg">
      <span className="text-earth-400">{icon}</span>
      <div>
        <div className="text-[10px] text-earth-400 uppercase">{label}</div>
        <div className="text-xs font-semibold text-earth-700">{value}</div>
      </div>
    </div>
  );
}
