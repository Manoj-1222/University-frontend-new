import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
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
            <h1 className="text-white mb-0">Welcome back, {student?.name}!</h1>
            <p className="text-white-50">Here's your academic overview</p>
          </Col>
        </Row>

        {/* Academic Overview Cards */}
        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>📚</span>
                </div>
                <h4 className="text-gradient">{student?.currentCGPA || '0.0'}</h4>
                <p className="text-muted mb-0">Current CGPA</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>📊</span>
                </div>
                <h4 className="text-gradient">{student?.attendance?.percentage || '0'}%</h4>
                <p className="text-muted mb-0">Attendance</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>🎓</span>
                </div>
                <h4 className="text-gradient">{student?.totalCredits || '0'}</h4>
                <p className="text-muted mb-0">Total Credits</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2rem', color: '#667eea' }}>💰</span>
                </div>
                <h4 className="text-gradient">
                  <Badge bg={student?.getPendingAmount?.() > 0 ? 'danger' : 'success'}>
                    {student?.getFeeStatus?.() || 'N/A'}
                  </Badge>
                </h4>
                <p className="text-muted mb-0">Fee Status</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Academic Information */}
          <Col lg={8}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Academic Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Roll Number:</strong>
                      <p className="text-muted mb-0">{student?.rollNo}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Department:</strong>
                      <p className="text-muted mb-0">{student?.department}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Year:</strong>
                      <p className="text-muted mb-0">{student?.year} Year</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Semester:</strong>
                      <p className="text-muted mb-0">{student?.semester} Semester</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Email:</strong>
                      <p className="text-muted mb-0">{student?.email}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Phone:</strong>
                      <p className="text-muted mb-0">{student?.phone || 'Not provided'}</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Fee Information */}
          <Col lg={4}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Fee Details</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <strong>Total Fee:</strong>
                  <p className="text-muted mb-0">₹{student?.totalFee?.toLocaleString() || '0'}</p>
                </div>
                <div className="mb-3">
                  <strong>Paid Amount:</strong>
                  <p className="text-muted mb-0">₹{student?.paidAmount?.toLocaleString() || '0'}</p>
                </div>
                <div className="mb-3">
                  <strong>Pending Amount:</strong>
                  <p className="text-muted mb-0">₹{student?.getPendingAmount?.()?.toLocaleString() || '0'}</p>
                </div>
                <div>
                  <strong>Status:</strong>
                  <div>
                    <Badge bg={student?.getFeeStatus?.() === 'Paid' ? 'success' : 'warning'}>
                      {student?.getFeeStatus?.() || 'N/A'}
                    </Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Placement Information */}
        {student?.placementStatus && (
          <Row className="g-4 mt-2">
            <Col>
              <Card className="card-custom">
                <Card.Header>
                  <h5 className="mb-0">Placement Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <div className="mb-3">
                        <strong>Placement Status:</strong>
                        <div>
                          <Badge 
                            bg={student.placementStatus === 'Placed' ? 'success' : 'secondary'}
                          >
                            {student.placementStatus}
                          </Badge>
                        </div>
                      </div>
                    </Col>
                    {student.company && (
                      <Col md={4}>
                        <div className="mb-3">
                          <strong>Company:</strong>
                          <p className="text-muted mb-0">{student.company}</p>
                        </div>
                      </Col>
                    )}
                    {student.packageAmount && (
                      <Col md={4}>
                        <div className="mb-3">
                          <strong>Package:</strong>
                          <p className="text-muted mb-0">₹{student.packageAmount.toLocaleString()} LPA</p>
                        </div>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default StudentDashboard;
