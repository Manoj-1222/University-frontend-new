import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Full name is required'),
  rollNo: Yup.string()
    .min(4, 'Roll number must be at least 4 characters')
    .max(20, 'Roll number must be less than 20 characters')
    .required('Roll number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  department: Yup.string()
    .required('Department is required'),
  year: Yup.number()
    .min(1, 'Year must be at least 1')
    .max(4, 'Year must be at most 4')
    .required('Year is required'),
  semester: Yup.number()
    .min(1, 'Semester must be at least 1')
    .max(8, 'Semester must be at most 8')
    .required('Semester is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Please provide a valid phone number'),
});

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const departments = [
    'Computer Science Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Information Technology',
    'Business Administration',
    'Master of Computer Applications',
  ];

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const { confirmPassword, ...registrationData } = values;
      const result = await register(registrationData);
      
      if (result.success) {
        navigate('/login');
      } else {
        setFieldError('email', result.message);
      }
    } catch (error) {
      setFieldError('email', 'Registration failed. Please try again.');
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
                <h2 className="text-center mb-4 text-gradient">Student Registration</h2>
                
                <Formik
                  initialValues={{
                    name: '',
                    rollNo: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    department: '',
                    year: '',
                    semester: '',
                    phone: '',
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
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.name && errors.name}
                              placeholder="Enter your full name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Roll Number *</Form.Label>
                            <Form.Control
                              type="text"
                              name="rollNo"
                              value={values.rollNo}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.rollNo && errors.rollNo}
                              placeholder="Enter your roll number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.rollNo}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
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
                              placeholder="Enter your email"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.phone && errors.phone}
                              placeholder="Enter your phone number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.password && errors.password}
                              placeholder="Enter your password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password *</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.confirmPassword && errors.confirmPassword}
                              placeholder="Confirm your password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Department *</Form.Label>
                            <Form.Select
                              name="department"
                              value={values.department}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.department && errors.department}
                            >
                              <option value="">Select Department</option>
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.department}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Year *</Form.Label>
                            <Form.Select
                              name="year"
                              value={values.year}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.year && errors.year}
                            >
                              <option value="">Select Year</option>
                              <option value={1}>1st Year</option>
                              <option value={2}>2nd Year</option>
                              <option value={3}>3rd Year</option>
                              <option value={4}>4th Year</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.year}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Semester *</Form.Label>
                            <Form.Select
                              name="semester"
                              value={values.semester}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.semester && errors.semester}
                            >
                              <option value="">Select Semester</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <option key={sem} value={sem}>
                                  {sem}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.semester}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 btn-custom mt-3"
                        disabled={isSubmitting || loading}
                      >
                        {isSubmitting || loading ? 'Registering...' : 'Register'}
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
