import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, adminAuthAPI } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      const userInfo = localStorage.getItem('userInfo');

      if (token && role && userInfo && userInfo !== 'undefined') {
        try {
          setUserRole(role);
          setUser(JSON.parse(userInfo));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user info:', error);
          // Clear invalid data
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userInfo');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials, isAdmin = false) => {
    try {
      setLoading(true);
      
      // Transform credentials for admin login (backend expects usernameOrEmail)
      const loginData = isAdmin 
        ? { usernameOrEmail: credentials.email, password: credentials.password }
        : credentials;
      
      const response = isAdmin 
        ? await adminAuthAPI.login(loginData)
        : await authAPI.studentLogin(credentials);

      if (response.data.success) {
        const { token, user: userData } = response.data.data;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', isAdmin ? 'ADMIN' : 'STUDENT');
        localStorage.setItem('userInfo', JSON.stringify(userData));
        
        setUser(userData);
        setUserRole(isAdmin ? 'ADMIN' : 'STUDENT');
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        return { success: true, user: userData };
      } else {
        toast.error(response.data.message || 'Login failed');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        return { success: true };
      } else {
        toast.error(response.data.message || 'Registration failed');
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userInfo');
      setUser(null);
      setUserRole(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));
  };

  const isAdmin = () => {
    return userRole === 'ADMIN' || userRole === 'SUPER_ADMIN' || userRole === 'STAFF_ADMIN';
  };

  const isStudent = () => {
    return userRole === 'STUDENT';
  };

  const value = {
    user,
    userRole,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    isAdmin,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
