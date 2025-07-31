import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { adminAPI } from '../services/api';
import { toast } from 'react-toastify';

const StudentDetails = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStudentById(studentId);
      if (response.data.success) {
        const studentData = response.data.data;
        setStudent(studentData);
        setFormData(studentData);
      } else {
        toast.error('Student not found');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error loading student:', error);
      toast.error('Error loading student details');
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await adminAPI.updateStudent(studentId, formData);
      if (response.data.success) {
        toast.success('Student updated successfully! Click "Back to List" to see changes.');
        setStudent(formData);
        setEditing(false);
      } else {
        toast.error(response.data.message || 'Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error(error.response?.data?.message || 'Error updating student');
    }
  };

  const handleCancel = () => {
    setFormData(student);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete student "${student?.name}"? This action cannot be undone.`)) {
      try {
        const response = await adminAPI.deleteStudent(studentId);
        if (response.data.success) {
          toast.success('Student deleted successfully');
          navigate('/admin/dashboard', { 
            state: { studentUpdated: true }
          });
        } else {
          toast.error(response.data.message || 'Failed to delete student');
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error(error.response?.data?.message || 'Error deleting student');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <Container style={{ paddingTop: '100px' }}>
        <Alert variant="danger">Student not found</Alert>
      </Container>
    );
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="text-white">Student Details</h1>
              <div className="d-flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/admin/dashboard', { 
                    state: { studentUpdated: true }
                  })}
                >
                  Back to List
                </Button>
                {!editing ? (
                  <>
                    <Button 
                      variant="primary" 
                      onClick={() => setEditing(true)}
                    >
                      Edit Student
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={handleDelete}
                    >
                      Delete Student
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="secondary" 
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Personal Information</h5>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.rollNo || ''}
                          onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        {editing ? (
                          <Form.Select
                            value={formData.department || ''}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                          >
                            <option value="">Select Department</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Civil">Civil</option>
                            <option value="Electrical">Electrical</option>
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="text"
                            value={formData.department || ''}
                            disabled
                          />
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Year</Form.Label>
                        {editing ? (
                          <Form.Select
                            value={formData.year || ''}
                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                          >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="text"
                            value={formData.year ? `${formData.year}${getOrdinalSuffix(formData.year)} Year` : ''}
                            disabled
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.dateOfBirth || ''}
                          onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                          disabled={!editing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        {editing ? (
                          <Form.Select
                            value={formData.gender || ''}
                            onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="text"
                            value={formData.gender || ''}
                            disabled
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.address || ''}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      disabled={!editing}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Academic Information</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <strong>CGPA:</strong>
                  <p className="mb-0">{formData.currentCGPA || 'Not Available'}</p>
                </div>
                <div className="mb-3">
                  <strong>Attendance:</strong>
                  <p className="mb-0">{formData.attendance?.percentage ? `${formData.attendance.percentage}%` : 'Not Available'}</p>
                </div>
                <div className="mb-3">
                  <strong>Status:</strong>
                  <p className="mb-0">{formData.status || 'Active'}</p>
                </div>
                <div className="mb-3">
                  <strong>Admission Date:</strong>
                  <p className="mb-0">{formData.admissionDate ? new Date(formData.admissionDate).toLocaleDateString() : 'Not Available'}</p>
                </div>
              </Card.Body>
            </Card>

            {formData.placementStatus === 'Placed' && (
              <Card className="card-custom mt-3">
                <Card.Header>
                  <h5 className="mb-0">Placement Information</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-3">
                    <strong>Placement Status:</strong>
                    <p className="mb-0">{formData.placementStatus}</p>
                  </div>
                  {formData.company && (
                    <div className="mb-3">
                      <strong>Company:</strong>
                      <p className="mb-0">{formData.company}</p>
                    </div>
                  )}
                  {formData.packageAmount && (
                    <div className="mb-3">
                      <strong>Package Amount:</strong>
                      <p className="mb-0">₹{formData.packageAmount.toLocaleString()}</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Helper function to get ordinal suffix
const getOrdinalSuffix = (num) => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

export default StudentDetails;
