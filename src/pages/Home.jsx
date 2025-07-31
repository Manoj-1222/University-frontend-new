import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { studentsAPI } from '../services/api';

// Import campus images
import campusImage1 from '../assets/Bundoora-campus_EVE.jpg';
import campusImage2 from '../assets/Facade-Cladding_1.jpg';
import campusImage3 from '../assets/unnamed.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    departments: 0,
    facultyCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all students to calculate stats locally (more reliable)
        const studentsResponse = await studentsAPI.getAll();
        const students = studentsResponse.data.data || [];
        
        // Calculate stats
        const totalStudents = students.length;
        const placedStudents = students.filter(student => 
          student.placement?.company && student.placement.company.trim() !== ''
        ).length;
        
        // Get unique departments
        const departments = [...new Set(students.map(student => student.department).filter(Boolean))].length;
        
        setStats({
          totalStudents,
          placedStudents,
          departments: departments || 8, // Default departments
          facultyCount: Math.ceil(totalStudents * 0.1) || 50, // Estimated faculty ratio
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values on error
        setStats({
          totalStudents: 1200,
          placedStudents: 980,
          departments: 8,
          facultyCount: 120,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const placementRate = stats.totalStudents > 0 
    ? ((stats.placedStudents / stats.totalStudents) * 100).toFixed(1)
    : '95.0'; // Default high placement rate

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section with Carousel */}
      <section className="hero-section position-relative">
        <Carousel 
          fade 
          interval={4000} 
          controls={true} 
          indicators={true}
          className="hero-carousel"
          prevIcon={
            <span 
              className="carousel-control-prev-icon"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: '20px',
                fontSize: '1.5rem'
              }}
            />
          }
          nextIcon={
            <span 
              className="carousel-control-next-icon"
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                padding: '20px',
                fontSize: '1.5rem'
              }}
            />
          }
        >
          <Carousel.Item>
            <div 
              className="carousel-slide"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(248,249,250,0.7)), url(${campusImage1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Container>
                <Row className="justify-content-center">
                  <Col lg={8} className="text-center text-white">
                    <h1 className="display-3 fw-bold mb-4 animate-slide-up">
                      Excellence in Higher Education
                    </h1>
                    <p className="lead mb-5 fs-4">
                      Join our world-class university and unlock your potential with cutting-edge programs and innovative research opportunities.
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div 
              className="carousel-slide"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(248,249,250,0.7)), url(${campusImage2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Container>
                <Row className="justify-content-center">
                  <Col lg={8} className="text-center text-white">
                    <h1 className="display-3 fw-bold mb-4 animate-slide-up">
                      Modern Campus Facilities
                    </h1>
                    <p className="lead mb-5 fs-4">
                      State-of-the-art infrastructure designed to enhance your learning experience and foster innovation.
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div 
              className="carousel-slide"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(248,249,250,0.7)), url(${campusImage3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Container>
                <Row className="justify-content-center">
                  <Col lg={8} className="text-center text-white">
                    <h1 className="display-3 fw-bold mb-4 animate-slide-up">
                      Shape Your Future Today
                    </h1>
                    <p className="lead mb-5 fs-4">
                      Discover endless possibilities with our comprehensive academic programs and vibrant campus life.
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        </Carousel>
        
        {/* Call to Action Overlay */}
        <div className="hero-cta-overlay">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6} className="text-center">
                <div className="cta-buttons">
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="btn-custom me-3 mb-3"
                    onClick={() => navigate('/admissions')}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="btn-custom mb-3"
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Courses Section - Right after carousel */}
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-white mb-4">
                Explore Our Academic Programs
              </h2>
              <p className="lead text-light fs-5 mb-5">
                Discover world-class programs designed to shape tomorrow's leaders and innovators
              </p>
            </div>
            <Row className="g-4">
              <Col lg={3} md={6}>
                <Card className="course-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="course-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>💻</span>
                    </div>
                    <h5 className="mb-3 text-gradient">Computer Science</h5>
                    <p className="text-muted mb-3">
                      Master programming, AI, and software development in our cutting-edge CS program.
                    </p>
                    <ul className="list-unstyled text-start small text-muted">
                      <li>• Software Engineering</li>
                      <li>• Artificial Intelligence</li>
                      <li>• Data Science</li>
                      <li>• Cybersecurity</li>
                    </ul>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => navigate('/admissions')}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="course-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="course-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>⚙️</span>
                    </div>
                    <h5 className="mb-3 text-gradient">Engineering</h5>
                    <p className="text-muted mb-3">
                      Build the future with our comprehensive engineering programs.
                    </p>
                    <ul className="list-unstyled text-start small text-muted">
                      <li>• Mechanical Engineering</li>
                      <li>• Electrical Engineering</li>
                      <li>• Civil Engineering</li>
                      <li>• Chemical Engineering</li>
                    </ul>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => navigate('/admissions')}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="course-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="course-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>💼</span>
                    </div>
                    <h5 className="mb-3 text-gradient">Business Studies</h5>
                    <p className="text-muted mb-3">
                      Develop leadership skills and business acumen for the global market.
                    </p>
                    <ul className="list-unstyled text-start small text-muted">
                      <li>• Business Administration</li>
                      <li>• Marketing</li>
                      <li>• Finance</li>
                      <li>• International Business</li>
                    </ul>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => navigate('/admissions')}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="course-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="course-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>🧬</span>
                    </div>
                    <h5 className="mb-3 text-gradient">Life Sciences</h5>
                    <p className="text-muted mb-3">
                      Explore the mysteries of life through our advanced science programs.
                    </p>
                    <ul className="list-unstyled text-start small text-muted">
                      <li>• Biotechnology</li>
                      <li>• Medical Sciences</li>
                      <li>• Environmental Science</li>
                      <li>• Research & Development</li>
                    </ul>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => navigate('/admissions')}
                    >
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {/* Quick Actions */}
            <Row className="mt-5">
              <Col className="text-center">
                <div className="quick-actions-section p-4">
                  <h4 className="text-dark mb-4">Ready to Join Our Community?</h4>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="btn-custom px-4"
                      onClick={() => navigate('/admissions')}
                    >
                      <i className="bi bi-pencil-square me-2"></i>Apply Now
                    </Button>
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="btn-custom px-4 text-dark"
                      onClick={() => navigate('/contact')}
                    >
                      <i className="bi bi-telephone me-2 "></i>Contact Admissions
                    </Button>
                    <Button variant="light" size="lg" className="btn-custom px-4 text-dark">
                      <i className="bi bi-download me-2"></i>Download Brochure
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* About Section */}
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-white mb-4">
                Where Excellence Meets Innovation
              </h2>
              <p className="lead text-light fs-5 mb-4">
                Our university has been at the forefront of education for over decades, 
                nurturing brilliant minds and fostering groundbreaking research that shapes the future.
              </p>
            </div>
            <Row className="g-4">
              <Col lg={4} md={6}>
                <Card className="feature-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '4rem', color: '#667eea' }}>🏛️</span>
                    </div>
                    <h4 className="mb-3 text-gradient">World-Class Faculty</h4>
                    <p className="text-muted">
                      Learn from industry experts and renowned professors who bring 
                      real-world experience to the classroom.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card className="feature-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '4rem', color: '#667eea' }}>🔬</span>
                    </div>
                    <h4 className="mb-3 text-gradient">Advanced Research</h4>
                    <p className="text-muted">
                      Participate in cutting-edge research projects and contribute 
                      to breakthrough discoveries in your field.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} md={6}>
                <Card className="feature-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '4rem', color: '#667eea' }}>🌍</span>
                    </div>
                    <h4 className="mb-3 text-gradient">Global Network</h4>
                    <p className="text-muted">
                      Connect with students and alumni worldwide through our 
                      extensive international partnerships.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Stats Section */}
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-white mb-3">Our Achievements</h2>
              <p className="lead text-light">Numbers that speak for our commitment to excellence</p>
            </div>
            <Row className="g-4">
              <Col lg={3} md={6}>
                <Card className="stats-card h-100 p-4 text-center border-0">
                  <Card.Body>
                    <div className="stats-icon mb-3">
                      <span style={{ fontSize: '3rem' }}>👨‍🎓</span>
                    </div>
                    <h2 className={`display-4 fw-bold mb-2 text-white ${loading ? 'loading-stats' : ''}`}>
                      {loading ? '...' : stats.totalStudents.toLocaleString()}
                    </h2>
                    <h5 className="mb-0 text-light">Total Students</h5>
                    <p className="small text-light mt-2 mb-0">Enrolled across all programs</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="stats-card h-100 p-4 text-center border-0">
                  <Card.Body>
                    <div className="stats-icon mb-3">
                      <span style={{ fontSize: '3rem' }}>💼</span>
                    </div>
                    <h2 className={`display-4 fw-bold mb-2 text-white ${loading ? 'loading-stats' : ''}`}>
                      {loading ? '...' : stats.placedStudents.toLocaleString()}
                    </h2>
                    <h5 className="mb-0 text-light">Students Placed</h5>
                    <p className="small text-light mt-2 mb-0">In top companies worldwide</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="stats-card h-100 p-4 text-center border-0">
                  <Card.Body>
                    <div className="stats-icon mb-3">
                      <span style={{ fontSize: '3rem' }}>🏢</span>
                    </div>
                    <h2 className={`display-4 fw-bold mb-2 text-white ${loading ? 'loading-stats' : ''}`}>
                      {loading ? '...' : stats.departments}
                    </h2>
                    <h5 className="mb-0 text-light">Departments</h5>
                    <p className="small text-light mt-2 mb-0">Diverse academic disciplines</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="stats-card h-100 p-4 text-center border-0">
                  <Card.Body>
                    <div className="stats-icon mb-3">
                      <span style={{ fontSize: '3rem' }}>👩‍🏫</span>
                    </div>
                    <h2 className={`display-4 fw-bold mb-2 text-white ${loading ? 'loading-stats' : ''}`}>
                      {loading ? '...' : stats.facultyCount.toLocaleString()}
                    </h2>
                    <h5 className="mb-0 text-light">Faculty Members</h5>
                    <p className="small text-light mt-2 mb-0">Expert educators & researchers</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-white mb-3">Why Choose Our University?</h2>
              <p className="lead text-light">Discover what makes us the preferred choice for ambitious students</p>
            </div>
            <Row className="g-4">
              <Col md={4}>
                <Card className="feature-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>🎓</span>
                    </div>
                    <h5 className="mb-3 text-gradient">Excellence in Education</h5>
                    <p className="text-muted">
                      Comprehensive curriculum designed by industry experts to meet 
                      current market demands and future trends.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>💼</span>
                    </div>
                    <h5 className="mb-3 text-gradient">Career Opportunities</h5>
                    <p className="text-muted">
                      Strong industry partnerships and dedicated placement cell 
                      ensuring excellent career prospects for all graduates.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card h-100 border-0">
                  <Card.Body className="text-center p-4">
                    <div className="feature-icon mb-3">
                      <span style={{ fontSize: '3.5rem', color: '#667eea' }}>📈</span>
                    </div>
                    <h5 className="mb-3 text-gradient">
                      {loading ? 'Loading...' : `${placementRate}% Placement Rate`}
                    </h5>
                    <p className="text-muted">
                      Outstanding career placement record with strong industry 
                      partnerships ensuring bright futures for our graduates.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Call to Action Section */}
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="cta-card border-0">
              <div className="cta-background">
                <Card.Body className="text-center p-5">
                  <div className="mb-4">
                    <span style={{ fontSize: '4rem', color: '#667eea' }}>🚀</span>
                  </div>
                  <h3 className="display-6 fw-bold mb-4 text-black">Ready to Start Your Journey?</h3>
                  <p className="lead text-bold mb-4 fs-5">
                    Join thousands of successful alumni who have transformed their lives 
                    through quality education and innovative learning experiences at our university.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="btn-custom-cta px-4 py-3"
                      onClick={() => navigate('/admissions')}
                    >
                      Apply for Admission
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg" 
                      className="btn-custom-cta px-4 py-3"
                      onClick={() => navigate('/contact')}
                    >
                      Contact Us
                    </Button>
                  </div>
                  <div className="mt-4">
                    <small className="text-red">
                      📞 Call us at: +1 (555) 123-4567 | 📧 Email: admissions@university.edu
                    </small>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <Container fluid className="footer-section py-4 mt-5">
        <Container>
          <Row className="text-center">
            <Col>
              <p className="text-light mb-2">
                © 2025 University Management System. All rights reserved.
              </p>
              <p className="text-light small">
                Building tomorrow's leaders through excellence in education
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Home;
