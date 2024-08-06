# Car Rental Backend API

This is a backend API for a car rental system built with Node.js, Express, and MySQL. It provides endpoints for user authentication, registration, and car management.

## Features

- User registration and login with JWT authentication
- Password encryption using bcrypt
- Car registration with rental history
- MySQL database integration

## Prerequisites

- Node.js
- MySQL
- npm (Node Package Manager)

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
node server.js
```

The server will start running on `http://localhost:3000`.

## API Endpoints

### User Authentication

#### Login
- **URL**: `/api/login`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response**: 
  ```json
  {
    "status": "Login successful",
    "status_code": 200,
    "user_id": "number",
    "access_token": "string"
  }
  ```

#### Register
- **URL**: `/api/register`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Success Response**: 
  ```json
  {
    "status": "Account successfully created",
    "status_code": 200,
    "user_id": "number"
  }
  ```

### Car Management

#### Add a Car
- **URL**: `/api/car/create`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "category": "string",
    "model": "string",
    "number_plate": "string",
    "current_city": "string",
    "rent_per_hr": "number",
    "rent_history": [
      {
        "origin": "string",
        "destination": "string",
        "amount": "number"
      }
    ]
  }
  ```
- **Success Response**: 
  ```json
  {
    "status": "Car successfully added",
    "car_id": "number",
    "status_code": 200
  }
  ```

## Database Schema

The project uses three main tables:

1. `car_rental_login`: Stores user login information
2. `car_rental_details`: Stores car details
3. `rental_history`: Stores the rental history for each car

For detailed schema information, refer to the SQL creation scripts in the source code.

## Security

- Passwords are hashed using bcrypt before storing in the database
- JWT is used for authentication
- Environment variables are used to store sensitive information

