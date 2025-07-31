import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});

const Contact = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We will get back to you soon.');
      resetForm();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5">
              <h1 className="text-white mb-3">Contact Us</h1>
              <p className="text-white-50 lead">
                Get in touch with us. We're here to help and answer any questions you might have.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Send us a Message</h5>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
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
                            <Form.Label>Name *</Form.Label>
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
                            <Form.Label>Email *</Form.Label>
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

                      <Form.Group className="mb-3">
                        <Form.Label>Subject *</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.subject && errors.subject}
                          placeholder="Enter message subject"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={values.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.message && errors.message}
                          placeholder="Enter your message"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="btn-custom"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="card-custom mb-4">
              <Card.Header>
                <h5 className="mb-0">Contact Information</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-3" style={{ fontSize: '1.5rem' }}>📍</span>
                    <div>
                      <strong>Address</strong>
                    </div>
                  </div>
                  <p className="text-muted mb-0 ms-5">
                    123 University Avenue<br />
                    Education City, State 12345<br />
                    United States
                  </p>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-3" style={{ fontSize: '1.5rem' }}>📞</span>
                    <div>
                      <strong>Phone</strong>
                    </div>
                  </div>
                  <p className="text-muted mb-0 ms-5">
                    Main Office: +1 (555) 123-4567<br />
                    Admissions: +1 (555) 123-4568<br />
                    Student Services: +1 (555) 123-4569
                  </p>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-3" style={{ fontSize: '1.5rem' }}>📧</span>
                    <div>
                      <strong>Email</strong>
                    </div>
                  </div>
                  <p className="text-muted mb-0 ms-5">
                    General: info@university.edu<br />
                    Admissions: admissions@university.edu<br />
                    Support: support@university.edu
                  </p>
                </div>

                <div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-3" style={{ fontSize: '1.5rem' }}>🕒</span>
                    <div>
                      <strong>Office Hours</strong>
                    </div>
                  </div>
                  <p className="text-muted mb-0 ms-5">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="card-custom">
              <Card.Body className="text-center p-4">
                <h5 className="text-gradient mb-3">Visit Our Campus</h5>
                <p className="text-muted mb-4">
                  We welcome prospective students and their families to visit our beautiful campus. 
                  Schedule a tour to experience our facilities and meet our faculty and staff.
                </p>
                <Button variant="primary" className="btn-custom me-3">
                  Schedule a Tour
                </Button>
                <Button variant="outline-primary" className="btn-custom">
                  Virtual Tour
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
