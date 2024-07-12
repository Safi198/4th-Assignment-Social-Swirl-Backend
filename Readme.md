# Social Swirl Backend API

# Role-Based Access Control (RBAC) API

This project implements Role-Based Access Control (RBAC) in a Node.js API to manage different user permissions. The API is built using Node.js, Express, MongoDB, bcryptjs, and jsonwebtoken.

## Features

- User registration with roles (admin, user)
- User login with JWT authentication
- Protected routes accessible only to users with specific roles

## Prerequisites

- Node.js installed
- MongoDB instance running

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_uri
   SECRET_KEY=your_secret_key
   PORT=your_port
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## API Endpoints

### Register

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "username": "exampleUser",
      "password": "examplePassword",
      "role": "user" // optional, default is 'user'
  }
  ```
- **Description**: Registers a new user with an optional role. If no role is provided, the default role is `user`.

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "username": "exampleUser",
      "password": "examplePassword"
  }
  ```
- **Description**: Logs in a user and returns a JWT token.

### Get All Users (Admin Only)

- **URL**: `/admin/users`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <your_jwt_token>`
- **Description**: Retrieves a list of all users. This endpoint is accessible only to users with the `admin` role.

## Testing

Use [Postman](https://www.postman.com/) or any other API testing tool to test the endpoints.

1. **Register a new user**:
   - Send a `POST` request to `/auth/register` with the required body.

2. **Login with the registered user**:
   - Send a `POST` request to `/auth/login` with the required body.
   - Copy the returned JWT token.

3. **Access protected routes**:
   - Send a `GET` request to `/admin/users` with the `Authorization` header set to `Bearer <your_jwt_token>`.
   - Ensure you are using an admin user's JWT token to access this endpoint.

## Project Structure

- `controllers/`
  - `authController.js`: Handles user registration and login.
- `middleware/`
  - `authenticate.js`: JWT authentication middleware.
  - `roleMiddleware.js`: Middleware to check user roles.
- `models/`
  - `user.js`: Mongoose model for the User schema.
- `routes/`
  - `auth.js`: Routes for authentication (register, login).
  - `admin.js`: Routes for admin-specific actions.
- `index.js`: Main entry point for the application.
