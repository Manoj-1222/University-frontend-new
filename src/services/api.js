import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  studentLogin: (credentials) => api.post('/auth/student-login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  changePassword: (passwordData) => api.post('/auth/change-password', passwordData),
  logout: () => api.post('/auth/logout'),
};

// Admin Auth API
export const adminAuthAPI = {
  login: (credentials) => api.post('/admin/auth/login', credentials),
  register: (adminData) => api.post('/admin/auth/register', adminData),
  getCurrentAdmin: () => api.get('/admin/auth/me'),
};

// Students API
export const studentsAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  getByEmail: (email) => api.get(`/students/email/${email}`),
  getByRollNo: (rollNo) => api.get(`/students/rollno/${rollNo}`),
  getByDepartment: (department) => api.get(`/students/department/${department}`),
  getByYear: (year) => api.get(`/students/year/${year}`),
  getPlaced: () => api.get('/students/placed'),
  create: (studentData) => api.post('/students', studentData),
  update: (id, studentData) => api.put(`/students/${id}`, studentData),
  updateAcademic: (id, academicData) => api.put(`/students/${id}/academic`, academicData),
  updateFull: (id, fullData) => api.put(`/students/${id}/full`, fullData),
  updateCGPA: (id, cgpaData) => api.put(`/students/${id}/cgpa`, cgpaData),
  updateAttendance: (id, attendanceData) => api.put(`/students/${id}/attendance`, attendanceData),
  updateFee: (id, feeData) => api.put(`/students/${id}/fee`, feeData),
  updatePlacement: (id, placementData) => api.put(`/students/${id}/placement`, placementData),
  delete: (id) => api.delete(`/students/${id}`),
  getCount: () => api.get('/students/count'),
  getCountByDepartment: (department) => api.get(`/students/count/department/${department}`),
  getPlacedCount: () => api.get('/students/count/placed'),
};

// Applications API
export const applicationsAPI = {
  submit: (applicationData) => api.post('/applications/submit', applicationData),
  getAll: () => api.get('/applications'),
  getById: (id) => api.get(`/applications/${id}`),
  getByStatus: (status) => api.get(`/applications/status/${status}`),
  getByCourse: (course) => api.get(`/applications/course/${course}`),
  review: (id, reviewData) => api.put(`/applications/${id}/review`, reviewData),
  getStats: () => api.get('/applications/stats'),
};

// Admin API
export const adminAPI = {
  getStudents: () => api.get('/admin/students'),
  getStudentById: (id) => api.get(`/admin/students/${id}`),
  createStudent: (studentData) => api.post('/students', studentData), // Use the main students endpoint for creation
  updateStudent: (id, studentData) => api.put(`/admin/students/${id}`, studentData),
  updateStudentAcademic: (id, academicData) => api.put(`/admin/students/${id}/academic`, academicData),
  deleteStudent: (id) => api.delete(`/students/${id}`), // Use the main students endpoint for deletion
  getStudentStats: () => api.get('/admin/students/stats'),
};

// Courses API
export const coursesAPI = {
  getAll: () => api.get('/courses/active'), // Public endpoint for active courses
  getAvailable: () => api.get('/courses/available'), // Public endpoint for available courses
  getByDepartment: (department) => api.get(`/courses/department/${department}`),
  getByProgramType: (programType) => api.get(`/courses/program/${programType}`),
  getById: (id) => api.get(`/courses/${id}`),
  // Admin endpoints (require authentication)
  getAllAdmin: () => api.get('/courses'), // Admin endpoint for all courses
  create: (courseData) => api.post('/courses', courseData),
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),
  delete: (id) => api.delete(`/courses/${id}`),
  toggleStatus: (id) => api.put(`/courses/${id}/toggle-status`),
  getStats: () => api.get('/courses/stats'),
  initializeDefaults: () => api.post('/courses/initialize-defaults'),
};

export default api;
