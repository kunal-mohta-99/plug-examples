const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - 9 Events (All Concerts)
const events = [
  {
    id: 1,
    name: "Taylor Swift - The Eras Tour",
    artist: "Taylor Swift",
    date: "2024-12-15",
    time: "20:00",
    venue: "Madison Square Garden",
    price: 299.99,
    image: "https://www.thestatesman.com/wp-content/uploads/2023/11/Taylor-Swift-The-Eras-Tour.jpg",
    description: "Experience the magic of Taylor Swift's most ambitious tour yet, featuring hits from all her eras in a spectacular 3-hour show."
  },
  {
    id: 2,
    name: "Ed Sheeran - Mathematics Tour",
    artist: "Ed Sheeran",
    date: "2024-12-20",
    time: "19:30",
    venue: "Wembley Stadium",
    price: 189.50,
    image: "https://plsn.com/site/wp-content/uploads/ed_sheeran_panther_2.jpg",
    description: "Join Ed Sheeran for an intimate acoustic performance featuring songs from his latest album and greatest hits."
  },
  {
    id: 3,
    name: "Coldplay - Music of the Spheres",
    artist: "Coldplay",
    date: "2024-12-25",
    time: "21:00",
    venue: "Wembley Stadium",
    price: 249.99,
    image: "https://www.tpimagazine.com/wp-content/uploads/2023/07/Coldplay-The-Music-Of-The-Spheres-World-Tour.-Photo-by-AnnaLeeMedia.jpg",
    description: "A cosmic journey through Coldplay's greatest hits with stunning visuals and an unforgettable light show."
  },
  {
    id: 4,
    name: "Billie Eilish - Happier Than Ever Tour",
    artist: "Billie Eilish",
    date: "2024-12-30",
    time: "20:30",
    venue: "Hollywood Bowl",
    price: 179.99,
    image: "https://momentfactory.com/cdn/shop/files/Moment_Factory_Happier_Than_Ever_Tour_22_54-WS_fb517355-819b-4b34-9d82-8d56bb3cd1c9.jpg?v=1715371073&width=1946",
    description: "Witness Billie Eilish's haunting vocals and innovative production in this intimate concert experience."
  },
  {
    id: 5,
    name: "The Weeknd - After Hours Til Dawn",
    artist: "The Weeknd",
    date: "2025-01-05",
    time: "21:00",
    venue: "SoFi Stadium",
    price: 199.99,
    image: "https://cdn.sanity.io/images/d1a1yw91/production/ba5e8fcdb68bb0981209ba4c52826157101428e6-8192x5464.jpg?rect=0,428,8192,4608&w=3840&h=2160&q=95&fit=max&auto=format&width=3840",
    description: "Experience The Weeknd's dark, atmospheric soundscapes in this visually stunning concert production."
  },
  {
    id: 6,
    name: "Ariana Grande - Sweetener World Tour",
    artist: "Ariana Grande",
    date: "2025-01-12",
    time: "20:00",
    venue: "MetLife Stadium",
    price: 219.99,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop&crop=center",
    description: "Join Ariana Grande for a night of powerful vocals, stunning choreography, and her biggest hits."
  },
  {
    id: 7,
    name: "Drake - It's All a Blur Tour",
    artist: "Drake",
    date: "2025-01-18",
    time: "21:30",
    venue: "Barclays Center",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop&crop=center",
    description: "Experience Drake's chart-topping hits in this high-energy concert featuring special guests and surprises."
  },
  {
    id: 8,
    name: "Olivia Rodrigo - GUTS World Tour",
    artist: "Olivia Rodrigo",
    date: "2025-01-25",
    time: "19:30",
    venue: "Radio City Music Hall",
    price: 159.99,
    image: "https://trend.usao.edu/wp-content/uploads/2024/08/olivia-1200x900.jpeg",
    description: "Witness the raw emotion and powerful storytelling of Olivia Rodrigo's breakout hits and new material."
  },
  {
    id: 9,
    name: "Harry Styles - Love On Tour",
    artist: "Harry Styles",
    date: "2025-02-02",
    time: "20:00",
    venue: "Madison Square Garden",
    price: 229.99,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop&crop=center",
    description: "Join Harry Styles for an evening of love, music, and pure joy in this intimate and energetic performance."
  }
];

