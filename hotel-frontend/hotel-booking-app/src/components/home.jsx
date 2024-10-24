import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';

const Home = () => {
  // Demo data for cards
  const demoSites = [
    {
      id: 1,
      img: '/chennai.jpg',
      title: 'Chennai',
      description: 'Art & Culture . Beaches',
      StartingPrice: 'Fromm Rs.1999'
    },
    {
      id: 2,
      img: '/kochi.jpeg',
      title: 'Kochi',
      description: 'Nature & Wildlife . Art & Culture',
      StartingPrice: 'Fromm Rs.1899'
    },
    {
      id: 3,
      img: '/goa.jpeg',
      title: 'Goa',
      description: 'Beaches . Food & Drink',
      StartingPrice: 'Fromm Rs.1999'
    },
    {
      id: 4,
      img: '/public/agra.jpg',
      title: 'Agra',
      description: 'Art & Culture . Food & Drink',
      StartingPrice: 'Fromm Rs.1999'
    },
    {
      id: 5,
      img: '/public/delhi.jpg',
      title: 'Delhi',
      description: 'Art & Culture . Family',
      StartingPrice: 'Fromm Rs.1999'
    },
    {
      id: 6,
      img: '/public/mumbai.jpg',
      title: 'Mumbai',
      description: 'Beaches . Art & Culture',
      StartingPrice: 'Fromm Rs.1999'
    },
    {
      id: 7,
      img: '/public/bengaluru.webp',
      title: 'Bengaluru',
      description: 'Nightlife . Art & Culture',
      StartingPrice: 'Fromm Rs.1999'
    },
    {
      id: 8,
      img: '/public/cuddalore.jpg',
      title: 'Cuddalore',
      description: 'Beaches . Luxury textures',
      StartingPrice: 'Fromm Rs.1999'
    },
    // Add more card data here
  ];

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
              <Button className='me-2' variant='outline-success'>SignIn</Button>
              <Button variant="outline-success" type="submit">SignUp</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Section */}
      <section id="demos">
        <div className="container-fluid px-md-5">
          {/* Title */}
          <div className="row mb-4 position-relative">
            <div className="col-xl-6 mx-auto text-center">
              <h2 className='begin-travel' style={{padding:'3%'}}>Let's Begin Your Adventure!</h2>
              <p className='caveat-description' style={{padding:'5%'}}>Find the perfect place for your next getaway. Whether you’re looking for a peaceful retreat or a luxurious stay, we’ve got rooms designed just for you. Explore our top choices and make your travel dreams come true. Book now and experience comfort like never before!</p>
            </div>
          </div>

          {/* Pages START */}
          <div className="row g-4 g-xl-7 demo-grid">
            {demoSites.map((site, index) => (
              <div
                key={site.id}
                className="col-sm-6 col-lg-4 col-xxl-3 demo-grid-item animate__animated animate__fadeInUp"
                style={{ position: 'relative' }}
              >
                <div className="card card-hover-shadow border">
                  <img
                    src={site.img}
                    className="card-img-top"
                    alt={site.title}
                  />
                  <div className="card-body border-top">
                    <h6 className="mb-0">
                      <a href="#" className="stretched-link">
                        {site.title}
                      </a>
                    </h6>
                    <small>{site.description}</small>
                  </div>
                  <div>
                  <strong>{site.StartingPrice}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pages END */}
        </div>
      </section>
      <div className="px-4 pt-5 my-5 text-center border-bottom">
  <h1 className="display-4 fw-bold text-body-emphasis">Why are you waiting???</h1>
  <div className="col-lg-6 mx-auto">
    <p className="lead mb-4" style={{marginTop:'3%'}}>StaySmart - Where Comfort Meets Convenience</p>
    <p className="lead mb-4">Join Nowwww!</p>
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
    <Button variant="outline-success" className="btn-lg px-4 me-sm-3">SignUp</Button>
    <Button variant="outline-success" className="btn-lg px-4">SignIn</Button>
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
