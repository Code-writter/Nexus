# Nexus - Interactive Polling Platform

Nexus is a full-stack web application that allows users to create, participate in, and manage interactive polls. Built with modern web technologies, Nexus provides a seamless experience for both poll creators and participants.

## 🌟 Features

- **User Authentication**
  - Secure signup and login functionality
  - JWT-based authentication
  - Protected routes

- **Poll Management**
  - Create different types of polls
  - Add multiple options to polls
  - Track poll responses in real-time
  - Bookmark favorite polls

- **Responsive Design**
  - Mobile-friendly interface
  - Clean and intuitive UI built with React and Tailwind CSS

- **Real-time Updates**
  - Instant poll result updates
  - Live vote counting

## 🛠️ Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - For client-side routing
- **Tailwind CSS** - For responsive and modern UI components
- **Axios** - For making HTTP requests
- **React Hot Toast** - For toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - For authentication
- **Bcrypt** - For password hashing

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Nexus
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your configuration
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Update .env with your backend API URL
   ```

### Environment Variables

**Backend (`.env` in backend folder)**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
PORT=8000
```

**Frontend (`.env` in frontend folder)**
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout user
- `GET /api/v1/users/current-user` - Get current user details

### Polls
- `POST /api/v1/polls` - Create a new poll
- `GET /api/v1/polls` - Get all polls
- `GET /api/v1/polls/:id` - Get a specific poll
- `POST /api/v1/polls/:id/vote` - Vote on a poll
- `POST /api/v1/polls/:id/bookmark` - Bookmark a poll

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


