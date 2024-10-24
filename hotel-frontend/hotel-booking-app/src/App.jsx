import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import ViewBookings from './components/ViewBookings'; 
import Home from './components/home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/roomlist" element={<RoomList />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/view-bookings" element={<ViewBookings />} />
          <Route path="/" element={<Home></Home>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
