import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Destination, ItineraryDay, destinations as allDestinations } from '../data/destinations';

export interface ItineraryActivity {
  id: string;
  title: string;
  completed: boolean;
}

export interface ItineraryDayPlan {
  day: number;
  title: string;
  activities: ItineraryActivity[];
}

export interface TripPlan {
  id: string;
  destinationId: string;
  days: ItineraryDayPlan[];
  startDate?: string;
  notes: string;
}

interface AppState {
  savedDestinations: string[];
  tripPlans: TripPlan[];
  activeTripId: string | null;
}

type Action =
  | { type: 'TOGGLE_SAVE_DESTINATION'; destinationId: string }
  | { type: 'CREATE_TRIP'; destinationId: string; tripId: string }
  | { type: 'DELETE_TRIP'; tripId: string }
  | { type: 'SET_ACTIVE_TRIP'; tripId: string | null }
  | { type: 'ADD_DAY'; tripId: string; day: ItineraryDayPlan }
  | { type: 'REMOVE_DAY'; tripId: string; dayNumber: number }
  | { type: 'ADD_ACTIVITY'; tripId: string; dayNumber: number; activity: ItineraryActivity }
  | { type: 'REMOVE_ACTIVITY'; tripId: string; dayNumber: number; activityId: string }
  | { type: 'TOGGLE_ACTIVITY'; tripId: string; dayNumber: number; activityId: string }
  | { type: 'REORDER_DAYS'; tripId: string; days: ItineraryDayPlan[] }
  | { type: 'REORDER_ACTIVITIES'; tripId: string; dayNumber: number; activities: ItineraryActivity[] }
  | { type: 'UPDATE_TRIP_NOTES'; tripId: string; notes: string }
  | { type: 'LOAD_STATE'; state: AppState };

const initialState: AppState = {
  savedDestinations: [],
  tripPlans: [],
  activeTripId: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'TOGGLE_SAVE_DESTINATION': {
      const exists = state.savedDestinations.includes(action.destinationId);
      return {
        ...state,
        savedDestinations: exists
          ? state.savedDestinations.filter(id => id !== action.destinationId)
          : [...state.savedDestinations, action.destinationId],
      };
    }
    case 'CREATE_TRIP': {
      const newTrip: TripPlan = {
        id: action.tripId,
        destinationId: action.destinationId,
        days: [],
        notes: '',
      };
      return {
        ...state,
        tripPlans: [...state.tripPlans, newTrip],
        activeTripId: newTrip.id,
      };
    }
    case 'DELETE_TRIP': {
      return {
        ...state,
        tripPlans: state.tripPlans.filter(t => t.id !== action.tripId),
        activeTripId: state.activeTripId === action.tripId ? null : state.activeTripId,
      };
    }
    case 'SET_ACTIVE_TRIP': {
      return { ...state, activeTripId: action.tripId };
    }
    case 'ADD_DAY': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId ? { ...t, days: [...t.days, action.day] } : t
        ),
      };
    }
    case 'REMOVE_DAY': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId ? { ...t, days: t.days.filter(d => d.day !== action.dayNumber) } : t
        ),
      };
    }
    case 'ADD_ACTIVITY': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId
            ? {
                ...t,
                days: t.days.map(d =>
                  d.day === action.dayNumber
                    ? { ...d, activities: [...d.activities, action.activity] }
                    : d
                ),
              }
            : t
        ),
      };
    }
    case 'REMOVE_ACTIVITY': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId
            ? {
                ...t,
                days: t.days.map(d =>
                  d.day === action.dayNumber
                    ? { ...d, activities: d.activities.filter(a => a.id !== action.activityId) }
                    : d
                ),
              }
            : t
        ),
      };
    }
    case 'TOGGLE_ACTIVITY': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId
            ? {
                ...t,
                days: t.days.map(d =>
                  d.day === action.dayNumber
                    ? {
                        ...d,
                        activities: d.activities.map(a =>
                          a.id === action.activityId ? { ...a, completed: !a.completed } : a
                        ),
                      }
                    : d
                ),
              }
            : t
        ),
      };
    }
    case 'REORDER_DAYS': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId ? { ...t, days: action.days } : t
        ),
      };
    }
    case 'REORDER_ACTIVITIES': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId
            ? {
                ...t,
                days: t.days.map(d =>
                  d.day === action.dayNumber ? { ...d, activities: action.activities } : d
                ),
              }
            : t
        ),
      };
    }
    case 'UPDATE_TRIP_NOTES': {
      return {
        ...state,
        tripPlans: state.tripPlans.map(t =>
          t.id === action.tripId ? { ...t, notes: action.notes } : t
        ),
      };
    }
    case 'LOAD_STATE': {
      return action.state;
    }
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  isDestinationSaved: (id: string) => boolean;
  getActiveTrip: () => TripPlan | undefined;
  getTripForDestination: (destinationId: string) => TripPlan | undefined;
  getDestination: (id: string) => Destination | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'roam-atlas-state';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_STATE', state: parsed });
      }
    } catch (e) {
      console.warn('Failed to load saved state:', e);
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [state]);

  const isDestinationSaved = (id: string) => state.savedDestinations.includes(id);

  const getActiveTrip = () => state.tripPlans.find(t => t.id === state.activeTripId);

  const getTripForDestination = (destinationId: string) =>
    state.tripPlans.find(t => t.destinationId === destinationId);

  const getDestination = (id: string) => {
    return allDestinations.find((d: Destination) => d.id === id);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, isDestinationSaved, getActiveTrip, getTripForDestination, getDestination }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
