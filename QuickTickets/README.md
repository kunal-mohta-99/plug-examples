# QuickTickets - Full-Stack Demo App

A complete ticket booking application built with React frontend and Express backend, designed to showcase session recording, user identification, and error handling capabilities.

## 🚀 Features

- **Event Browsing**: View and explore various events (concerts, comedy, sports)
- **Ticket Booking**: Interactive seat selection with booking system
- **Payment Processing**: Simulated payment flow with error handling
- **User Authentication**: Login system with user identification
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 19 with React Router
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js with Express
- CORS enabled for cross-origin requests
- Mock data with simulated API delays
- Error simulation for testing

## 📁 Project Structure

```
QuickTickets/
├── api/                 # Express backend
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   └── node_modules/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── contexts/   # React contexts
│   │   ├── services/   # API services
│   │   └── App.js      # Main app component
│   ├── package.json    # Frontend dependencies
│   └── node_modules/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:4000`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Events
- `GET /events` - List all events (500ms delay)
- `GET /events/:id` - Get event details with reviews (2-3s delay)

### Booking
- `POST /booking` - Create a new booking (20% chance of error)

### Payment
- `POST /payment` - Process payment (20% chance of error, masks sensitive data)

### Authentication
- `POST /login` - User login (always succeeds in demo)

## 🎯 Demo Features

### Session Recording
- Complete user journey from event browsing to ticket confirmation
- Interactive seat selection
- Form submissions and navigation

### Error Handling
- Random API failures in booking and payment
- Error toasts and user feedback
- Graceful error recovery

### User Identification
- Login system with user context
- User state management across the app

### Sensitive Data Masking
- Credit card and CVV masking in backend logs
- Secure data handling simulation

### Performance Testing
- Simulated slow API responses
- Loading states and user feedback

## 🎨 UI Components

- **Navbar**: Navigation with user authentication status
- **Event Cards**: Responsive grid layout for events
- **Seat Selector**: Interactive grid for seat selection
- **Forms**: Styled forms for booking and payment
- **Loading States**: User feedback during API calls
- **Error Handling**: Toast notifications and error displays

## 🔧 Customization

### Adding New Events
Edit the `events` array in `api/server.js` to add more events.

### Modifying API Delays
Adjust the delay values in the backend routes to test different response times.

### Styling Changes
Modify Tailwind classes or add custom CSS in `src/App.css`.

## �� Troubleshooting

### Backend Issues
- Ensure port 4000 is available
- Check that all dependencies are installed
- Verify CORS configuration

### Frontend Issues
- Clear browser cache
- Check console for JavaScript errors
- Verify proxy configuration in package.json

### Common Issues
- **CORS errors**: Ensure backend is running and CORS is enabled
- **Proxy issues**: Check that proxy is set to `http://localhost:4000` in frontend package.json
- **Port conflicts**: Change ports in server.js and package.json if needed

## 📝 Notes

- This is a demo application with mock data
- No real database or payment processing
- Designed for testing and demonstration purposes
- Sensitive data is masked in backend logs
- Random errors are simulated for testing error handling

## 🤝 Contributing

Feel free to modify and extend this demo application for your own testing and demonstration needs.

---

Built with ❤️ for session recording and user experience testing
