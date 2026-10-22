import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Clock, Edit3, Trash2, ArrowRight, Globe } from 'lucide-react';
import { destinations, regionLabels } from '../data/destinations';
import { useApp } from '../store/AppContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

export function TripSummary() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const tripPlans = state.tripPlans;
  const savedDests = destinations.filter(d => state.savedDestinations.includes(d.id));

  // Calculate totals
  const totalBudget = tripPlans.reduce((sum, trip) => {
    const dest = destinations.find(d => d.id === trip.destinationId);
    if (dest) {
      return sum + (dest.estimatedBudgetPerDay * trip.days.length);
    }
    return sum;
  }, 0);

  const totalDays = tripPlans.reduce((sum, trip) => sum + trip.days.length, 0);
  const totalActivities = tripPlans.reduce((sum, trip) =>
    sum + trip.days.reduce((dSum, day) => dSum + day.activities.length, 0), 0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-4 py-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center">
          <Globe size={20} className="text-forest-600" />
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-earth-800">Trip Summary</h1>
          <p className="text-sm text-earth-500">Your planned adventures at a glance</p>
        </div>
      </div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
      >
        <StatCard icon={<Calendar size={18} />} label="Trip Plans" value={tripPlans.length.toString()} color="earth" />
        <StatCard icon={<Clock size={18} />} label="Total Days" value={totalDays.toString()} color="forest" />
        <StatCard icon={<MapPin size={18} />} label="Activities" value={totalActivities.toString()} color="sunset" />
        <StatCard icon={<DollarSign size={18} />} label="Est. Budget" value={`$${totalBudget}`} color="sky" />
      </motion.div>

      {/* Trip Plans */}
      <div className="mb-8">
        <h2 className="font-serif text-lg font-bold text-earth-800 mb-3">Your Itineraries</h2>
        
        {tripPlans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-earth-100 rounded-2xl border border-dashed border-earth-300"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-serif text-lg text-earth-700 mb-2">No itineraries yet</h3>
            <p className="text-sm text-earth-500 mb-4">Start planning a trip from a destination page</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium"
            >
              Explore Destinations
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {tripPlans.map(trip => {
              const dest = destinations.find(d => d.id === trip.destinationId);
              if (!dest) return null;
              const tripBudget = dest.estimatedBudgetPerDay * trip.days.length;
              const tripActivities = trip.days.reduce((sum, d) => sum + d.activities.length, 0);
              const completedActivities = trip.days.reduce((sum, d) => sum + d.activities.filter(a => a.completed).length, 0);

              return (
                <motion.div
                  key={trip.id}
                  variants={itemVariants}
                  className="bg-earth-50 border border-earth-200 rounded-xl overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${dest.gradient}`} />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{dest.emoji}</span>
                        <div>
                          <h3 className="font-serif text-base font-bold text-earth-800">{dest.name}</h3>
                          <p className="text-xs text-earth-500">{dest.country} · {regionLabels[dest.region]}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => navigate(`/itinerary/${trip.id}`)}
                          className="w-8 h-8 rounded-lg bg-earth-100 flex items-center justify-center text-earth-500 hover:bg-earth-200 transition-colors"
                          aria-label="Edit itinerary"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => dispatch({ type: 'DELETE_TRIP', tripId: trip.id })}
                          className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors"
                          aria-label="Delete trip"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Trip details */}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="text-center p-2 bg-earth-100 rounded-lg">
                        <div className="text-xs text-earth-400">Days</div>
                        <div className="text-sm font-bold text-earth-700">{trip.days.length}</div>
                      </div>
                      <div className="text-center p-2 bg-earth-100 rounded-lg">
                        <div className="text-xs text-earth-400">Activities</div>
                        <div className="text-sm font-bold text-earth-700">{completedActivities}/{tripActivities}</div>
                      </div>
                      <div className="text-center p-2 bg-earth-100 rounded-lg">
                        <div className="text-xs text-earth-400">Est. Budget</div>
                        <div className="text-sm font-bold text-forest-600">${tripBudget}</div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    {tripActivities > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-earth-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round((completedActivities / tripActivities) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-earth-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(completedActivities / tripActivities) * 100}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-forest-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => navigate(`/itinerary/${trip.id}`)}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium hover:bg-earth-700 transition-colors"
                    >
                      Open Itinerary <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Saved Destinations Quick View */}
      {savedDests.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif text-lg font-bold text-earth-800 mb-3">Saved for Later</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {savedDests.map(dest => (
              <button
                key={dest.id}
                onClick={() => navigate(`/destination/${dest.id}`)}
                className={`shrink-0 w-24 h-28 rounded-xl bg-gradient-to-br ${dest.gradient} flex flex-col items-center justify-center gap-1 hover:scale-105 transition-transform`}
              >
                <span className="text-2xl">{dest.emoji}</span>
                <span className="text-[10px] font-semibold text-earth-700 text-center px-1 truncate w-full">{dest.name}</span>
                <span className="text-[9px] text-earth-500">~${dest.estimatedBudgetPerDay}/day</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Budget Breakdown */}
      {tripPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-earth-50 border border-earth-200 rounded-xl p-4"
        >
          <h3 className="font-serif text-base font-bold text-earth-800 mb-3 flex items-center gap-2">
            <DollarSign size={18} className="text-forest-500" /> Budget Breakdown
          </h3>
          <div className="space-y-2">
            {tripPlans.map(trip => {
              const dest = destinations.find(d => d.id === trip.destinationId);
              if (!dest) return null;
              const tripBudget = dest.estimatedBudgetPerDay * trip.days.length;
              return (
                <div key={trip.id} className="flex items-center justify-between py-1.5 border-b border-earth-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span>{dest.emoji}</span>
                    <span className="text-sm text-earth-700">{dest.name}</span>
                    <span className="text-[10px] text-earth-400">({trip.days.length}d × ${dest.estimatedBudgetPerDay})</span>
                  </div>
                  <span className="text-sm font-bold text-earth-800">${tripBudget}</span>
                </div>
              );
            })}
            <div className="flex items-center justify-between pt-2 border-t-2 border-earth-300">
              <span className="text-sm font-bold text-earth-800">Total Estimated</span>
              <span className="text-lg font-bold text-forest-600">${totalBudget}</span>
            </div>
          </div>
          <p className="text-[11px] text-earth-400 font-mono mt-3">
            * All prices are sample estimates for demonstration purposes. Actual costs may vary significantly based on season, accommodation choices, and travel style.
          </p>
        </motion.div>
      )}

      {/* Empty state when nothing saved or planned */}
      {tripPlans.length === 0 && savedDests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-8 bg-sunset-50 border border-sunset-100 rounded-xl"
        >
          <p className="text-sm text-sunset-700">
            Start by <button onClick={() => navigate('/')} className="underline font-semibold">exploring destinations</button> and planning your dream trips!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    earth: 'bg-earth-100 text-earth-700',
    forest: 'bg-forest-100 text-forest-700',
    sunset: 'bg-sunset-100 text-sunset-700',
    sky: 'bg-sky-100 text-sky-700',
  };

  return (
    <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] uppercase font-semibold opacity-70">{label}</span>
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
