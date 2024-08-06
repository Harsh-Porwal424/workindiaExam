CREATE TABLE car_rental_login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO car_rental_login (username, password, email)
VALUES 
('Harsh', 'password',  'harsh@email.com'),
('Rohan', 'hello', 'rohan@email.com');


CREATE TABLE car_rental_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50),
    model VARCHAR(50),
    number_plate VARCHAR(20) UNIQUE,
    current_city VARCHAR(50),
    rent_per_hr DECIMAL(10, 2)
);

CREATE TABLE rental_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT,
    origin VARCHAR(50),
    destination VARCHAR(50),
    amount DECIMAL(10, 2),
    FOREIGN KEY (car_id) REFERENCES car_rental_details(id) ON DELETE CASCADE
);