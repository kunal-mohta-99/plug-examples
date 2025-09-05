import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 text-center py-20 mb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Book Events on the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-orange-400">
              QuickTickets Platform
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
            QuickTickets provides the platform and infrastructure to discover, book, and attend 
            amazing events with instant global access.
          </p>
          
          {/* Central Visual Element - Ticket Icon with Gradient Background */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-orange-500 blur-3xl opacity-30"></div>
            <div className="relative bg-black border border-gray-800 rounded-2xl p-8 inline-block">
              <div className="text-8xl mb-4">🎫</div>
              <div className="text-white text-lg font-medium">QuickTickets</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <span className="text-black">🎫</span>
              Browse Events
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Section with Ticketing Focus */}
      <div className="max-w-6xl mx-auto px-4 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast Booking</h3>
            <p className="text-gray-400">Book your tickets in seconds with our streamlined process</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Global Event Access</h3>
            <p className="text-gray-400">Access events worldwide with one click</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">Your payment information is protected with bank-level security</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm py-16 mb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Discover Amazing Events?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            From pop superstars to indie artists, rock legends to electronic music - 
            we've got the hottest events for everyone!
          </p>
          <button
            onClick={() => {
              if (user) {
                navigate('/events');
              } else {
                console.error('Failed to open events page, user not logged in');
              }
            }}
            className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg"
          >
            Explore All Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
