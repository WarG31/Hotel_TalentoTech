CREATE DATABASE hotel_db;
USE hotel_DB;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL UNIQUE,
    last_name VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS habitaciones(
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_type VARCHAR(50) NOT NULL,
    price DECIMAL NOT NULL,
    status VARCHAR(20) NOT NULL,
    description TEXT  
);

INSERT INTO habitaciones (room_type, price, status, description)
VALUES
('sencilla',200000,'disponible','Habitación Sencilla'),
('sencilla',200000,'disponible','Habitación Sencilla'),
('sencilla',200000,'disponible','Habitación Sencilla'),
('doble',300000,'disponible','Habitación doble'),
('doble',300000,'disponible','Habitación doble'),
('doble',300000,'disponible','Habitacion doble'),
('familiar',500000,'disponible','Habitación familiar'),
('familiar',500000,'disponible','Habitación familiar'),
('familiar',500000,'disponible','Habitación familiar');



/** Tabla aún no usada por el proyecto , **se debe corregir, no está bien definida**/
-- CREATE TABLE IF NOT EXISTS reservas(
--     reservation_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT FOREIGN KEY,
--     room_id INT FOREIGN KEY,
--     check_in_date DATE,
--     check_out_date DATE,
--     total_price DECIMAL

-- );