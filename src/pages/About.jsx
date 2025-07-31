import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="text-white mb-3">About Our University</h1>
              <p className="text-white-50 lead">
                Committed to excellence in education, research, and service to our community.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col lg={6}>
            <Card className="card-custom h-100">
              <Card.Body className="p-4">
                <h3 className="text-gradient mb-3">Our Mission</h3>
                <p className="text-muted">
                  To provide world-class education that empowers students to become leaders 
                  and innovators in their chosen fields. We are committed to fostering 
                  critical thinking, creativity, and ethical leadership while advancing 
                  knowledge through cutting-edge research and community engagement.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="card-custom h-100">
              <Card.Body className="p-4">
                <h3 className="text-gradient mb-3">Our Vision</h3>
                <p className="text-muted">
                  To be a globally recognized institution of higher learning that shapes 
                  the future through innovative education, groundbreaking research, and 
                  meaningful partnerships. We envision a university that transforms lives 
                  and communities while addressing the world's most pressing challenges.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col>
            <Card className="card-custom">
              <Card.Body className="p-4">
                <h3 className="text-gradient mb-4">Our History</h3>
                <p className="text-muted mb-3">
                  Founded in 1965, our university has grown from a small local college to 
                  a comprehensive institution serving thousands of students from around the world. 
                  Over the decades, we have built a reputation for academic excellence, innovative 
                  research, and strong industry partnerships.
                </p>
                <p className="text-muted">
                  Today, we offer a wide range of undergraduate and graduate programs across 
                  multiple disciplines, supported by state-of-the-art facilities and a dedicated 
                  faculty committed to student success. Our alumni network spans the globe, 
                  with graduates making significant contributions in their respective fields.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem', color: '#667eea' }}>🎓</span>
                </div>
                <h5 className="mb-3">Academic Excellence</h5>
                <p className="text-muted">
                  Rigorous academic programs designed to challenge and inspire students 
                  to reach their full potential.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem', color: '#667eea' }}>🔬</span>
                </div>
                <h5 className="mb-3">Research Innovation</h5>
                <p className="text-muted">
                  Cutting-edge research facilities and opportunities for students to 
                  participate in groundbreaking discoveries.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem', color: '#667eea' }}>🌍</span>
                </div>
                <h5 className="mb-3">Global Community</h5>
                <p className="text-muted">
                  A diverse and inclusive campus community that prepares students 
                  for success in a globalized world.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Campus Life Section */}
        <Row className="g-4 mb-5">
          <Col>
            <Card className="card-custom">
              <Card.Body className="p-4">
                <h3 className="text-gradient mb-4 text-center">Campus Life</h3>
                <p className="text-muted text-center mb-4">
                  Experience a vibrant campus community where learning extends beyond the classroom
                </p>
                
                <Row className="g-4">
                  <Col lg={4} md={6}>
                    <div className="campus-image-container">
                      <img 
                        src="/src/assets/campus life/Campus-Life.png" 
                        alt="Campus Life Activities" 
                        className="img-fluid rounded"
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                      <div className="mt-3 text-center">
                        <h6 className="mb-2">Student Activities</h6>
                        <p className="text-muted small">
                          Join clubs, organizations, and events that match your interests
                        </p>
                      </div>
                    </div>
                  </Col>
                  
                  <Col lg={4} md={6}>
                    <div className="campus-image-container">
                      <img 
                        src="/src/assets/campus life/rmit campus life.jpg" 
                        alt="Campus Facilities" 
                        className="img-fluid rounded"
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                      <div className="mt-3 text-center">
                        <h6 className="mb-2">Modern Facilities</h6>
                        <p className="text-muted small">
                          State-of-the-art infrastructure for learning and recreation
                        </p>
                      </div>
                    </div>
                  </Col>
                  
                  <Col lg={4} md={6}>
                    <div className="campus-image-container">
                      <img 
                        src="/src/assets/campus life/vjp-219-S.jpg" 
                        alt="Campus Environment" 
                        className="img-fluid rounded"
                        style={{ 
                          width: '100%', 
                          height: '200px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                      <div className="mt-3 text-center">
                        <h6 className="mb-2">Campus Environment</h6>
                        <p className="text-muted small">
                          Beautiful and peaceful environment conducive to learning
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
                
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Our campus offers a perfect blend of academic excellence and vibrant social life, 
                    creating memories that last a lifetime.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={6}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Our Departments</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">🖥️ Computer Science Engineering</li>
                  <li className="mb-2">⚡ Electronics and Communication Engineering</li>
                  <li className="mb-2">⚙️ Mechanical Engineering</li>
                  <li className="mb-2">🏗️ Civil Engineering</li>
                  <li className="mb-2">🔌 Electrical Engineering</li>
                  <li className="mb-2">💻 Information Technology</li>
                  <li className="mb-2">📊 Business Administration</li>
                  <li className="mb-2">🎓 Master of Computer Applications</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Campus Facilities</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li className="mb-2">📚 Modern Library with Digital Resources</li>
                  <li className="mb-2">🔬 Advanced Research Laboratories</li>
                  <li className="mb-2">💻 Computer Centers with Latest Technology</li>
                  <li className="mb-2">🏃‍♂️ Sports and Recreation Facilities</li>
                  <li className="mb-2">🍽️ Dining Halls and Cafeterias</li>
                  <li className="mb-2">🏠 On-Campus Housing</li>
                  <li className="mb-2">🚌 Transportation Services</li>
                  <li className="mb-2">🏥 Health and Wellness Center</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
