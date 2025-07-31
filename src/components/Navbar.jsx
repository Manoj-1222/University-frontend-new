import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, userRole, logout, isAdmin, isStudent } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <BootstrapNavbar expand="lg" className="navbar-custom shadow-sm" fixed="top">
            <Container>
                <LinkContainer to="/">
                    <BootstrapNavbar.Brand className="fw-bold text-gradient fs-3">
                        <span className="brand-icon">🎓</span> University Excellence
                    </BootstrapNavbar.Brand>
                </LinkContainer>

                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link className="nav-link-custom fw-semibold">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link className="nav-link-custom fw-semibold">About</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Academics" id="academics-dropdown" className="nav-link-custom fw-semibold">
                            <NavDropdown.Item>
                                <LinkContainer to="/courses">
                                    <span>Courses</span>
                                </LinkContainer>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <LinkContainer to="/faculty">
                                    <span>Faculty</span>
                                </LinkContainer>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <LinkContainer to="/research">
                                    <span>Research</span>
                                </LinkContainer>
                            </NavDropdown.Item>
                        </NavDropdown>
                        <LinkContainer to="/contact">
                            <Nav.Link className="nav-link-custom fw-semibold">Contact</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    <Nav className="align-items-center">
                        {!isAuthenticated ? (
                            <>
                                <LinkContainer to="/admissions">
                                    <Button variant="outline-primary" className="btn-apply me-2">
                                        Apply Now
                                    </Button>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <Button variant="primary" className="btn-login">
                                        Login
                                    </Button>
                                </LinkContainer>
                            </>
                        ) : (
                            <NavDropdown
                                title={
                                    <span className="text-primary fw-semibold">
                                        <i className="bi bi-person-circle me-1"></i>
                                        {user?.name || 'User'}
                                    </span>
                                }
                                id="basic-nav-dropdown"
                                align="end"
                                className="user-dropdown"
                            >
                                {isStudent() && (
                                    <>
                                        <LinkContainer to="/student/dashboard">
                                            <NavDropdown.Item>
                                                <i className="bi bi-speedometer2 me-2"></i>Dashboard
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/student/profile">
                                            <NavDropdown.Item>
                                                <i className="bi bi-person me-2"></i>Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}

                                {isAdmin() && (
                                    <>
                                        <LinkContainer to="/admin/dashboard">
                                            <NavDropdown.Item>
                                                <i className="bi bi-grid-3x3-gap me-2"></i>Admin Dashboard
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/students">
                                            <NavDropdown.Item>
                                                <i className="bi bi-people me-2"></i>Manage Students
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/applications">
                                            <NavDropdown.Item>
                                                <i className="bi bi-file-earmark-text me-2"></i>Applications
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </>
                                )}

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
