const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const events = [
  {
    id: 1,
    name: "Rock Concert 2024",
    artist: "The Rock Stars",
    date: "2024-12-15",
    time: "20:00",
    venue: "Madison Square Garden",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
    description: "An electrifying night of rock music with the hottest bands of the year."
  },
  {
    id: 2,
    name: "Comedy Night",
    comedian: "Sarah Johnson",
    date: "2024-12-20",
    time: "19:30",
    venue: "Laugh Factory",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "A hilarious evening of stand-up comedy featuring top comedians."
  },
  {
    id: 3,
    name: "Basketball Championship",
    teams: "Lakers vs Warriors",
    date: "2024-12-25",
    time: "15:00",
    venue: "Staples Center",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
    description: "The ultimate showdown between two legendary basketball teams."
  },
  {
    id: 4,
    name: "Jazz Festival",
    artists: "Various Jazz Artists",
    date: "2024-12-30",
    time: "18:00",
    venue: "Central Park",
    price: 65.50,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
    description: "A magical evening of smooth jazz under the stars."
  }
];

const reviews = {
  1: [
    { id: 1, user: "John D.", rating: 5, comment: "Amazing concert! The energy was incredible." },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Great show, but the sound could be better." },
    { id: 3, user: "Mike R.", rating: 5, comment: "Best concert I've ever been to!" }
  ],
  2: [
    { id: 4, user: "Lisa K.", rating: 5, comment: "Hilarious! Sarah killed it tonight." },
    { id: 5, user: "Tom B.", rating: 4, comment: "Really funny show, highly recommend." }
  ],
  3: [
    { id: 6, user: "David L.", rating: 5, comment: "Epic game! Lakers dominated!" },
    { id: 7, user: "Emma W.", rating: 4, comment: "Great atmosphere, intense game." }
  ],
  4: [
    { id: 8, user: "Alex P.", rating: 5, comment: "Beautiful jazz under the stars." },
    { id: "Rachel S.", rating: 4, comment: "Lovely evening, great music." }
  ]
};

const bookings = new Map();
let bookingIdCounter = 1;

// Helper function to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Routes
app.get('/events', async (req, res) => {
  try {
    // Simulate 500ms delay
    await delay(500);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
    }
});