const reviews = {
  1: [
    { id: 1, user: "Emma S.", rating: 5, comment: "Taylor Swift was absolutely incredible! The Eras Tour exceeded all expectations." },
    { id: 2, user: "Jake M.", rating: 5, comment: "Best concert I've ever been to! The production value was out of this world." },
    { id: 3, user: "Sarah L.", rating: 4, comment: "Amazing show, but the venue was a bit crowded. Still worth every penny!" },
    { id: 20, user: "Jessica W.", rating: 5, comment: "The setlist was perfect! Every era was represented beautifully. Worth every dollar!" }
  ],
  2: [
    { id: 4, user: "Tom B.", rating: 5, comment: "Ed Sheeran's acoustic performance was pure magic. So intimate and beautiful." },
    { id: 5, user: "Lisa K.", rating: 5, comment: "His voice is even better live! The Mathematics Tour is a must-see." },
    { id: 21, user: "Mark T.", rating: 4, comment: "Incredible talent! Ed's loop pedal skills are mind-blowing live." },
    { id: 22, user: "Anna K.", rating: 5, comment: "Such a personal connection with the audience. Felt like a private concert!" }
  ],
  3: [
    { id: 6, user: "David L.", rating: 5, comment: "Coldplay's light show was absolutely breathtaking! A cosmic experience." },
    { id: 7, user: "Rachel W.", rating: 4, comment: "Great concert, the Music of the Spheres theme was incredible." },
    { id: 23, user: "James P.", rating: 5, comment: "The wristbands lighting up the stadium was magical! Unforgettable night." },
    { id: 24, user: "Maria G.", rating: 4, comment: "Chris Martin's energy is infectious. The crowd was electric all night!" }
  ],
  4: [
    { id: 8, user: "Alex P.", rating: 5, comment: "Billie Eilish's voice is hauntingly beautiful live. Unforgettable night." },
    { id: 9, user: "Maya R.", rating: 4, comment: "Amazing performance, her stage presence is incredible." },
    { id: 25, user: "Kevin L.", rating: 5, comment: "The production design was next level! Billie's artistic vision came to life." },
    { id: 26, user: "Sophie M.", rating: 4, comment: "Her brother Finneas on stage was amazing too! Great sibling chemistry." }
  ],
  5: [
    { id: 10, user: "Chris T.", rating: 5, comment: "The Weeknd's production was next level. After Hours Til Dawn was epic!" },
    { id: 11, user: "Nina S.", rating: 4, comment: "Great show, the atmosphere was electric." },
    { id: 27, user: "Daniel R.", rating: 5, comment: "The Weeknd's vocals were flawless! The set design was like a movie." },
    { id: 28, user: "Elena V.", rating: 4, comment: "Amazing energy from start to finish. The crowd was singing every word!" }
  ],
  6: [
    { id: 12, user: "Jordan K.", rating: 5, comment: "Ariana Grande's vocals are absolutely incredible live. Sweetener Tour was amazing!" },
    { id: 13, user: "Sam D.", rating: 4, comment: "Great concert, her choreography was on point." },
    { id: 29, user: "Carlos M.", rating: 5, comment: "Ariana's whistle notes live are unbelievable! She's a true vocal powerhouse." },
    { id: 30, user: "Isabella F.", rating: 4, comment: "The backup dancers were incredible! Such a polished and professional show." }
  ],
  7: [
    { id: 14, user: "Mike R.", rating: 5, comment: "Drake brought the energy! It's All a Blur was an incredible experience." },
    { id: 15, user: "Tina L.", rating: 4, comment: "High-energy show with great surprises and special guests." },
    { id: 31, user: "Anthony B.", rating: 5, comment: "Drake's stage presence is unmatched! The crowd was going wild all night." },
    { id: 32, user: "Nicole H.", rating: 4, comment: "Great mix of old and new hits. The production value was top-notch!" }
  ],
  8: [
    { id: 16, user: "Alex M.", rating: 5, comment: "Olivia Rodrigo's raw emotion was so powerful. GUTS World Tour was incredible." },
    { id: 17, user: "Ben S.", rating: 4, comment: "Amazing storytelling through music. Her voice is incredible live." },
    { id: 33, user: "Grace L.", rating: 5, comment: "Olivia's vulnerability on stage is so moving. She connects with every fan." },
    { id: 34, user: "Noah C.", rating: 4, comment: "The band was tight and the sound quality was perfect. Great show!" }
  ],
  9: [
    { id: 18, user: "Sophie H.", rating: 5, comment: "Harry Styles brought pure joy and love to the stage. Love On Tour was magical!" },
    { id: 19, user: "Ryan C.", rating: 5, comment: "Best concert experience ever! Harry's energy is infectious." },
    { id: 35, user: "Liam D.", rating: 4, comment: "Harry's fashion choices were iconic! The whole show was a visual feast." },
    { id: 36, user: "Zoe A.", rating: 5, comment: "The crowd was so diverse and loving! Harry creates such a safe space." }
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

      // PLuG - user identification (3)
      const options = {
        hostname: 'api.devrev.ai',
        path: '/auth-tokens.create',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(authTokenData),
          'authorization': 'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzExQ2NNTEVzUXM6ZGV2dS8xIiwiZXhwIjoxODUxNTEzMzU1LCJodHRwOi8vZGV2cmV2LmFpL2NsaWVudGlkIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzExQ2NNTEVzUXM6c3ZjYWNjLzIwIiwiaHR0cDovL2RldnJldi5haS9kZXZvX2RvbiI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by8xMUNjTUxFc1FzIiwiaHR0cDovL2RldnJldi5haS9kZXZvaWQiOiJERVYtMTFDY01MRXNRcyIsImh0dHA6Ly9kZXZyZXYuYWkvc3ZjYWNjIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvLzExQ2NNTEVzUXM6c3ZjYWNjLzIwIiwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOmFhdCIsImlhdCI6MTc1NjkwNTM1NSwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRva2VuLmRldnJldi5haS8iLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vMTFDY01MRXNRczp0b2tlbi9rMzJoVDZPdyIsInN1YiI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by8xMUNjTUxFc1FzOnN2Y2FjYy8yMCJ9.e41COfm59XJYN_jozN-AGQDsoD2WdYxGbfA_ZUdn2kMnOv94fjwWaOzAIFk7Mqpk_pdwDIj3S-dwQ4ORBpcduXV4GU0he22uUtVhKz7CiufKi9NeljHR0ohj7I6itmgsQAhgZr2Y2eWsQvpBhjRHojGJNKDvzhuLJdOFk-0tiJNBoDhQufE_zdqybQRN7ThCrbYRJWy78mZXH4ia5ic1e-OGC3LKuDl8BR7OnVX34Hci00jxT9Xww1nN4Gi6f9NeRHj7XEQNPnMD2-ADEbNFEyBvfkNf4rGsA88dOoDP7tKeCr7gmiAoPsj1wrw73TowadL1Ibm_zkzTzjWanhGARA'
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
  console.log(`🎵 Available endpoints:`);
  console.log(`   GET  /events`);
  console.log(`   GET  /events/:id`);
  console.log(`   POST /booking`);
  console.log(`   POST /payment`);
  console.log(`   POST /login`);
});
