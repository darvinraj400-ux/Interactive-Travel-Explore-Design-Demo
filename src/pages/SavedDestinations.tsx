import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { destinations, moodLabels } from '../data/destinations';
import { useApp } from '../store/AppContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

export function SavedDestinations() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const savedDests = destinations.filter(d => state.savedDestinations.includes(d.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-4 py-6 pb-20 md:pb-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-sunset-100 flex items-center justify-center">
          <Heart size={20} className="text-sunset-500" fill="currentColor" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-earth-800">Saved Destinations</h1>
          <p className="text-sm text-earth-500">Your personal collection of dream places</p>
        </div>
      </div>

      {savedDests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-earth-100 rounded-2xl border border-dashed border-earth-300"
        >
          <div className="text-5xl mb-4">💝</div>
          <h2 className="font-serif text-xl text-earth-700 mb-2">No saved destinations yet</h2>
          <p className="text-sm text-earth-500 mb-6 max-w-sm mx-auto">
            Explore destinations and tap the heart icon to save places you'd love to visit.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-earth-800 text-earth-100 rounded-xl text-sm font-medium hover:bg-earth-700 transition-colors"
          >
            Start Exploring
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {savedDests.map(dest => (
            <motion.div
              key={dest.id}
              variants={itemVariants}
              layout
              className="flex items-center gap-3 bg-earth-50 border border-earth-200 rounded-xl p-3 hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <button
                onClick={() => navigate(`/destination/${dest.id}`)}
                className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${dest.gradient} flex items-center justify-center overflow-hidden`}
              >
                <span className="text-3xl md:text-4xl">{dest.emoji}</span>
              </button>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => navigate(`/destination/${dest.id}`)}
                  className="text-left w-full"
                >
                  <h3 className="font-serif text-base font-bold text-earth-800 hover:text-sunset-600 transition-colors truncate">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-earth-500 flex items-center gap-1">
                    <MapPin size={10} /> {dest.country}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dest.moods.slice(0, 2).map(mood => (
                      <span key={mood} className="text-[10px] px-1.5 py-0.5 bg-earth-100 text-earth-600 rounded-full">
                        {moodLabels[mood].emoji} {moodLabels[mood].label}
                      </span>
                    ))}
                  </div>
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => navigate(`/destination/${dest.id}`)}
                  className="w-9 h-9 rounded-lg bg-earth-100 flex items-center justify-center text-earth-500 hover:bg-earth-200 hover:text-earth-700 transition-colors"
                  aria-label="View details"
                >
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_SAVE_DESTINATION', destinationId: dest.id })}
                  className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                  aria-label="Remove from saved"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-6 p-4 bg-forest-50 border border-forest-200 rounded-xl"
          >
            <p className="text-sm text-forest-700">
              <span className="font-bold">{savedDests.length}</span> destination{savedDests.length !== 1 ? 's' : ''} saved.
              Ready to plan? View your <button onClick={() => navigate('/summary')} className="underline font-semibold hover:text-forest-800">trip summary</button>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
