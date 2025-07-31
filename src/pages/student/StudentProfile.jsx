import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .required('Full name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Please provide a valid phone number'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth must be in the past'),
  bloodGroup: Yup.string()
    .matches(/^(A\+|A-|B\+|B-|AB\+|AB-|O\+|O-)$/, 'Please provide a valid blood group'),
});

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        if (response.data.success) {
          setStudentData(response.data.data);
          updateUser(response.data.data);
        }
      } catch (error) {
        toast.error('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [updateUser]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // For now, we'll show a message that profile updates aren't implemented
      // In a real application, you'd have an API endpoint for profile updates
      toast.info('Profile update functionality will be available soon!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', paddingTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  const student = studentData || user;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-white mb-0">Student Profile</h1>
            <p className="text-white-50">Manage your personal information</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Personal Information</h5>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: student?.name || '',
                    email: student?.email || '',
                    rollNo: student?.rollNo || '',
                    department: student?.department || '',
                    year: student?.year || '',
                    semester: student?.semester || '',
                    phone: student?.phone || '',
                    dateOfBirth: student?.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
                    bloodGroup: student?.bloodGroup || '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
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
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              disabled
                              className="bg-light"
                            />
                            <Form.Text className="text-muted">
                              Email cannot be changed
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control
                              type="text"
                              name="rollNo"
                              value={values.rollNo}
                              disabled
                              className="bg-light"
                            />
                            <Form.Text className="text-muted">
                              Roll number cannot be changed
                            </Form.Text>
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
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                              type="text"
                              name="department"
                              value={values.department}
                              disabled
                              className="bg-light"
                            />
                            <Form.Text className="text-muted">
                              Department cannot be changed
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                              type="text"
                              name="year"
                              value={`${values.year} Year`}
                              disabled
                              className="bg-light"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Semester</Form.Label>
                            <Form.Control
                              type="text"
                              name="semester"
                              value={`${values.semester} Semester`}
                              disabled
                              className="bg-light"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              name="dateOfBirth"
                              value={values.dateOfBirth}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.dateOfBirth && errors.dateOfBirth}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.dateOfBirth}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Blood Group</Form.Label>
                            <Form.Select
                              name="bloodGroup"
                              value={values.bloodGroup}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.bloodGroup && errors.bloodGroup}
                            >
                              <option value="">Select Blood Group</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.bloodGroup}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex gap-2">
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn-custom"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Updating...' : 'Update Profile'}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Academic Details Card */}
        <Row className="mt-4 justify-content-center">
          <Col lg={8}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Academic Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Current CGPA:</strong>
                      <p className="text-muted mb-0">{student?.currentCGPA || 'N/A'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Total Credits:</strong>
                      <p className="text-muted mb-0">{student?.totalCredits || 'N/A'}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Attendance:</strong>
                      <p className="text-muted mb-0">{student?.attendance?.percentage || 0}%</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Placement Status:</strong>
                      <p className="text-muted mb-0">{student?.placementStatus || 'Not Placed'}</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentProfile;
