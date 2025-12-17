import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';


const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Track registered event IDs for this user (mock, local state)
  const [myRegistered, setMyRegistered] = useState(() => {
    // Load from localStorage if available
    try {
      const saved = localStorage.getItem('myRegisteredEvents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/events`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Unable to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(events.map(event => event.category)), 'Registered'];

  // Filter logic:
  // - "All" shows only unregistered events
  // - "Registered" shows only registered events
  // - Other categories show unregistered events in that category
  const filteredEvents = selectedCategory === 'All'
    ? events.filter(event => !myRegistered.includes(event.id))
    : selectedCategory === 'Registered'
    ? events.filter(event => myRegistered.includes(event.id))
    : events.filter(event => event.category === selectedCategory && !myRegistered.includes(event.id));

  // Registration handler to update event registered count
  // Persist myRegistered to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('myRegisteredEvents', JSON.stringify(myRegistered));
    } catch {}
  }, [myRegistered]);

  const handleRegister = async (eventId) => {
    // Find event
    const idx = events.findIndex(e => e.id === eventId);
    if (idx === -1) return { error: 'Event not found.' };
    // Simulate API call (replace with real API if available)
    try {
      if (events[idx].registered >= events[idx].capacity) {
        return { error: 'Event is full.' };
      }
      // Prevent duplicate registration
      if (myRegistered.includes(eventId)) {
        return { error: 'You have already registered for this event.' };
      }
      // Simulate registration
      const updated = [...events];
      updated[idx] = { ...updated[idx], registered: updated[idx].registered + 1 };
      setEvents(updated);
      setMyRegistered(prev => [...prev, eventId]);
      return { success: true };
    } catch (e) {
      return { error: 'Registration failed.' };
    }
  };

  const handleUnregister = async (eventId) => {
    const idx = events.findIndex(e => e.id === eventId);
    if (idx === -1) return { error: 'Event not found.' };
    try {
      if (!myRegistered.includes(eventId)) {
        return { error: 'You are not registered for this event.' };
      }
      // Simulate unregistration
      const updated = [...events];
      updated[idx] = { ...updated[idx], registered: Math.max(0, updated[idx].registered - 1) };
      setEvents(updated);
      setMyRegistered(prev => prev.filter(id => id !== eventId));
      return { success: true };
    } catch (e) {
      return { error: 'Unregistration failed.' };
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upcoming Campus Events
        </h1>
        <p className="text-gray-600">
          Discover and register for exciting events happening on campus
        </p>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
          <button 
            onClick={fetchEvents}
            className="mt-3 text-red-700 font-medium hover:text-red-900"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Events Grid */}
      {!loading && !error && (
        <>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No events available in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegister={handleRegister}
                  onUnregister={handleUnregister}
                  isRegistered={myRegistered.includes(event.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Stats Footer */}
      {!loading && !error && events.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-primary-600">{events.length}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-primary-600">
                {events.reduce((sum, event) => sum + event.capacity, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-primary-600">
                {events.reduce((sum, event) => sum + event.registered, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Registered</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EventsPage;