app.get('/events/:id', async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (eventId === 4) {
      await delay(10000);
    }

    // Simulate slow API for reviews (2-3s delay)
    const delayTime = 2000 + Math.random() * 1000;
    await delay(delayTime);
    
    const eventReviews = reviews[eventId] || [];
    
    res.json({
      ...event,
      reviews: eventReviews
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

app.post('/booking', async (req, res) => {
  try {
    const { eventId, seat } = req.body;
    
    if (!eventId || !seat) {
      return res.status(400).json({ error: 'Missing eventId or seat' });
    }

    // 20% chance of error
    if (Math.random() < 0.2) {
      return res.status(500).json({ error: 'Seat already taken' });
    }

    const booking = {
      id: bookingIdCounter++,
      eventId,
      seat,
      timestamp: new Date().toISOString(),
      status: 'confirmed'
    };

    bookings.set(booking.id, booking);
    
    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

app.post('/payment', async (req, res) => {
  try {
    const { bookingId, name, email, cardNumber, cvv } = req.body;
    
    if (!bookingId || !name || !email || !cardNumber || !cvv) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Mask sensitive data in logs (simulate secure handling)
    const maskedCard = cardNumber.replace(/\d(?=\d{4})/g, '*');
    const maskedCvv = '***';
    
    console.log(`Payment attempt for booking ${bookingId}:`);
    console.log(`Name: ${name}, Email: ${email}`);
    console.log(`Card: ${maskedCard}, CVV: ${maskedCvv}`);

    // 20% chance of failure
    if (Math.random() < 0.2) {
      return res.status(500).json({ error: 'Payment failed' });
    }

    const confirmation = {
      id: `PAY-${Date.now()}`,
      bookingId,
      amount: 89.99, // Mock amount
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    res.json({
      success: true,
      confirmation
    });
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    if (email.includes('rohit')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Always succeed for demo purposes
    const user = {
      userId: `user-${Date.now()}`,
      email,
      name: email.split('@')[0] // Use email prefix as name
    };

    // Call auth-tokens.create API
    try {
      const authTokenData = JSON.stringify({
        rev_info: {
          user_ref: user.email,
          user_traits: {
              email: user.email,
              display_name: user.name,
          },
        }
      });

      const options = {
        hostname: 'api.devrev.ai',
        path: '/auth-tokens.create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(authTokenData),
          'authorization': 'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJHcFZHaWN0aGg6ZGV2dS8xIiwiZXhwIjoxODUwOTMwOTIzLCJodHRwOi8vZGV2cmV2LmFpL2NsaWVudGlkIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJHcFZHaWN0aGg6c3ZjYWNjLzEyIiwiaHR0cDovL2RldnJldi5haS9kZXZvX2RvbiI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yR3BWR2ljdGhoIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtMkdwVkdpY3RoaCIsImh0dHA6Ly9kZXZyZXYuYWkvc3ZjYWNjIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJHcFZHaWN0aGg6c3ZjYWNjLzEyIiwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOmFhdCIsImlhdCI6MTc1NjMyMjkyMywiaXNzIjoiaHR0cHM6Ly9hdXRoLXRva2VuLmRldnJldi5haS8iLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi1pbi0xOmRldm8vMkdwVkdpY3RoaDp0b2tlbi9xUm03c0RYdCIsInN1YiI6ImRvbjppZGVudGl0eTpkdnJ2LWluLTE6ZGV2by8yR3BWR2ljdGhoOnN2Y2FjYy8xMiJ9.KcV8I-Ffgna_v6Pv-cABGLJUVYabuiK5znZTCco6QCQ71BcJLp88DQcSUpWGs7bzM7gy6BGM6YXKZLa8HycL_xrKE9AYo80Qzdw30jeSA4tb4Cdr0hw4_ceBpWMOedE1fYitTx-FzTMygwu484_I956qJPDLRO61uRdcV7jtfSHUdk6PSvdObzDJUGl7wEgqdw59Ia8OMk88YzsZL4JF8refFRMDGwQ3kx0fr-oWbvRrb2WP8vRESYnJMCyMIH2_2otx45SM9nFGYtiWENgwCtQJ_G_dRk5BfSnTgXvfRL3IggLodduq15k3RwgAahYkSfVd1aVVyfBGY7t0i5NRMQ'
        }
      };

      const authReq = https.request(options, (authRes) => {
        let data = '';
        
        authRes.on('data', (chunk) => {
          data += chunk;
        });
        
        authRes.on('end', () => {
          console.log('Auth-tokens.create API Response:');
          console.log('Status:', authRes.statusCode);
          console.log('Headers:', authRes.headers);
          console.log('Response Body:', data);
          
          // Continue with the login response
          res.json({
            success: true,
            user,
            authTokenResponse: {
              status: authRes.statusCode,
              data: data
            }
          });
        });
      });

      authReq.on('error', (error) => {
        console.error('Error calling auth-tokens.create:', error);
        
        // Continue with login even if auth-tokens.create fails
        res.json({
          success: true,
          user,
          authTokenError: error.message
        });
      });

      authReq.write(authTokenData);
      authReq.end();
      
    } catch (authError) {
      console.error('Error in auth-tokens.create call:', authError);
      
      // Continue with login even if auth-tokens.create fails
      res.json({
        success: true,
        user,
        authTokenError: authError.message
      });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 QuickTickets API server running on http://localhost:${PORT}`);
  console.log(`📅 Available endpoints:`);
  console.log(`   GET  /events`);
  console.log(`   GET  /events/:id`);
  console.log(`   POST /booking`);
  console.log(`   POST /payment`);
  console.log(`   POST /login`);
});
