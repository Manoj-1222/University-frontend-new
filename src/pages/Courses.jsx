import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { coursesAPI } from '../services/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await coursesAPI.getAll();

            // Handle different response structures
            const coursesData = response.data?.data || response.data || [];
            setCourses(Array.isArray(coursesData) ? coursesData : []);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyNow = () => {
        navigate('/admissions');
    };

    const getDurationText = (duration) => {
        if (!duration) return 'Duration not specified';
        return `${duration} ${duration === 1 ? 'Year' : 'Years'}`;
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="text-center">
                    <Spinner animation="border" variant="primary" size="lg" />
                    <h4 className="mt-3">Loading Courses...</h4>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Error Loading Courses</Alert.Heading>
                    <p>{error}</p>
                    <Button variant="outline-danger" onClick={fetchCourses}>
                        Try Again
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            {/* Hero Section */}
            <section 
                className="text-white py-5" 
                style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    marginTop: '76px' // Account for fixed navbar height
                }}
            >
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={10}>
                            <h1 className="display-3 fw-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                                Our Academic Programs
                            </h1>
                            <p className="lead fs-4 mb-0" style={{ fontWeight: '300', opacity: '0.95' }}>
                                Discover excellence in education through our diverse range of programs
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Courses Grid */}
            <Container className="py-5">
                {courses.length === 0 ? (
                    <Row className="justify-content-center">
                        <Col lg={8} className="text-center">
                            <div className="py-5">
                                <div 
                                    className="mx-auto mb-4" 
                                    style={{ 
                                        width: '80px', 
                                        height: '4px', 
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '2px'
                                    }}
                                ></div>
                                <h3 className="text-muted mb-3" style={{ fontWeight: '300' }}>
                                    No Courses Available
                                </h3>
                                <p className="text-muted mb-4">
                                    Our academic programs are currently being updated. Please check back soon.
                                </p>
                                <Button 
                                    variant="outline-primary" 
                                    onClick={fetchCourses}
                                    style={{ borderRadius: '25px', padding: '10px 30px' }}
                                >
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Refresh
                                </Button>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <>
                        {/* Section Title */}
                        <Row className="mb-5">
                            <Col lg={12} className="text-center">
                                <div 
                                    className="mx-auto mb-3" 
                                    style={{ 
                                        width: '80px', 
                                        height: '4px', 
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '2px'
                                    }}
                                ></div>
                                <h2 className="mb-3" style={{ fontWeight: '300', color: '#495057' }}>
                                    Available Programs
                                </h2>
                                <p className="text-muted">
                                    Choose from our carefully curated academic programs
                                </p>
                            </Col>
                        </Row>
                        
                        <Row className="g-4">
                            {courses.map((course) => (
                                <Col xl={4} lg={6} md={6} className="mb-4" key={course.id}>
                                    <Card 
                                        className="h-100 border-0 shadow-sm"
                                        style={{ 
                                            borderRadius: '15px',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <Card.Body className="p-4">
                                            {/* Course Header */}
                                            <div className="mb-3">
                                                <h5 
                                                    className="card-title fw-bold mb-3"
                                                    style={{ 
                                                        color: '#495057',
                                                        fontSize: '1.25rem',
                                                        lineHeight: '1.4'
                                                    }}
                                                >
                                                    {course.courseName || 'Course Name Not Available'}
                                                </h5>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {course.department && (
                                                        <Badge 
                                                            style={{ 
                                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                                border: 'none',
                                                                borderRadius: '20px',
                                                                padding: '6px 12px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            {course.department}
                                                        </Badge>
                                                    )}
                                                    {course.programType && (
                                                        <Badge 
                                                            style={{ 
                                                                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                                                color: '#8b4513',
                                                                border: 'none',
                                                                borderRadius: '20px',
                                                                padding: '6px 12px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            {course.programType}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Course Description */}
                                            <p 
                                                className="card-text mb-4" 
                                                style={{ 
                                                    color: '#6c757d', 
                                                    lineHeight: '1.6',
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {course.description || 'Comprehensive program designed to provide in-depth knowledge and practical skills in this field of study.'}
                                            </p>

                                            {/* Duration */}
                                            <div 
                                                className="d-flex align-items-center"
                                                style={{ 
                                                    padding: '12px 16px',
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: '10px',
                                                    border: '1px solid #e9ecef'
                                                }}
                                            >
                                                <i 
                                                    className="bi bi-clock me-2" 
                                                    style={{ 
                                                        color: '#667eea',
                                                        fontSize: '1.1rem'
                                                    }}
                                                ></i>
                                                <span 
                                                    style={{ 
                                                        color: '#495057',
                                                        fontWeight: '500',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {getDurationText(course.durationYears)}
                                                </span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Courses;
