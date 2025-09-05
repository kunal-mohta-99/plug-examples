import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

import './App.css';

function App() {
  /* PLuG - integration (1) */
  useEffect(() => {
    window.plugSDK.init({
      app_id: 'DvRvStPZG9uOmNvcmU6ZHZydi11cy0xOmRldm8vMTFDY01MRXNRczpwbHVnX3NldHRpbmcvMV9ffHxfXzIwMjUtMDktMDMgMTM6MDI6NTAuODU2ODEzNTk3ICswMDAwIFVUQw==xlxendsDvRv',
    });
  }, []);

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
