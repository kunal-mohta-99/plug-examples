import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const event = location.state?.event;

  useEffect(() => {
    if (!event) {
      navigate('/');
    }
  }, [event, navigate]);

  // Simple seat grid - some seats are unavailable
  const seats = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    available: Math.random() > 0.3, // 70% of seats are available
  }));

  const handleSeatSelect = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat && seat.available) {
      setSelectedSeat(seatId);
    }
    /* PLuG - event (4.4) */
    window.plugSDK?.trackEvent('seat_selected', { event_id: event.id, seat_id: seatId });
  };

  const handleSubmit = async () => {
    /* PLuG - event (4.5) */
    window.plugSDK?.trackEvent('booking_submitted', { event_id: event.id, seat_id: selectedSeat });
    if (!selectedSeat) {
      setError('Please select a seat');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await bookingAPI.create({
        eventId: event.id,
        seat: selectedSeat,
      });

      if (response.data.success) {
        navigate('/payment', { 
          state: { 
            booking: response.data.booking,
            event 
          } 
        });
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Booking failed. Please try again.');
      }
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect Seat
          </h1>
          <p className="text-xl text-gray-300">
            Select the best seat for your concert experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Event Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-gray-300 text-sm">{event.artist}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Price per ticket:</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                      ${event.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Select Your Seat
              </h3>
              
              {/* Seat Legend */}
              <div className="flex items-center justify-center space-x-8 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Unavailable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Selected</span>
                </div>
              </div>

              {/* Stage Indicator */}
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-lg font-semibold text-sm">
                  🎤 STAGE
                </div>
              </div>

              {/* Seat Grid */}
              <div className="grid grid-cols-10 gap-3 max-w-3xl mx-auto mb-8">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatSelect(seat.id)}
                    disabled={!seat.available}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                      ${!seat.available 
                        ? 'bg-red-500/80 text-white cursor-not-allowed opacity-50' 
                        : seat.id === selectedSeat
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                        : 'bg-green-500 text-white hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/50'
                      }
                    `}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>

              {selectedSeat && (
                <div className="text-center mb-6">
                  <div className="inline-block bg-blue-500/20 border border-blue-500/50 rounded-xl px-6 py-3">
                    <p className="text-blue-400 font-semibold">
                      ✓ Selected Seat: {selectedSeat}
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedSeat || loading}
                  className={`
                    px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform
                    ${selectedSeat && !loading
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    'Continue to Payment'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
