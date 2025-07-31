import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { applicationsAPI, coursesAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[+]?[0-9]{10,15}$/, 'Please provide a valid phone number')
    .required('Phone number is required'),
  desiredCourse: Yup.string()
    .required('Desired course is required'),
  previousQualification: Yup.string()
    .required('Previous qualification is required'),
  previousGrade: Yup.string()
    .required('Previous grade/percentage is required'),
});

const ApplyAdmission = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoadingCourses(true);
      const response = await coursesAPI.getAll();
      
      // Handle different response structures and extract course names
      const coursesData = response.data?.data || response.data || [];
      const courseList = Array.isArray(coursesData) 
        ? coursesData.map(course => course.courseName).filter(Boolean)
        : [];
      
      setCourses(courseList);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to a basic list if API fails
      setCourses([
        'Computer Science Engineering',
        'Electronics and Communication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering',
        'Information Technology'
      ]);
      toast.warning('Could not load latest courses. Showing basic course list.');
    } finally {
      setLoadingCourses(false);
    }
  };

  const qualifications = [
    '10th Grade',
    '12th Grade',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Other',
  ];

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await applicationsAPI.submit(values);
      
      if (response.data.success) {
        toast.success('Application submitted successfully! You will receive confirmation shortly.');
        navigate('/');
      } else {
        toast.error(response.data.message || 'Failed to submit application');
        setFieldError('email', response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit application. Please try again.';
      toast.error(errorMessage);
      setFieldError('email', errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <Card className="card-custom">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="text-gradient mb-3">Apply for Admission</h2>
                  <p className="text-muted">
                    Take the first step towards your academic journey. Fill out the application form below 
                    and our admissions team will review your application.
                  </p>
                </div>
                
                <Formik
                  initialValues={{
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    desiredCourse: '',
                    previousQualification: '',
                    previousGrade: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="fullName"
                              value={values.fullName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.fullName && errors.fullName}
                              placeholder="Enter your full name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.fullName}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && errors.email}
                              placeholder="Enter your email address"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control
                              type="text"
                              name="phoneNumber"
                              value={values.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.phoneNumber && errors.phoneNumber}
                              placeholder="Enter your phone number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phoneNumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Desired Course *</Form.Label>
                            <Form.Select
                              name="desiredCourse"
                              value={values.desiredCourse}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.desiredCourse && errors.desiredCourse}
                              disabled={loadingCourses}
                            >
                              <option value="">
                                {loadingCourses ? 'Loading courses...' : 'Select a course'}
                              </option>
                              {courses.map((course) => (
                                <option key={course} value={course}>
                                  {course}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.desiredCourse}
                            </Form.Control.Feedback>
                            {loadingCourses && (
                              <Form.Text className="text-muted">
                                Loading available courses from database...
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Previous Qualification *</Form.Label>
                            <Form.Select
                              name="previousQualification"
                              value={values.previousQualification}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.previousQualification && errors.previousQualification}
                            >
                              <option value="">Select qualification</option>
                              {qualifications.map((qualification) => (
                                <option key={qualification} value={qualification}>
                                  {qualification}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.previousQualification}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Previous Grade/Percentage *</Form.Label>
                            <Form.Control
                              type="text"
                              name="previousGrade"
                              value={values.previousGrade}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.previousGrade && errors.previousGrade}
                              placeholder="e.g., 85%, A Grade, 8.5 CGPA"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.previousGrade}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="text-center mt-4">
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn-custom px-5"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                        </Button>
                      </div>

                      <div className="text-center mt-3">
                        <small className="text-muted">
                          * Required fields. Your application will be reviewed by our admissions team 
                          and you will be notified about the status via email.
                        </small>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>

            {/* Information Cards */}
            <Row className="mt-4 g-4">
              <Col md={6}>
                <Card className="card-custom">
                  <Card.Body>
                    <h5 className="text-gradient mb-3">📋 Application Process</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2">✅ Submit your application online</li>
                      <li className="mb-2">📧 Receive confirmation email</li>
                      <li className="mb-2">👨‍💼 Application review by admissions team</li>
                      <li className="mb-2">📞 Interview (if required)</li>
                      <li className="mb-2">🎉 Admission decision notification</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="card-custom">
                  <Card.Body>
                    <h5 className="text-gradient mb-3">📞 Need Help?</h5>
                    <p className="text-muted mb-3">
                      If you have any questions about the application process, please don't hesitate to contact us.
                    </p>
                    <div className="mb-2">
                      <strong>Email:</strong> admissions@university.edu
                    </div>
                    <div className="mb-2">
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </div>
                    <div>
                      <strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplyAdmission;
