import React, { useState } from 'react';
import { Form, Button, Container, Table } from 'react-bootstrap';

const ViewBookings = () => {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:5001/bookings/${email}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        setError('No bookings found');
        setBookings([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch bookings');
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5001/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBookings(bookings.filter(booking => booking.room_id !== bookingId));
        alert('Booking cancelled successfully.');
      } else {
        alert('failed to cancel booking.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while cancelling the booking.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>View My Bookings</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Search
        </Button>
      </Form>

      {error && <p className="mt-3 text-danger">{error}</p>}

      {bookings.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>CUST. ID</th>
              <th>CUST. Name</th>
              <th>CUST. Email</th>
              <th>Booked Room No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.name}</td>
                <td>{booking.email}</td>
                <td>{booking.room_id}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleCancelBooking(booking.room_id)}
                  >
                    Cancel Booking
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ViewBookings;
