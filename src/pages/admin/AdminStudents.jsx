import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Spinner, Modal } from 'react-bootstrap';
import { studentsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    year: '',
    search: ''
  });

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

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentsAPI.getAll({ page: -1 }); // Get all students
      if (response.data.success) {
        setStudents(response.data.data || []);
      }
    } catch (error) {
      toast.error('Failed to load students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleUpdatePlacement = async (studentId, placementData) => {
    try {
      const response = await studentsAPI.updatePlacement(studentId, placementData);
      if (response.data.success) {
        toast.success('Placement status updated successfully');
        fetchStudents(); // Refresh the list
        setShowModal(false);
      }
    } catch (error) {
      toast.error('Failed to update placement status');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesDepartment = !filters.department || student.department === filters.department;
    const matchesYear = !filters.year || student.year.toString() === filters.year;
    const matchesSearch = !filters.search || 
      student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.email.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesDepartment && matchesYear && matchesSearch;
  });

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh', paddingTop: '100px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-white mb-0">Student Management</h1>
            <p className="text-white-50">Manage and monitor student records</p>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col>
            <Card className="card-custom">
              <Card.Body>
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search by name, roll no, or email"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      value={filters.department}
                      onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    >
                      <option value="">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Label>Year</Form.Label>
                    <Form.Select
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    >
                      <option value="">All Years</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </Form.Select>
                  </Col>
                  <Col md={3} className="d-flex align-items-end">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setFilters({ department: '', year: '', search: '' })}
                      className="w-100"
                    >
                      Clear Filters
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">{filteredStudents.length}</h4>
                <p className="text-muted mb-0">Total Students</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">
                  {filteredStudents.filter(s => s.placementStatus === 'Placed').length}
                </h4>
                <p className="text-muted mb-0">Placed</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">
                  {filteredStudents.filter(s => s.currentCGPA >= 8.0).length}
                </h4>
                <p className="text-muted mb-0">CGPA ≥ 8.0</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">
                  {filteredStudents.filter(s => s.attendance?.percentage >= 75).length}
                </h4>
                <p className="text-muted mb-0">Attendance ≥ 75%</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Students Table */}
        <Row>
          <Col>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Students List ({filteredStudents.length})</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table striped hover className="mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>CGPA</th>
                        <th>Attendance</th>
                        <th>Placement</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.rollNo}</td>
                          <td>{student.name}</td>
                          <td>{student.department}</td>
                          <td>{student.year}</td>
                          <td>
                            <Badge bg={student.currentCGPA >= 8.0 ? 'success' : student.currentCGPA >= 6.0 ? 'warning' : 'danger'}>
                              {student.currentCGPA || 'N/A'}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={student.attendance?.percentage >= 75 ? 'success' : 'danger'}>
                              {student.attendance?.percentage || 0}%
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={student.placementStatus === 'Placed' ? 'success' : 'secondary'}>
                              {student.placementStatus || 'Not Placed'}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleViewStudent(student)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {filteredStudents.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">No students found matching the filters.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Student Details Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Student Details - {selectedStudent?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedStudent && (
              <Row className="g-3">
                <Col md={6}>
                  <strong>Roll Number:</strong>
                  <p className="text-muted">{selectedStudent.rollNo}</p>
                </Col>
                <Col md={6}>
                  <strong>Email:</strong>
                  <p className="text-muted">{selectedStudent.email}</p>
                </Col>
                <Col md={6}>
                  <strong>Department:</strong>
                  <p className="text-muted">{selectedStudent.department}</p>
                </Col>
                <Col md={6}>
                  <strong>Year/Semester:</strong>
                  <p className="text-muted">{selectedStudent.year} Year, {selectedStudent.semester} Semester</p>
                </Col>
                <Col md={6}>
                  <strong>CGPA:</strong>
                  <p className="text-muted">{selectedStudent.currentCGPA || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <strong>Total Credits:</strong>
                  <p className="text-muted">{selectedStudent.totalCredits || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <strong>Attendance:</strong>
                  <p className="text-muted">{selectedStudent.attendance?.percentage || 0}%</p>
                </Col>
                <Col md={6}>
                  <strong>Phone:</strong>
                  <p className="text-muted">{selectedStudent.phone || 'Not provided'}</p>
                </Col>
                <Col md={6}>
                  <strong>Total Fee:</strong>
                  <p className="text-muted">₹{selectedStudent.totalFee?.toLocaleString() || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <strong>Paid Amount:</strong>
                  <p className="text-muted">₹{selectedStudent.paidAmount?.toLocaleString() || 'N/A'}</p>
                </Col>
                <Col md={6}>
                  <strong>Placement Status:</strong>
                  <p className="text-muted">
                    <Badge bg={selectedStudent.placementStatus === 'Placed' ? 'success' : 'secondary'}>
                      {selectedStudent.placementStatus || 'Not Placed'}
                    </Badge>
                  </p>
                </Col>
                {selectedStudent.company && (
                  <Col md={6}>
                    <strong>Company:</strong>
                    <p className="text-muted">{selectedStudent.company}</p>
                  </Col>
                )}
                {selectedStudent.packageAmount && (
                  <Col md={6}>
                    <strong>Package:</strong>
                    <p className="text-muted">₹{selectedStudent.packageAmount.toLocaleString()} LPA</p>
                  </Col>
                )}
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminStudents;
