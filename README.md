# Car Rental Backend API

This is a backend API for a car rental system. It provides endpoints for user authentication, registration.

## Features

- User registration and login with JWT authentication
- Password encryption using bcrypt
- MySQL database integration


## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MySQL database and update the `.env` file with your database credentials:
   ```
   MYSQL_HOST=your_host
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=your_database_name
   JWT_SECRET=your_jwt_secret
   ```
4. Run the SQL scripts provided in the comments to create the necessary tables.

## Running the Server

To start the server, run:

```
node app.js
```

The server will start running on `http://localhost:3000`.
