import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [activeTab, setActiveTab] = useState('student');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const isAdmin = activeTab === 'admin';
      const result = await login(values, isAdmin);
      
      if (result.success) {
        // Redirect based on user role
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setFieldError('email', result.message);
      }
    } catch (error) {
      setFieldError('email', 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <Card className="card-custom">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4 text-gradient">Login</h2>
                
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                  justify
                >
                  <Tab eventKey="student" title="Student Login">
                    <Formik
                      initialValues={{ email: '', password: '' }}
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
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
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

                          <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
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

                          <Button
                            variant="primary"
                            type="submit"
                            className="w-100 btn-custom"
                            disabled={isSubmitting || loading}
                          >
                            {isSubmitting || loading ? 'Logging in...' : 'Login as Student'}
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Tab>

                  <Tab eventKey="admin" title="Admin Login">
                    <Formik
                      initialValues={{ email: '', password: '' }}
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
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && errors.email}
                              placeholder="Enter admin email"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.password && errors.password}
                              placeholder="Enter admin password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Button
                            variant="danger"
                            type="submit"
                            className="w-100 btn-custom"
                            disabled={isSubmitting || loading}
                          >
                            {isSubmitting || loading ? 'Logging in...' : 'Login as Admin'}
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Tab>
                </Tabs>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none">
                      Register here
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

export default Login;
