import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { SignInModal, SignUpModal } from './AuthModals'; // Import the modals

const Home = () => {
  const [cities, setCities] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false); // State for Sign In modal
  const [showSignUp, setShowSignUp] = useState(false); // State for Sign Up modal

  useEffect(() => {
    fetch('http://localhost:5001/cities')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching city data:', error));
  }, []);

  // Handlers to toggle modals
  const handleShowSignIn = () => setShowSignIn(true);
  const handleShowSignUp = () => setShowSignUp(true);
  const handleClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div>
      {/* Custom Navbar using React-Bootstrap */}
      <Navbar variant="dark" expand="md" fixed="top" style={{backgroundColor:'#F4A460'}}>
        <Container fluid>
          <Navbar.Brand href="#">StaySmart</Navbar.Brand>
          <div>
          <Navbar.Toggle aria-controls="navbarCollapse" />
          </div>
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="me-auto">
              <Nav.Link href="#">Register My Hotel</Nav.Link>
              <Nav.Link href="/view-bookings">View My Bookings</Nav.Link>
             {/* <Nav.Link disabled aria-disabled="true">Disabled</Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              <Button className='me-2' variant='outline-success' onClick={handleShowSignIn}>SignIn</Button>
              <Button variant="outline-success" onClick={handleShowSignUp}>SignUp</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Include the modals */}
      <SignInModal show={showSignIn} handleClose={handleClose} />
      <SignUpModal show={showSignUp} handleClose={handleClose} />

      {/* Main Section */}
      <section id="demos">
        <div className="container-fluid px-md-5">
          {/* Title */}
          <div className="row mb-4 position-relative">
            <div className="col-xl-6 mx-auto text-center">
              <h2 className='begin-travel' style={{ padding: '3%' }}>Let's Begin Your Adventure!</h2>
              <p className='caveat-description' style={{ padding: '5%' }}>
                Find the perfect place for your next getaway. Whether you’re looking for a peaceful retreat or a luxurious stay, we’ve got rooms designed just for you. Explore our top choices and make your travel dreams come true. Book now and experience comfort like never before!
              </p>
            </div>
          </div>

          {/* Pages START */}
          <div className="row g-4 g-xl-7 demo-grid">
            {cities.length > 0 ? (
              cities.map((city) => (
                <div
                  key={city.city_id}
                  className="col-sm-6 col-lg-4 col-xxl-3 demo-grid-item animate__animated animate__fadeInUp"
                  style={{ position: 'relative' }}
                >
                  <div className="card card-hover-shadow border">
                    <img
                      src={city.img || '/default-image.jpg'} // Fallback image if img is undefined
                      className="card-img-top"
                      alt={city.city_name || 'City Image'} // Fallback alt text
                    />
                    <div className="card-body border-top">
                      <h6 className="mb-0">
                        <a href="/roomlist" className="stretched-link">
                          {city.city_name}
                        </a>
                      </h6>
                      <small>{city.description}</small>
                    </div>
                    <div>
                      <strong>{city.StartingPrice}</strong>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Loading cities...</div> // Show loading message while data is being fetched
            )}
          </div>
          {/* Pages END */}
        </div>
      </section>

      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">Why are you waiting???</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4" style={{ marginTop: '3%' }}>StaySmart - Where Comfort Meets Convenience</p>
          <p className="lead mb-4">Join Nowwww!</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Button variant="outline-success" className="btn-lg px-4 me-sm-3" onClick={handleShowSignIn}>SignIn</Button>
            <Button variant="outline-success" className="btn-lg px-4" onClick={handleShowSignUp}>SignUp</Button>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
          <div className="container px-5">
            <img
              src="/tourtheme.jpeg"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">About</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">Privacy Policy / Terms & Conditions</a>
            </li>
            <li className="nav-item">
              <a href="https://www.linkedin.com/in/seenuvasans" className="nav-link px-2 text-body-secondary">LinkedIn</a>
            </li>
            <li className="nav-item">
              <a href="mailto:seenuseenu2815@gmail.com" className="nav-link px-2 text-body-secondary">Drop Us a Line</a>
            </li>
          </ul>
          <p className="text-center text-body-secondary">© 2024 StaySmart, Inc</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
