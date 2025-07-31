import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Spinner, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { applicationsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const reviewSchema = Yup.object({
  applicationStatus: Yup.string().required('Status is required'),
  rejectionReason: Yup.string().when('applicationStatus', {
    is: 'REJECTED',
    then: (schema) => schema.required('Rejection reason is required when rejecting')
  }),
  reviewComments: Yup.string()
});

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getAll();
      if (response.data.success) {
        setApplications(response.data.data || []);
      }
    } catch (error) {
      toast.error('Failed to load applications');
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleReviewApplication = (application) => {
    setSelectedApplication(application);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async (values, { setSubmitting }) => {
    try {
      const response = await applicationsAPI.review(selectedApplication.id, values);
      if (response.data.success) {
        toast.success('Application reviewed successfully');
        fetchApplications(); // Refresh the list
        setShowReviewModal(false);
      }
    } catch (error) {
      toast.error('Failed to review application');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'APPLIED': return 'warning';
      case 'APPROVED': return 'success';
      case 'REJECTED': return 'danger';
      default: return 'secondary';
    }
  };

  const filteredApplications = filterStatus 
    ? applications.filter(app => app.applicationStatus === filterStatus)
    : applications;

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
            <h1 className="text-white mb-0">Application Management</h1>
            <p className="text-white-50">Review and manage admission applications</p>
          </Col>
        </Row>

        {/* Statistics and Filters */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">{applications.length}</h4>
                <p className="text-muted mb-0">Total Applications</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">
                  {applications.filter(app => app.applicationStatus === 'APPLIED').length}
                </h4>
                <p className="text-muted mb-0">Pending Review</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">
                  {applications.filter(app => app.applicationStatus === 'APPROVED').length}
                </h4>
                <p className="text-muted mb-0">Approved</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="card-custom text-center">
              <Card.Body>
                <h4 className="text-gradient">
                  {applications.filter(app => app.applicationStatus === 'REJECTED').length}
                </h4>
                <p className="text-muted mb-0">Rejected</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filter */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="card-custom">
              <Card.Body>
                <Form.Label>Filter by Status</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">All Applications</option>
                  <option value="APPLIED">Pending Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </Form.Select>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Applications Table */}
        <Row>
          <Col>
            <Card className="card-custom">
              <Card.Header>
                <h5 className="mb-0">Applications List ({filteredApplications.length})</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table striped hover className="mb-0">
                    <thead className="table-dark">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Qualification</th>
                        <th>Grade</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map((application) => (
                        <tr key={application.id}>
                          <td>{application.fullName}</td>
                          <td>{application.email}</td>
                          <td>{application.desiredCourse}</td>
                          <td>{application.previousQualification}</td>
                          <td>{application.previousGrade}</td>
                          <td>
                            <Badge bg={getStatusBadgeVariant(application.applicationStatus)}>
                              {application.applicationStatus}
                            </Badge>
                          </td>
                          <td>
                            {new Date(application.applicationDate).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleViewApplication(application)}
                              >
                                View
                              </Button>
                              {application.applicationStatus === 'APPLIED' && (
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  onClick={() => handleReviewApplication(application)}
                                >
                                  Review
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                {filteredApplications.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">No applications found.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* View Application Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Application Details - {selectedApplication?.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedApplication && (
              <Row className="g-3">
                <Col md={6}>
                  <strong>Full Name:</strong>
                  <p className="text-muted">{selectedApplication.fullName}</p>
                </Col>
                <Col md={6}>
                  <strong>Email:</strong>
                  <p className="text-muted">{selectedApplication.email}</p>
                </Col>
                <Col md={6}>
                  <strong>Phone Number:</strong>
                  <p className="text-muted">{selectedApplication.phoneNumber}</p>
                </Col>
                <Col md={6}>
                  <strong>Desired Course:</strong>
                  <p className="text-muted">{selectedApplication.desiredCourse}</p>
                </Col>
                <Col md={6}>
                  <strong>Previous Qualification:</strong>
                  <p className="text-muted">{selectedApplication.previousQualification}</p>
                </Col>
                <Col md={6}>
                  <strong>Previous Grade:</strong>
                  <p className="text-muted">{selectedApplication.previousGrade}</p>
                </Col>
                <Col md={6}>
                  <strong>Application Status:</strong>
                  <p className="text-muted">
                    <Badge bg={getStatusBadgeVariant(selectedApplication.applicationStatus)}>
                      {selectedApplication.applicationStatus}
                    </Badge>
                  </p>
                </Col>
                <Col md={6}>
                  <strong>Application Date:</strong>
                  <p className="text-muted">
                    {new Date(selectedApplication.applicationDate).toLocaleString()}
                  </p>
                </Col>
                {selectedApplication.rejectionReason && (
                  <Col md={12}>
                    <strong>Rejection Reason:</strong>
                    <p className="text-muted">{selectedApplication.rejectionReason}</p>
                  </Col>
                )}
                {selectedApplication.reviewComments && (
                  <Col md={12}>
                    <strong>Review Comments:</strong>
                    <p className="text-muted">{selectedApplication.reviewComments}</p>
                  </Col>
                )}
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedApplication?.applicationStatus === 'APPLIED' && (
              <Button 
                variant="success" 
                onClick={() => {
                  setShowModal(false);
                  handleReviewApplication(selectedApplication);
                }}
              >
                Review Application
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Review Application Modal */}
        <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Review Application - {selectedApplication?.fullName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                applicationStatus: '',
                rejectionReason: '',
                reviewComments: ''
              }}
              validationSchema={reviewSchema}
              onSubmit={handleSubmitReview}
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
                    <Form.Label>Application Status *</Form.Label>
                    <Form.Select
                      name="applicationStatus"
                      value={values.applicationStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.applicationStatus && errors.applicationStatus}
                    >
                      <option value="">Select Status</option>
                      <option value="APPROVED">Approve</option>
                      <option value="REJECTED">Reject</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.applicationStatus}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {values.applicationStatus === 'REJECTED' && (
                    <Form.Group className="mb-3">
                      <Form.Label>Rejection Reason *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="rejectionReason"
                        value={values.rejectionReason}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.rejectionReason && errors.rejectionReason}
                        placeholder="Provide reason for rejection"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.rejectionReason}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Review Comments</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="reviewComments"
                      value={values.reviewComments}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Additional comments (optional)"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowReviewModal(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminApplications;
