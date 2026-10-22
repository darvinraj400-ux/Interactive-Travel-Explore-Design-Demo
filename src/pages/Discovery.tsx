import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X, MapPin, DollarSign, Sun, Clock, Compass } from 'lucide-react';
import { destinations, Region, Mood, Budget, Climate, regionLabels, moodLabels, budgetLabels, climateLabels } from '../data/destinations';
import { useApp } from '../store/AppContext';
import { StylizedMap } from '../components/StylizedMap';

type DurationRange = 'short' | 'medium' | 'long';

interface Filters {
  search: string;
  region: Region | null;
  mood: Mood | null;
  budget: Budget | null;
  climate: Climate | null;
  duration: DurationRange | null;
}

const durationOptions: { key: DurationRange; label: string; range: string }[] = [
  { key: 'short', label: 'Weekend', range: '1-3 days' },
  { key: 'medium', label: 'Week', range: '4-7 days' },
  { key: 'long', label: 'Extended', range: '8+ days' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

export function Discovery() {
  const navigate = useNavigate();
  const { isDestinationSaved, dispatch } = useApp();
  const [filters, setFilters] = useState<Filters>({
    search: '',
    region: null,
    mood: null,
    budget: null,
    climate: null,
    duration: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!d.name.toLowerCase().includes(q) && !d.country.toLowerCase().includes(q)) return false;
      }
      if (filters.region && d.region !== filters.region) return false;
      if (filters.mood && !d.moods.includes(filters.mood)) return false;
      if (filters.budget && d.budget !== filters.budget) return false;
      if (filters.climate && d.climate !== filters.climate) return false;
      if (filters.duration) {
        if (filters.duration === 'short' && d.duration.min > 3) return false;
        if (filters.duration === 'medium' && (d.duration.max < 4 || d.duration.min > 7)) return false;
        if (filters.duration === 'long' && d.duration.max < 8) return false;
      }
      return true;
    });
  }, [filters]);

  const activeFilterCount = [filters.region, filters.mood, filters.budget, filters.climate, filters.duration].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ search: '', region: null, mood: null, budget: null, climate: null, duration: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-4"
    >
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-earth-800 text-earth-100">
        <div className="absolute inset-0 opacity-20">
          <StylizedMap />
        </div>
        <div className="relative z-10 px-4 pt-8 pb-12 md:pt-16 md:pb-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Compass size={20} className="text-sunset-400 compass-spin" />
              <span className="text-xs font-mono uppercase tracking-widest text-earth-400">Destination Discovery</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
              Where will your<br />
              <span className="text-sunset-400 italic">next story</span> begin?
            </h1>
            <p className="text-earth-300 text-sm md:text-base max-w-lg leading-relaxed">
              Explore handpicked destinations across the globe. Filter by mood, budget, and climate to find your perfect journey.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 flex gap-2"
          >
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={filters.search}
                onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-earth-700/50 border border-earth-600 rounded-xl text-earth-100 placeholder:text-earth-500 focus:outline-none focus:border-sunset-400 focus:ring-1 focus:ring-sunset-400 transition-colors"
                aria-label="Search destinations"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                showFilters || activeFilterCount > 0
                  ? 'bg-sunset-400/20 border-sunset-400 text-sunset-400'
                  : 'bg-earth-700/50 border-earth-600 text-earth-300 hover:border-earth-400'
              }`}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <Filter size={18} />
              <span className="hidden sm:inline text-sm font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sunset-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Filters Panel */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden bg-earth-100 border-b border-earth-200"
      >
        <div className="px-4 py-4 max-w-7xl mx-auto space-y-4">
          {/* Region filter */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 block">Region</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(regionLabels) as [Region, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilters(f => ({ ...f, region: f.region === key ? null : key }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.region === key
                      ? 'bg-earth-800 text-earth-100'
                      : 'bg-earth-200 text-earth-700 hover:bg-earth-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mood filter */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 block">Travel Mood</label>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(moodLabels) as [Mood, { label: string; emoji: string }][]).map(([key, { label, emoji }]) => (
                <button
                  key={key}
                  onClick={() => setFilters(f => ({ ...f, mood: f.mood === key ? null : key }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.mood === key
                      ? 'bg-forest-600 text-white'
                      : 'bg-forest-100 text-forest-700 hover:bg-forest-200'
                  }`}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Climate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 flex items-center gap-1">
                <DollarSign size={12} /> Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(budgetLabels) as [Budget, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilters(f => ({ ...f, budget: f.budget === key ? null : key }))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filters.budget === key
                        ? 'bg-sunset-500 text-white'
                        : 'bg-sunset-100 text-sunset-700 hover:bg-sunset-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 flex items-center gap-1">
                <Sun size={12} /> Climate
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.entries(climateLabels) as [Climate, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setFilters(f => ({ ...f, climate: f.climate === key ? null : key }))}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filters.climate === key
                        ? 'bg-sky-600 text-white'
                        : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration filter */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-2 flex items-center gap-1">
              <Clock size={12} /> Trip Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {durationOptions.map(({ key, label, range }) => (
                <button
                  key={key}
                  onClick={() => setFilters(f => ({ ...f, duration: f.duration === key ? null : key }))}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.duration === key
                      ? 'bg-earth-800 text-earth-100'
                      : 'bg-earth-200 text-earth-700 hover:bg-earth-300'
                  }`}
                >
                  {label} <span className="text-[10px] opacity-70">({range})</span>
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-earth-500 hover:text-earth-700 transition-colors"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>
      </motion.div>

      {/* Region Quick Browse */}
      {!filters.search && !filters.region && !filters.mood && !filters.budget && !filters.climate && !filters.duration && (
        <div className="px-4 py-6 max-w-7xl mx-auto">
          <h2 className="font-serif text-lg font-bold text-earth-800 mb-3">Browse by Region</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {(Object.entries(regionLabels) as [Region, string][]).map(([key, label]) => {
              const count = destinations.filter(d => d.region === key).length;
              const regionEmojis: Record<Region, string> = {
                asia: '🏯', europe: '🏰', americas: '🌎', africa: '🌍', oceania: '🏝️'
              };
              return (
                <button
                  key={key}
                  onClick={() => setFilters(f => ({ ...f, region: key }))}
                  className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-earth-100 border border-earth-200 rounded-xl hover:bg-earth-200 hover:border-earth-300 transition-all"
                >
                  <span className="text-lg">{regionEmojis[key]}</span>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-earth-800">{label}</div>
                    <div className="text-[10px] text-earth-500">{count} destinations</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-earth-800">
            {filters.region || filters.mood || filters.budget || filters.climate || filters.search
              ? `${filteredDestinations.length} ${filteredDestinations.length === 1 ? 'destination' : 'destinations'} found`
              : 'All Destinations'
            }
          </h2>
          <span className="text-xs text-earth-400 font-mono">* Estimates</span>
        </div>

        {filteredDestinations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">🗺️</div>
            <h3 className="font-serif text-xl text-earth-700 mb-2">No destinations match</h3>
            <p className="text-earth-500 text-sm mb-4">Try adjusting your filters to discover more places</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium hover:bg-earth-700 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                variants={itemVariants}
                layout
                className="group"
              >
                <button
                  onClick={() => navigate(`/destination/${dest.id}`)}
                  className="w-full text-left"
                  aria-label={`View ${dest.name}, ${dest.country}`}
                >
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${dest.gradient} shadow-md hover:shadow-xl transition-shadow duration-300`}>
                    {/* Destination visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-7xl opacity-60 group-hover:scale-110 transition-transform duration-500">{dest.emoji}</span>
                    </div>
                    
                    {/* Stamp */}
                    <div className="absolute top-3 right-3 bg-earth-800/80 backdrop-blur-sm text-earth-100 px-2 py-1 rounded-md font-mono text-xs font-bold border border-earth-600">
                      {dest.stamp}
                    </div>

                    {/* Budget badge */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-earth-700">
                      ~${dest.estimatedBudgetPerDay}/day
                    </div>

                    {/* Save button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'TOGGLE_SAVE_DESTINATION', destinationId: dest.id });
                      }}
                      className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isDestinationSaved(dest.id)
                          ? 'bg-sunset-500 text-white scale-110'
                          : 'bg-white/80 text-earth-600 hover:bg-white hover:text-sunset-500'
                      }`}
                      aria-label={isDestinationSaved(dest.id) ? 'Remove from saved' : 'Save destination'}
                    >
                      <MapPin size={16} fill={isDestinationSaved(dest.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <div className="mt-3 px-1">
                    <h3 className="font-serif text-lg font-bold text-earth-800 group-hover:text-sunset-600 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-earth-500">{dest.country}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dest.moods.slice(0, 3).map(mood => (
                        <span key={mood} className="text-[10px] px-1.5 py-0.5 bg-earth-100 text-earth-600 rounded-full font-medium">
                          {moodLabels[mood].emoji} {moodLabels[mood].label}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
