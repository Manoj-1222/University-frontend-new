import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { studentsAPI, applicationsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    placedStudents: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          totalStudentsResponse,
          placedStudentsResponse,
          applicationStatsResponse
        ] = await Promise.all([
          studentsAPI.getCount(),
          studentsAPI.getPlacedCount(),
          applicationsAPI.getStats()
        ]);

        const applicationStats = applicationStatsResponse.data.data || {};

        setStats({
          totalStudents: totalStudentsResponse.data.data || 0,
          placedStudents: placedStudentsResponse.data.data || 0,
          totalApplications: applicationStats.total || 0,
          pendingApplications: applicationStats.applied || 0,
          approvedApplications: applicationStats.approved || 0,
          rejectedApplications: applicationStats.rejected || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', paddingTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  const placementRate = stats.totalStudents > 0 
    ? ((stats.placedStudents / stats.totalStudents) * 100).toFixed(1)
    : 0;

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-white mb-0">Admin Dashboard</h1>
            <p className="text-white-50">Welcome back, {user?.name}! Here's your university overview.</p>
          </Col>
        </Row>

        {/* Student Statistics */}
        <Row className="g-4 mb-4">
          <Col>
            <h3 className="text-white mb-3">Student Statistics</h3>
          </Col>
        </Row>
        
        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#667eea' }}>👥</span>
                </div>
                <h3 className="text-gradient">{stats.totalStudents}</h3>
                <p className="text-muted mb-0">Total Students</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#28a745' }}>💼</span>
                </div>
                <h3 className="text-gradient">{stats.placedStudents}</h3>
                <p className="text-muted mb-0">Students Placed</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#ffc107' }}>📊</span>
                </div>
                <h3 className="text-gradient">{placementRate}%</h3>
                <p className="text-muted mb-0">Placement Rate</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#17a2b8' }}>🎓</span>
                </div>
                <h3 className="text-gradient">{stats.totalStudents - stats.placedStudents}</h3>
                <p className="text-muted mb-0">Seeking Placement</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Application Statistics */}
        <Row className="g-4 mb-4">
          <Col>
            <h3 className="text-white mb-3">Application Statistics</h3>
          </Col>
        </Row>
        
        <Row className="g-4 mb-4">
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#6c757d' }}>📝</span>
                </div>
                <h3 className="text-gradient">{stats.totalApplications}</h3>
                <p className="text-muted mb-0">Total Applications</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#ffc107' }}>⏳</span>
                </div>
                <h3 className="text-gradient">{stats.pendingApplications}</h3>
                <p className="text-muted mb-0">Pending Review</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#28a745' }}>✅</span>
                </div>
                <h3 className="text-gradient">{stats.approvedApplications}</h3>
                <p className="text-muted mb-0">Approved</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="card-custom h-100">
              <Card.Body className="text-center">
                <div className="mb-2">
                  <span style={{ fontSize: '2.5rem', color: '#dc3545' }}>❌</span>
                </div>
                <h3 className="text-gradient">{stats.rejectedApplications}</h3>
                <p className="text-muted mb-0">Rejected</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="g-4">
          <Col>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6} lg={3}>
                    <div className="d-grid">
                      <a href="/admin/students" className="btn btn-primary btn-custom">
                        <span className="me-2">👥</span>
                        Manage Students
                      </a>
                    </div>
                  </Col>
                  <Col md={6} lg={3}>
                    <div className="d-grid">
                      <a href="/admin/applications" className="btn btn-success btn-custom">
                        <span className="me-2">📝</span>
                        Review Applications
                      </a>
                    </div>
                  </Col>
                  <Col md={6} lg={3}>
                    <div className="d-grid">
                      <a href="/admin/students?filter=placement" className="btn btn-info btn-custom">
                        <span className="me-2">💼</span>
                        Placement Records
                      </a>
                    </div>
                  </Col>
                  <Col md={6} lg={3}>
                    <div className="d-grid">
                      <a href="/admin/reports" className="btn btn-warning btn-custom">
                        <span className="me-2">📊</span>
                        Generate Reports
                      </a>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row className="g-4 mt-2">
          <Col lg={6}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">System Overview</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <strong>Admin Role:</strong>
                  <p className="text-muted mb-0">{user?.role || 'Admin'}</p>
                </div>
                <div className="mb-3">
                  <strong>Department:</strong>
                  <p className="text-muted mb-0">{user?.department || 'All Departments'}</p>
                </div>
                <div className="mb-3">
                  <strong>Last Login:</strong>
                  <p className="text-muted mb-0">
                    {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Current Session'}
                  </p>
                </div>
                <div>
                  <strong>Account Status:</strong>
                  <p className="text-muted mb-0">
                    <span className="badge bg-success">Active</span>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Pending Tasks</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Applications to Review</span>
                    <span className="badge bg-warning">{stats.pendingApplications}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Unplaced Students</span>
                    <span className="badge bg-info">{stats.totalStudents - stats.placedStudents}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Total Students</span>
                    <span className="badge bg-primary">{stats.totalStudents}</span>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Active Applications</span>
                    <span className="badge bg-secondary">{stats.totalApplications}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
