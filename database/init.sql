-- Crea la base de datos
CREATE DATABASE gestion_hoteles CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usa la base de datos
USE gestion_hoteles;

-- Tabla de Hoteles
CREATE TABLE hoteles (
                         id_hotel INT PRIMARY KEY AUTO_INCREMENT,
                         nombre VARCHAR(100) NOT NULL,
                         ciudad VARCHAR(50) NOT NULL,
                         pais VARCHAR(50) NOT NULL,
                         direccion VARCHAR(150),
                         telefono VARCHAR(15),
                         email VARCHAR(100),
                         estrellas INT DEFAULT 3,
                         fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Habitaciones
CREATE TABLE habitaciones (
                              id_habitacion INT PRIMARY KEY AUTO_INCREMENT,
                              id_hotel INT NOT NULL,
                              numero_habitacion VARCHAR(10) NOT NULL,
                              tipo VARCHAR(50), -- "Simple", "Doble", "Suite"
                              precio_noche DECIMAL(10, 2),
                              estado VARCHAR(20) DEFAULT 'disponible', -- "disponible", "ocupada", "mantenimiento"
                              fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel)
);

-- Tabla de Clientes
CREATE TABLE clientes (
                          id_cliente INT PRIMARY KEY AUTO_INCREMENT,
                          nombre VARCHAR(100) NOT NULL,
                          email VARCHAR(100) UNIQUE,
                          telefono VARCHAR(15),
                          cedula VARCHAR(20) UNIQUE,
                          fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reservas
CREATE TABLE reservas (
                          id_reserva INT PRIMARY KEY AUTO_INCREMENT,
                          id_cliente INT NOT NULL,
                          id_habitacion INT NOT NULL,
                          fecha_entrada DATE NOT NULL,
                          fecha_salida DATE NOT NULL,
                          estado VARCHAR(20) DEFAULT 'activa', -- "activa", "completada", "cancelada"
                          precio_total DECIMAL(10, 2),
                          fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
                          FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion)
);

-- Ver las tablas creadas
SHOW TABLES;