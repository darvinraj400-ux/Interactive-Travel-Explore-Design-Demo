import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Heart, Map, List, X, Menu } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../store/AppContext';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Compass, label: 'Explore' },
    { path: '/saved', icon: Heart, label: 'Saved' },
    { path: '/summary', icon: List, label: 'Trip' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile top header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-earth-800/95 backdrop-blur-md border-b border-earth-700 safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-earth-100"
          >
            <Map size={18} className="text-sunset-400" />
            <span className="font-serif text-base font-bold tracking-wide">ROAM ATLAS</span>
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-earth-300 hover:text-white hover:bg-earth-700 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-earth-800/95 backdrop-blur-md border-t border-earth-600 safe-bottom md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-colors ${
                  active ? 'text-sunset-400' : 'text-earth-300'
                }`}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-sunset-400/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
                {item.path === '/saved' && state.savedDestinations.length > 0 && (
                  <span className="absolute top-1 right-2 w-4 h-4 bg-sunset-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {state.savedDestinations.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop top navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-earth-800/95 backdrop-blur-md border-b border-earth-600">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-earth-100 hover:text-sunset-400 transition-colors"
          >
            <Map size={24} className="text-sunset-400" />
            <span className="font-serif text-xl font-bold tracking-wide">ROAM ATLAS</span>
          </button>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    active
                      ? 'text-sunset-400 bg-sunset-400/10'
                      : 'text-earth-300 hover:text-earth-100 hover:bg-earth-700/50'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.path === '/saved' && state.savedDestinations.length > 0 && (
                    <span className="w-5 h-5 bg-sunset-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {state.savedDestinations.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-earth-900/80 backdrop-blur-sm md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-earth-800 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-earth-300 hover:text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-earth-700 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              
              <div className="mt-14">
                <div className="flex items-center gap-2 mb-8">
                  <Map size={20} className="text-sunset-400" />
                  <span className="font-serif text-lg font-bold text-earth-100">ROAM ATLAS</span>
                </div>
                
                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setMenuOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                          active
                            ? 'bg-sunset-400/10 text-sunset-400'
                            : 'text-earth-200 hover:bg-earth-700'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                        {item.path === '/saved' && state.savedDestinations.length > 0 && (
                          <span className="ml-auto w-5 h-5 bg-sunset-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {state.savedDestinations.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-6 border-t border-earth-700">
                  <p className="text-xs text-earth-500 leading-relaxed">
                    An immersive destination discovery and trip-planning experience. All data is sample estimates for demonstration.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for desktop nav */}
      <div className="hidden md:block h-16" />
    </>
  );
}
