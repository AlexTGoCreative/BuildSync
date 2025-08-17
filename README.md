# 🏗️ BuildSync - Construction Management System

## 📋 Overview

BuildSync is a workforce and operations management platform for construction companies built with the MERN stack (MongoDB, Express.js, React, Node.js). It features three distinct user roles (Admin, Employee, and Client) each with their own customized dashboard and functionality. The platform centralizes everyday tasks such as employee administration, attendance tracking, leave management, salary processing, and client work-request handling.

## 🌟 Key Features

### 👥 Role-Based Access System
- **Admin Portal**
  - Complete system administration
  - Employee and department management
  - Work request approval/rejection
  - Attendance and leave oversight
  - Salary management
  - Analytics and reporting
- **Employee Portal**
  - Personal dashboard
  - Attendance tracking
  - Leave requests
  - Salary information
  - Document access
- **Client Portal**
  - Work request submission
  - Request status tracking
  - Document uploads
  - Communication with admin

### 🔐 Authentication & Security
- JWT-based authentication
- Password recovery workflow
- Role-based access control
- Input validation and sanitization

### 👷 Employee & Department Management
- Full employee profile management
- Department creation and staff assignment
- Document upload and storage
- Role and permission assignment

### ⏰ Attendance System
- Daily attendance tracking
- Automated default entries
- Attendance reports and summaries

### 📅 Leave Management
- Request submission with date range
- Multiple leave types
- Approval workflow
- Balance tracking

### 💰 Salary Management
- Employee salary records
- Bonus management
- Payment history
- Salary reports

### 📝 Work Request System
- Client request submission
- File attachment support
- Admin review process
- Status tracking
- Rejection feedback

### 📊 Analytics & Reporting
- Role-specific dashboards
- Real-time statistics
- Custom report generation
- Performance metrics

### 🤖 Chatbot Assistant (Benny)
- Context-aware help system
- Natural language support
- Role-specific assistance
- System navigation guidance

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Git

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/BuildSync.git
cd BuildSync
```

2. **Backend Setup (BuildSync-API)**
```bash
cd BuildSync-API
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/buildsync
JWT_SECRET=your_secure_jwt_secret
ADMIN_NAME=Your_Admin_Name
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password
```

3. **Frontend Setup (BuildSync-CLIENT)**
```bash
cd ../BuildSync-CLIENT
npm install
```

4. **Database Initialization**
```bash
cd ../BuildSync-API
node userSeed.js
```

### Running the Application

1. **Start Backend Server**
```bash
cd BuildSync-API
npm start
```

2. **Start Frontend Development Server**
```bash
cd BuildSync-CLIENT
npm run dev
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 💻 Usage Examples

### Admin Dashboard
- Access comprehensive system overview
- Manage employees and departments
- Handle leave requests and work orders
- Generate reports and analytics

### Employee Portal
- Mark attendance
- Submit leave requests
- View salary information
- Access work assignments

### Client Interface
- Submit work requests
- Track project progress
- Upload documents
- Communicate with management

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input sanitization
- Role-based access control
- File upload validation
- API rate limiting
- Secure password recovery

## 🛠️ Technology Stack

### Frontend
- React.js with Vite
- TailwindCSS for styling
- Context API for state management
- Axios for API communication
- React Router for navigation

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Express Validator
- Bcrypt for password hashing

## 📦 Dependencies

### Backend Dependencies
- express
- mongoose
- jsonwebtoken
- bcrypt
- multer
- express-validator
- cors
- dotenv

### Frontend Dependencies
- react
- react-router-dom
- axios
- tailwindcss
- @vitejs/plugin-react
- other UI components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MERN Stack Community
- TailwindCSS Team
- React Development Team
- MongoDB Team
- All contributors and supporters

## 📞 Support

For support, email support@buildsync.com or create an issue in the repository.