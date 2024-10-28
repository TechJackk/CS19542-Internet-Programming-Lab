import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/rooms')
      .then(response => response.json())
      .then(data => setRooms(data));
  }, []);

  const handleBookRoom = (room) => {
    if (room.status === 'booked') {
      alert('This room is currently booked. Please choose another room.');
    } else {
      navigate('/booking', { state: { room } });
    }
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/" style={{color:'green'}}>Hotel Booking App</a>
            <a className="navbar-brand" href="/view-bookings" style={{color:'green'}}>View My Bookings</a> {/* Add link */}
          </div>
    </nav>
      {/* Content */}
      <div className="container mt-5 pt-5">
        <div style={{marginBottom:'5%', marginTop:'-3%'}}>
        <strong style={{fontSize:'200%'}}>Rooms Available at Chennai</strong>
        </div>
        <Row className="g-4">
          {rooms.map(room => (
            <Col key={room.id} xs={12} md={4}>
              <Card>
                <Card.Img variant="top" src={room.image} alt={room.name} style={{ height: '200px', objectFit: 'cover', maxWidth: '100%' }} />
                <Card.Body className="text-center">
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>{room.ac ? 'AC' : 'Non-AC'}</Card.Text>
                  <Card.Text className={room.status === 'booked' ? 'text-danger' : 'text-success'}>
                    {room.status === 'booked' ? 'Booked' : 'Available'}
                  </Card.Text>
                  <Button
                    variant={room.status === 'booked' ? 'danger' : 'success'}
                    onClick={() => handleBookRoom(room)}
                    disabled={room.status === 'booked'}
                  >
                    {room.status === 'booked' ? 'Booked' : 'Book Room'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default RoomList;
