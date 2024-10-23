import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import ViewBookings from './components/ViewBookings'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">Hotel Booking App</a>
            <a className="navbar-brand" href="/view-bookings">View My Bookings</a> {/* link add */}
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<RoomList />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/view-bookings" element={<ViewBookings />} /> {/* route add */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
