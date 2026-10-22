import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, GripVertical, Check, Edit3, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { destinations } from '../data/destinations';
import { useApp, ItineraryActivity, ItineraryDayPlan } from '../store/AppContext';

function SortableActivity({ activity, tripId, dayNumber }: { activity: ItineraryActivity; tripId: string; dayNumber: number }) {
  const { dispatch } = useApp();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10, height: 0 }}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-colors ${
        activity.completed
          ? 'bg-forest-50 border-forest-200'
          : 'bg-earth-50 border-earth-200 hover:border-earth-300'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-earth-300 hover:text-earth-500 cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      <button
        onClick={() => dispatch({ type: 'TOGGLE_ACTIVITY', tripId, dayNumber, activityId: activity.id })}
        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          activity.completed ? 'bg-forest-500 text-white' : 'border-2 border-earth-300 hover:border-forest-400'
        }`}
        aria-label={activity.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {activity.completed && <Check size={12} />}
      </button>
      <span className={`flex-1 text-sm ${activity.completed ? 'line-through text-earth-400' : 'text-earth-700'}`}>
        {activity.title}
      </span>
      <button
        onClick={() => dispatch({ type: 'REMOVE_ACTIVITY', tripId, dayNumber, activityId: activity.id })}
        className="text-earth-300 hover:text-red-500 transition-colors p-1"
        aria-label="Remove activity"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
}

function SortableDay({ day, tripId }: { day: ItineraryDayPlan; tripId: string }) {
  const { dispatch } = useApp();
  const [expanded, setExpanded] = useState(true);
  const [newActivity, setNewActivity] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddActivity = () => {
    if (!newActivity.trim()) return;
    const activity: ItineraryActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newActivity.trim(),
      completed: false,
    };
    dispatch({ type: 'ADD_ACTIVITY', tripId, dayNumber: day.day, activity });
    setNewActivity('');
    setShowAddForm(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = day.activities.findIndex(a => a.id === active.id);
    const newIndex = day.activities.findIndex(a => a.id === over.id);
    const newActivities = arrayMove(day.activities, oldIndex, newIndex);
    dispatch({ type: 'REORDER_ACTIVITIES', tripId, dayNumber: day.day, activities: newActivities });
  };

  const completedCount = day.activities.filter(a => a.completed).length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, height: 0 }}
      className="bg-earth-50 border border-earth-200 rounded-xl overflow-hidden"
    >
      {/* Day header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-earth-100 border-b border-earth-200">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-mono font-bold text-sunset-500 shrink-0">DAY {day.day}</span>
          <span className="text-sm font-semibold text-earth-800 truncate">{day.title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-earth-400 font-mono">
            {completedCount}/{day.activities.length}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-earth-400 hover:text-earth-600 hover:bg-earth-200 transition-colors"
            aria-label={expanded ? 'Collapse day' : 'Expand day'}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={() => dispatch({ type: 'REMOVE_DAY', tripId, dayNumber: day.day })}
            className="w-7 h-7 rounded-md flex items-center justify-center text-earth-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            aria-label="Remove day"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Activities */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 space-y-2">
              {day.activities.length === 0 ? (
                <p className="text-center text-sm text-earth-400 py-4">
                  No activities yet. Add your first activity below!
                </p>
              ) : (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={day.activities.map(a => a.id)} strategy={verticalListSortingStrategy}>
                    <AnimatePresence>
                      {day.activities.map(activity => (
                        <SortableActivity
                          key={activity.id}
                          activity={activity}
                          tripId={tripId}
                          dayNumber={day.day}
                        />
                      ))}
                    </AnimatePresence>
                  </SortableContext>
                </DndContext>
              )}

              {/* Add activity form */}
              <AnimatePresence>
                {showAddForm ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
                      placeholder="Activity name..."
                      className="flex-1 px-3 py-2 text-sm border border-earth-200 rounded-lg focus:outline-none focus:border-sunset-400 bg-white"
                      autoFocus
                    />
                    <button
                      onClick={handleAddActivity}
                      className="px-3 py-2 bg-forest-500 text-white rounded-lg text-sm font-medium hover:bg-forest-600 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => { setShowAddForm(false); setNewActivity(''); }}
                      className="px-3 py-2 text-earth-500 text-sm hover:text-earth-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-earth-300 rounded-lg text-sm text-earth-400 hover:text-earth-600 hover:border-earth-400 transition-colors"
                  >
                    <Plus size={14} /> Add activity
                  </button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ItineraryBuilder() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [notes, setNotes] = useState('');
  const [editingNotes, setEditingNotes] = useState(false);

  const trip = state.tripPlans.find(t => t.id === tripId);
  const destination = trip ? destinations.find(d => d.id === trip.destinationId) : null;

  if (!trip || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="font-serif text-2xl text-earth-800 mb-2">Trip not found</h2>
          <p className="text-earth-500 mb-4">This trip doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium">
            Back to Explorer
          </button>
        </div>
      </div>
    );
  }

  const handleAddDay = () => {
    const nextDay = trip.days.length > 0 ? Math.max(...trip.days.map(d => d.day)) + 1 : 1;
    const newDay: ItineraryDayPlan = {
      day: nextDay,
      title: `Day ${nextDay}`,
      activities: [],
    };
    dispatch({ type: 'ADD_DAY', tripId: trip.id, day: newDay });
  };

  const handleLoadSuggested = () => {
    // Load suggested itinerary as starting point
    destination.suggestedItinerary.forEach((sDay) => {
      const dayPlan: ItineraryDayPlan = {
        day: sDay.day,
        title: sDay.title,
        activities: sDay.activities.map((act, i) => ({
          id: `suggested-${sDay.day}-${i}`,
          title: act,
          completed: false,
        })),
      };
      dispatch({ type: 'ADD_DAY', tripId: trip.id, day: dayPlan });
    });
  };

  const handleDayDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = trip.days.findIndex(d => d.day === active.id);
    const newIndex = trip.days.findIndex(d => d.day === over.id);
    const newDays = arrayMove(trip.days, oldIndex, newIndex).map((d, i) => ({ ...d, day: i + 1 }));
    dispatch({ type: 'REORDER_DAYS', tripId: trip.id, days: newDays });
  };

  const totalActivities = trip.days.reduce((sum, d) => sum + d.activities.length, 0);
  const completedActivities = trip.days.reduce((sum, d) => sum + d.activities.filter(a => a.completed).length, 0);
  const estimatedBudget = destination.estimatedBudgetPerDay * trip.days.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20 md:pb-8"
    >
      {/* Header */}
      <div className={`bg-gradient-to-br ${destination.gradient} px-4 pt-6 pb-8`}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-earth-700 hover:text-earth-900 mb-3 text-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{destination.emoji}</span>
            <div>
              <h1 className="font-serif text-xl md:text-2xl font-bold text-earth-800">{destination.name} Itinerary</h1>
              <p className="text-sm text-earth-600">{destination.country}</p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="px-3 py-1.5 bg-white/80 rounded-lg text-xs font-medium text-earth-700">
              📅 {trip.days.length} days
            </div>
            <div className="px-3 py-1.5 bg-white/80 rounded-lg text-xs font-medium text-earth-700">
              ✓ {completedActivities}/{totalActivities} activities
            </div>
            <div className="px-3 py-1.5 bg-white/80 rounded-lg text-xs font-medium text-earth-700">
              💰 ~${estimatedBudget} est.
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-4 relative z-10 max-w-3xl mx-auto">
        {/* Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleAddDay}
            className="flex items-center gap-1.5 px-3 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium hover:bg-earth-700 transition-colors"
          >
            <Plus size={14} /> Add Day
          </button>
          {trip.days.length === 0 && (
            <button
              onClick={handleLoadSuggested}
              className="flex items-center gap-1.5 px-3 py-2 bg-sunset-500 text-white rounded-lg text-sm font-medium hover:bg-sunset-600 transition-colors"
            >
              <Edit3 size={14} /> Load Suggested Itinerary
            </button>
          )}
          <button
            onClick={() => navigate('/summary')}
            className="flex items-center gap-1.5 px-3 py-2 bg-forest-500 text-white rounded-lg text-sm font-medium hover:bg-forest-600 transition-colors"
          >
            View Trip Summary
          </button>
        </div>

        {/* Notes */}
        <div className="mb-4 bg-earth-50 border border-earth-200 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-earth-500">Trip Notes</span>
            <button
              onClick={() => setEditingNotes(!editingNotes)}
              className="text-xs text-earth-400 hover:text-earth-600"
            >
              {editingNotes ? <Save size={14} /> : <Edit3 size={14} />}
            </button>
          </div>
          {editingNotes ? (
            <textarea
              value={trip.notes}
              onChange={(e) => {
                setNotes(e.target.value);
                dispatch({ type: 'UPDATE_TRIP_NOTES', tripId: trip.id, notes: e.target.value });
              }}
              placeholder="Add notes about your trip..."
              className="w-full px-2 py-1.5 text-sm border border-earth-200 rounded-lg focus:outline-none focus:border-sunset-400 resize-none h-20 bg-white"
            />
          ) : (
            <p className="text-sm text-earth-600">
              {trip.notes || 'No notes yet. Click edit to add trip notes.'}
            </p>
          )}
        </div>

        {/* Days */}
        {trip.days.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-earth-50 border border-dashed border-earth-300 rounded-2xl"
          >
            <div className="text-4xl mb-3">🗓️</div>
            <h3 className="font-serif text-lg text-earth-700 mb-2">Start building your itinerary</h3>
            <p className="text-sm text-earth-500 mb-4">Add days manually or load the suggested itinerary</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={handleAddDay}
                className="px-4 py-2 bg-earth-800 text-earth-100 rounded-lg text-sm font-medium"
              >
                + Add First Day
              </button>
              <button
                onClick={handleLoadSuggested}
                className="px-4 py-2 bg-sunset-500 text-white rounded-lg text-sm font-medium"
              >
                Load Suggested
              </button>
            </div>
          </motion.div>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDayDragEnd}>
            <SortableContext items={trip.days.map(d => d.day)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                <AnimatePresence>
                  {trip.days.map(day => (
                    <SortableDay key={day.day} day={day} tripId={trip.id} />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Add day button at bottom */}
        {trip.days.length > 0 && (
          <button
            onClick={handleAddDay}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-earth-300 rounded-xl text-sm text-earth-500 hover:text-earth-700 hover:border-earth-400 transition-colors"
          >
            <Plus size={16} /> Add another day
          </button>
        )}

        <p className="text-center text-[11px] text-earth-400 font-mono mt-6">
          * Budget estimates are sample data for demonstration purposes only.
        </p>
      </div>
    </motion.div>
  );
}
