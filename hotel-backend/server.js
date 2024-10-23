const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import CORS
require('dotenv').config();

const app = express();
const PORT = 5001;

// Middleware to enable CORS and parse JSON
app.use(cors()); // Enable CORS
app.use(express.json());

// MySQL connection using environment variables from process.env
const db = mysql.createConnection({
    host: process.env.DB_HOST,       // Loaded from .env file
    user: process.env.DB_USER,       // Loaded from .env file
    password: process.env.DB_PASSWORD, // Loaded from .env file
    database: process.env.DB_NAME,   // Loaded from .env file
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Fetch all rooms
app.get('/rooms', (req, res) => {
    const query = 'SELECT * FROM rooms';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Handle room bookings
app.post('/bookings', (req, res) => {
    const { name, email, room_id } = req.body;

    // Check if the room is already booked
    const checkRoomQuery = 'SELECT status FROM rooms WHERE id = ?';
    db.query(checkRoomQuery, [room_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results[0]?.status === 'booked') {
            return res.status(400).json({ message: 'Room is already booked' });
        }

        // Proceed with booking
        const bookingQuery = 'INSERT INTO bookings (name, email, room_id) VALUES (?, ?, ?)';
        db.query(bookingQuery, [name, email, room_id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Update room status to booked
            const updateRoomQuery = 'UPDATE rooms SET status = ? WHERE id = ?';
            db.query(updateRoomQuery, ['booked', room_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Room booked successfully' });
            });
        });
    });
});

// New route to get bookings by email
app.get('/bookings/:email', (req, res) => {
    const email = req.params.email;
    const query = 'SELECT * FROM bookings WHERE email = ?';

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: 'No bookings found' });
        }
    });
});

// Delete a booking and update the room status
app.delete('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    //console.log('bookingId');
    const getRoomQuery = 'SELECT room_id FROM bookings WHERE id = ?';
    db.query(getRoomQuery, [bookingId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const roomId = results[0].room_id;

        // Delete the booking from bookings table
        const deleteBookingQuery = 'DELETE FROM bookings WHERE room_id = ?';
        db.query(deleteBookingQuery, [bookingId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Update the room status to 'available'
            const updateRoomStatusQuery = 'UPDATE rooms SET status = ? WHERE id = ?';
            db.query(updateRoomStatusQuery, ['available', roomId], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Booking cancelled and room status updated' });
            });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
