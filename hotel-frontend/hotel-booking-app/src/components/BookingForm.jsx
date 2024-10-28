import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const BookingForm = () => {
  const { state } = useLocation();
  const room = state?.room;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = { name, email, room_id: room.id };

    try {
      const response = await fetch('http://localhost:5001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert(`Booking successful for ${name} in ${room.name}`);
      } else {
        alert('Failed to book the room');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/" style={{color:'green'}}>Hotel Booking App</a>
            <a className="navbar-brand" href="/view-bookings" style={{color:'green'}}>View My Bookings</a> {/* Add link */}
          </div>
        </nav>
      <Container className="bg-white p-5 shadow" style={{ maxWidth: '500px', borderRadius: '10px',}}>
        <h2 className="mb-4">Book a Room: {room.name}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>

          <Button className="mt-4" variant="primary" type="submit" block>
            Book Now!
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default BookingForm;
