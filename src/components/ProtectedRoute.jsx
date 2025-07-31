import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

const ProtectedRoute = ({ children, requireRole }) => {
  const { isAuthenticated, loading, userRole } = useAuth();

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requireRole) {
    if (requireRole === 'ADMIN' && !['ADMIN', 'SUPER_ADMIN', 'STAFF_ADMIN'].includes(userRole)) {
      return <Navigate to="/" replace />;
    }
    if (requireRole === 'STUDENT' && userRole !== 'STUDENT') {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
