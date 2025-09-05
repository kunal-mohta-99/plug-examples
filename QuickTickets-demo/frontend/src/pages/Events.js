import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventsAPI } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();

    /* PLuG - event (4.1) */
    window.plugSDK?.trackEvent('events_page_viewed');
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getAll();
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64 bg-black relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        <div className="text-xl text-gray-300 relative z-10">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-black min-h-screen relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        <div className="text-red-400 text-xl mb-4 relative z-10">{error}</div>
        <button
          onClick={fetchEvents}
          className="bg-white text-black px-6 py-2 rounded hover:bg-gray-100 transition-colors relative z-10"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          All Events
        </h1>
        <p className="text-xl text-gray-400">
          Discover and book amazing concerts happening near you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-800 hover:border-gray-700"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                {event.name}
              </h3>
              <p className="text-gray-300 mb-1 text-sm">
                {event.artist}
              </p>
              <p className="text-gray-400 mb-1 text-sm">
                📅 {event.date} at {event.time}
              </p>
              <p className="text-gray-400 mb-3 text-sm">
                📍 {event.venue}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                  ${event.price}
                </span>
                <Link
                  to={`/events/${event.id}`}
                  className="bg-white text-black px-3 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors duration-300 font-medium"
                  onClick={() => {
                    /* PLuG - event (4.2) */
                    window.plugSDK?.trackEvent('event_details_viewed', { event_id: event.id })
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
