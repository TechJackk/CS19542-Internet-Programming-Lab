const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2/promise for async/await
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
require('dotenv').config();

const app = express();
const PORT = 5001;

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Create a pool for MySQL connections
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Loaded from .env file
    user: process.env.DB_USER,       // Loaded from .env file
    password: process.env.DB_PASSWORD, // Loaded from .env file
    database: process.env.DB_NAME,   // Loaded from .env file
});

// Connect to MySQL database
pool.getConnection()
    .then(() => console.log('MySQL connected...'))
    .catch(err => console.error('MySQL connection error:', err));

// Get all rooms
app.get('/rooms', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM rooms');
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Book a room
app.post('/bookings', async (req, res) => {
    const { name, email, room_id } = req.body;

    try {
        const [results] = await pool.query('SELECT status FROM rooms WHERE id = ?', [room_id]);

        if (results[0]?.status === 'booked') {
            return res.status(400).json({ message: 'Room is already booked' });
        }

        // Proceed with booking
        await pool.query('INSERT INTO bookings (name, email, room_id) VALUES (?, ?, ?)', [name, email, room_id]);

        // Update room status to booked
        await pool.query('UPDATE rooms SET status = ? WHERE id = ?', ['booked', room_id]);

        res.status(201).json({ message: 'Room booked successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// New route to get bookings by email
app.get('/bookings/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const [results] = await pool.query('SELECT * FROM bookings WHERE email = ?', [email]);
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: 'No bookings found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Delete a booking and update the room status
app.delete('/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        const [bookingResults] = await pool.query('SELECT room_id FROM bookings WHERE id = ?', [bookingId]);
        if (bookingResults.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const room_id = bookingResults[0].room_id;

        // Delete the booking
        await pool.query('DELETE FROM bookings WHERE id = ?', [bookingId]);

        // Update the room status to 'available'
        await pool.query('UPDATE rooms SET status = ? WHERE id = ?', ['available', room_id]);

        res.status(200).json({ message: 'Booking cancelled and room status updated' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Get all cities
app.get('/cities', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM cities');
        res.json(results);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        // Check if the results array is defined and has any users
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        await pool.query('INSERT INTO users (name, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [name, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
