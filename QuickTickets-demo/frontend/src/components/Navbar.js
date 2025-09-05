import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import LoginModal from './LoginModal';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav className="bg-black text-white shadow-lg border-b border-gray-800 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-black bg-white rounded-sm px-1 py-0.5">▲</span>
            QuickTickets
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/events" className="hover:text-gray-300 transition-colors text-gray-400">
              Events
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">
                  Welcome, {user.name}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded transition-colors border border-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="bg-white text-black px-4 py-2 rounded transition-colors hover:bg-gray-100"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
      />
    </nav>
  );
};

export default Navbar;
