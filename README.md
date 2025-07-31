# University Management System - Frontend

A modern React frontend application for the University Management System, built with React, Vite, and Bootstrap.

## Features

### Student Portal
- **Student Dashboard**: Overview of academic performance, attendance, fees, and placement status
- **Profile Management**: Update personal information and view academic details
- **Secure Authentication**: JWT-based login system

### Admin Portal
- **Admin Dashboard**: Comprehensive overview of university statistics
- **Student Management**: View, search, and filter student records
- **Application Review**: Review and approve/reject admission applications
- **Role-based Access**: Different access levels for different admin roles

### Public Features
- **Home Page**: University overview with live statistics
- **Apply for Admission**: Online application form for prospective students
- **About Page**: Information about the university
- **Contact Page**: Contact form and university information

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Framework**: Bootstrap 5 + React Bootstrap
- **Form Handling**: Formik + Yup validation
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Toastify
- **Authentication**: JWT tokens with local storage

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend API running on http://localhost:8080

## Setup Instructions

1. **Navigate to the frontend directory**:
   ```bash
   cd university-frontend-new
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and go to `http://localhost:5175`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── ProtectedRoute.jsx  # Route protection
├── context/            # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   ├── student/        # Student pages
│   ├── Home.jsx        # Public home page
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── ApplyAdmission.jsx  # Application form
│   ├── About.jsx       # About page
│   └── Contact.jsx     # Contact page
├── services/           # API services
│   └── api.js          # API configuration and endpoints
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## API Integration

The frontend integrates with the Spring Boot backend through REST APIs:

### Authentication Endpoints
- `POST /api/auth/login` - Student login
- `POST /api/auth/student-login` - Student login
- `POST /api/auth/register` - Student registration
- `POST /api/admin/auth/login` - Admin login

### Student Endpoints
- `GET /api/students` - Get all students (Admin)
- `GET /api/students/{id}` - Get student by ID
- `GET /api/auth/me` - Get current user profile

### Application Endpoints
- `POST /api/applications/submit` - Submit admission application
- `GET /api/applications` - Get all applications (Admin)
- `PUT /api/applications/{id}/review` - Review application (Admin)

## Authentication Flow

1. **Login**: User provides credentials
2. **Token Storage**: JWT token stored in localStorage
3. **API Requests**: Token included in Authorization header
4. **Route Protection**: Protected routes check authentication status
5. **Auto Logout**: Invalid tokens trigger automatic logout

## User Roles

### Students
- Access to personal dashboard and profile
- View academic records, attendance, and fees
- Update personal information

### Admins
- Access to admin dashboard with university statistics
- Manage student records
- Review admission applications
- Role-based permissions (SUPER_ADMIN, STAFF_ADMIN)

## Configuration

### API Base URL
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Features Implementation

### Responsive Design
- Mobile-first approach with Bootstrap
- Responsive navigation and layouts
- Optimized for various screen sizes

### Form Validation
- Client-side validation using Yup schemas
- Real-time error feedback
- Server-side error handling

### State Management
- React Context for authentication
- Local state for component data
- Persistent authentication across sessions

### Error Handling
- Global error interceptors
- User-friendly error messages
- Automatic token refresh handling

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Consistent naming conventions
- Proper component organization

### API Integration
- Use the provided API service functions
- Handle loading states appropriately
- Implement proper error handling
- Show user feedback for actions

## Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- Vercel (recommended)
- Netlify
- Traditional web servers
- Docker containers

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS is configured for frontend URL
   - Check API base URL configuration

2. **Authentication Issues**:
   - Clear localStorage if tokens are corrupted
   - Verify backend JWT configuration

3. **Build Errors**:
   - Delete node_modules and reinstall dependencies
   - Check for version compatibility issues

### Development Tips

1. **Hot Reload**: Changes are automatically reflected in development
2. **Browser DevTools**: Use React Developer Tools for debugging
3. **Network Tab**: Monitor API requests and responses
4. **Console Logs**: Check for JavaScript errors

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Update documentation for new features
4. Test thoroughly before submitting

## Support

For technical support or questions:
- Email: support@university.edu
- Documentation: Check the README files
- Issues: Create GitHub issues for bugs

## License

This project is part of the University Management System and follows the same licensing terms.
