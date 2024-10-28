import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export const SignInModal = ({ show, handleClose }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                    <a 
                        style={{ color: 'red', fontSize: '80%', cursor: 'pointer' }} 
                        onClick={() => alert('Forgot password functionality here')}
                    >
                        forgot password?
                    </a>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: '2%' }}>
                    Sign In
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
);

export const SignUpModal = ({ show, handleClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            setSuccessMessage('');
            return;
        }

        try {
            // Send POST request to backend
            const response = await axios.post('http://localhost:5001/signup', {
                name,
                email,
                password,
            });

            // Handle success and clear form inputs
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Error occurred');
            setSuccessMessage('');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSignup}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Create Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginTop: '2%' }}>
                        Sign Up
                    </Button>
                    {errorMessage && <p style={{ color: 'red', marginTop: '1em' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green', marginTop: '1em' }}>{successMessage}</p>}
                </Form>
            </Modal.Body>
        </Modal>
    );
};
