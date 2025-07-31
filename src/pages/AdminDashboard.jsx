import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { adminAPI, studentsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [stats, setStats] = useState({
        totalStudents: 0,
        placedStudents: 0,
        departmentCounts: {}
    });
    const [filters, setFilters] = useState({
        department: '',
        year: '',
        search: ''
    });
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        rollNo: '',
        department: '',
        year: '',
        semester: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        bloodGroup: '',
        gender: ''
    });
    const navigate = useNavigate();
    const location = useLocation();

    // Load students and stats on component mount
    useEffect(() => {
        loadStudents();
    }, []);

    // Calculate stats whenever students data changes
    useEffect(() => {
        if (students.length >= 0) { // Calculate even if 0 students
            loadStats();
        }
    }, [students]);

    // Reload students if returning from student update
    useEffect(() => {
        if (location.state?.studentUpdated) {
            loadStudents(); // loadStats will be called automatically via useEffect
            // Clear the state to prevent unnecessary reloads
            navigate(location.pathname, { replace: true });
        }
    }, [location.state]);

    // Filter students when filters change
    useEffect(() => {
        filterStudents();
    }, [students, filters]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getStudents();
      if (response.data.success) {
        const studentsData = response.data.data || [];
        setStudents(studentsData);
      } else {
        toast.error('Failed to load students');
      }
    } catch (error) {
      console.error('Error loading students:', error);
      toast.error('Error loading students');
    } finally {
      setLoading(false);
    }
  };    const loadStats = async () => {
        try {
            // Calculate stats from the loaded students data
            const totalStudents = students.length;
            const placedStudents = students.filter(student =>
                student.placementStatus === 'Placed'
            ).length;

            setStats(prev => ({
                ...prev,
                totalStudents: totalStudents,
                placedStudents: placedStudents
            }));
        } catch (error) {
            console.error('Error calculating stats:', error);
        }
    };

    const filterStudents = () => {
        let filtered = [...students];

        // Filter by department
        if (filters.department) {
            filtered = filtered.filter(student =>
                student.department?.toLowerCase() === filters.department.toLowerCase()
            );
        }

        // Filter by year
        if (filters.year) {
            filtered = filtered.filter(student =>
                student.year?.toString() === filters.year
            );
        }

        // Filter by search (name, email, roll number)
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(student =>
                student.name?.toLowerCase().includes(searchLower) ||
                student.email?.toLowerCase().includes(searchLower) ||
                student.rollNo?.toLowerCase().includes(searchLower)
            );
        }

        setFilteredStudents(filtered);
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            // Prepare student data with required fields
            const studentData = {
                name: newStudent.name,
                rollNo: newStudent.rollNo,
                email: newStudent.email,
                password: 'Student@123', // Default password for admin-created students
                department: newStudent.department,
                year: parseInt(newStudent.year) || 1,
                semester: parseInt(newStudent.semester) || 1,
                phone: newStudent.phone && newStudent.phone.trim() ? newStudent.phone.trim() : undefined,
                dateOfBirth: newStudent.dateOfBirth || undefined,
                bloodGroup: newStudent.bloodGroup || undefined
            };

            // Remove undefined fields to avoid validation errors
            Object.keys(studentData).forEach(key => {
                if (studentData[key] === undefined) {
                    delete studentData[key];
                }
            });

            const response = await adminAPI.createStudent(studentData);
            if (response.data.success) {
                toast.success('Student added successfully');
                setShowAddModal(false);
                setNewStudent({
                    name: '',
                    email: '',
                    rollNo: '',
                    department: '',
                    year: '',
                    semester: '',
                    phone: '',
                    address: '',
                    dateOfBirth: '',
                    bloodGroup: '',
                    gender: ''
                });
                // Reload students (stats will be calculated automatically)
                loadStudents();
            } else {
                toast.error(response.data.message || 'Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            toast.error(error.response?.data?.message || 'Error adding student');
        }
    };

    const handleDeleteStudent = async (studentId, studentName) => {
    if (window.confirm(`Are you sure you want to delete student "${studentName}"? This action cannot be undone.`)) {
      try {
        const response = await adminAPI.deleteStudent(studentId);
        if (response.data.success) {
          toast.success('Student deleted successfully');
          loadStudents(); // Reload the list
        } else {
          toast.error(response.data.message || 'Failed to delete student');
        }
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error(error.response?.data?.message || 'Error deleting student');
      }
    }
  };

  const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            department: '',
            year: '',
            search: ''
        });
    };

    const handleStudentClick = (studentId) => {
        navigate(`/admin/students/${studentId}`);
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

    return (
        <div style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <Container>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="text-white">Admin Dashboard</h1>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        loadStudents(); // loadStats will be called automatically
                                        toast.info('Data refreshed');
                                    }}
                                >
                                    🔄 Refresh
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={() => setShowAddModal(true)}
                                >
                                    Add New Student
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Stats Cards */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Card className="text-center bg-primary text-white">
                            <Card.Body>
                                <h2>{stats.totalStudents}</h2>
                                <p className="mb-0">Total Students</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center bg-success text-white">
                            <Card.Body>
                                <h2>{stats.placedStudents}</h2>
                                <p className="mb-0">Placed Students</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center bg-info text-white">
                            <Card.Body>
                                <h2>
                                    {stats.totalStudents > 0
                                        ? ((stats.placedStudents / stats.totalStudents) * 100).toFixed(1)
                                        : 0
                                    }%
                                </h2>
                                <p className="mb-0">Placement Rate</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center bg-warning text-white">
                            <Card.Body>
                                <h2>{filteredStudents.length}</h2>
                                <p className="mb-0">Filtered Results</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Filters */}
                <Row className="mb-3">
                    <Col>
                        <Card className="card-custom">
                            <Card.Body>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Search Students</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search by name, email, or roll number..."
                                                value={filters.search}
                                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Filter by Department</Form.Label>
                                            <Form.Select
                                                value={filters.department}
                                                onChange={(e) => handleFilterChange('department', e.target.value)}
                                            >
                                                <option value="">All Departments</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Mechanical">Mechanical</option>
                                                <option value="Civil">Civil</option>
                                                <option value="Electrical">Electrical</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Filter by Year</Form.Label>
                                            <Form.Select
                                                value={filters.year}
                                                onChange={(e) => handleFilterChange('year', e.target.value)}
                                            >
                                                <option value="">All Years</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4">4th Year</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3} className="d-flex align-items-end">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={clearFilters}
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

                <Row>
                    <Col>
                        <Card className="card-custom">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Students List</h5>
                                <Badge bg="secondary">{filteredStudents.length} students</Badge>
                            </Card.Header>
                            <Card.Body>
                                {filteredStudents.length === 0 ? (
                                    <div className="text-center py-4">
                                        <p className="text-muted">
                                            {students.length === 0 ? 'No students found' : 'No students match the current filters'}
                                        </p>
                                    </div>
                                ) : (
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Roll No</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Department</th>
                                                <th>Year</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.map((student) => (
                                                <tr key={student.id} style={{ cursor: 'pointer' }}>
                                                    <td onClick={() => handleStudentClick(student.id)}>
                                                        {student.rollNo || student.rollNumber || student.roll_no || 'Not Set'}
                                                    </td>
                                                    <td onClick={() => handleStudentClick(student.id)}>
                                                        {student.name}
                                                    </td>
                                                    <td onClick={() => handleStudentClick(student.id)}>
                                                        {student.email}
                                                    </td>
                                                    <td onClick={() => handleStudentClick(student.id)}>
                                                        {student.department}
                                                    </td>
                                                    <td onClick={() => handleStudentClick(student.id)}>
                                                        {student.year}
                                                    </td>
                                                    <td onClick={() => handleStudentClick(student.id)}>
                                                        <Badge bg={student.placementStatus === 'Placed' ? 'success' : 'secondary'}>
                                                            {student.placementStatus || 'Not Placed'}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex gap-1">
                                                            <Button
                                                                variant="primary"
                                                                size="sm"
                                                                onClick={() => handleStudentClick(student.id)}
                                                            >
                                                                View/Edit
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => handleDeleteStudent(student.id, student.name)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Add Student Modal */}
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAddStudent}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newStudent.name}
                                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={newStudent.email}
                                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Roll Number *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newStudent.rollNo}
                                            onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newStudent.phone}
                                            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                                            placeholder="Enter 10-15 digit phone number (optional)"
                                            pattern="[0-9]{10,15}"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Department *</Form.Label>
                                        <Form.Select
                                            value={newStudent.department}
                                            onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Civil">Civil</option>
                                            <option value="Electrical">Electrical</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Year *</Form.Label>
                                        <Form.Select
                                            value={newStudent.year}
                                            onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Year</option>
                                            <option value="1">1st Year</option>
                                            <option value="2">2nd Year</option>
                                            <option value="3">3rd Year</option>
                                            <option value="4">4th Year</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Semester *</Form.Label>
                                        <Form.Select
                                            value={newStudent.semester}
                                            onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Semester</option>
                                            <option value="1">1st Semester</option>
                                            <option value="2">2nd Semester</option>
                                            <option value="3">3rd Semester</option>
                                            <option value="4">4th Semester</option>
                                            <option value="5">5th Semester</option>
                                            <option value="6">6th Semester</option>
                                            <option value="7">7th Semester</option>
                                            <option value="8">8th Semester</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Blood Group</Form.Label>
                                        <Form.Select
                                            value={newStudent.bloodGroup}
                                            onChange={(e) => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
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
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={newStudent.dateOfBirth}
                                            onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select
                                            value={newStudent.gender}
                                            onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={newStudent.address}
                                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                                    placeholder="Enter complete address..."
                                />
                            </Form.Group>

                            <div className="d-flex gap-2">
                                <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    Add Student
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default AdminDashboard;
