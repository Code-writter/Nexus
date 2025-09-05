# Nexus: A Real-Time Collaborative Polling Platform

Nexus is a robust, full-stack web application designed to facilitate real-time, interactive polling. Built on the MERN stack, it provides a seamless and intuitive experience for users to create, manage, share, and participate in polls, making it an ideal tool for collaborative decision-making.

▶️ [View Live Demo](https://nexus-git-main-code-writters-projects.vercel.app?_vercel_share=WvSp2hfNqjAyAL38jO9nj8qqyM2t1tTh) 

## 🌟 Key Features

- **Secure & Modern User Authentication**

   -Robust user registration and login system using industry-standard practices.
   - Secure password handling with Bcrypt for hashing and salting.
   - Stateful sessions managed by JSON Web Tokens (JWT), ensuring that user data is protected and access to routes is controlled.
   - Custom middleware protects critical API endpoints, allowing     access only to authenticated users.

- **Dynamic Poll Creation & Management**
   - Users can create polls with custom questions and multiple-choice options.
   - Functionality to track poll responses and view results in real-time.
   - A personalized dashboard allows users to view and manage the polls they have created.
   - Users can bookmark their favorite or most relevant polls for quick access.

- **Sleek, Responsive, and Intuitive UI**
   - The entire frontend is built with React, creating a fast, single-page application (SPA) experience.
   - A clean, modern, and fully responsive interface designed with Tailwind CSS, ensuring a flawless experience on any device, from mobile phones to desktops.
   - User feedback is enhanced with non-intrusive toast notifications via React Hot Toast.

## 🏛️ Architectural Decisions & Core Utilities
This project was built with a focus on creating a scalable, maintainable, and robust backend. The architecture is designed to be clean, efficient, and easy to reason about.

1. **Standardized API Communication (ApiResponse & ApiError)**
To ensure consistency and predictability for the client-side, all API responses and errors follow a standardized structure. This simplifies frontend logic for handling data and errors.

   - **ApiResponse.js**: A utility class for sending successful, well-structured JSON responses. It automatically sets the success flag based on the HTTP status code.

```js
class ApiResponse {
   constructor(statusCode, data, message = "Success") {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
}
```
   - **ApiError.js**: A custom error class that extends Node.js's native Error class. It allows for throwing operational errors with specific HTTP status codes and detailed error messages, which are then caught by our central error handler.

```js
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
```
2. **Asynchronous Error Handling (asyncHandler)**
To avoid cluttering our controllers with repetitive try...catch blocks, we use a higher-order function wrapper.

   - **asyncHandler.js**: This utility wraps our asynchronous Express route handlers. It resolves the promise and automatically catches any errors, passing them to the next middleware. This centralizes error handling and keeps controller logic clean and focused on business operations.
```js
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
               .catch((err) => next(err));
    };
};
```

3. **Scalable Data Modeling with Mongoose**
The database schema is designed for scalability and clear relationships between entities using Mongoose.

**Users**: Stores user credentials, profile information, and references to polls they have created or bookmarked.

**Polls**: Contains the poll question, options, and references to the creator.

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
Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation & Setup

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
```js
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h
PORT=8000
```

**Frontend (`.env` in frontend folder)**
```js
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


