CREATE DATABASE IF NOT EXISTS desarrollo_web;
USE desarrollo_web;

-- Tabla de Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    registro_academico VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Tabla de Catedráticos
CREATE TABLE Catedraticos (
    id_catedratico INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de Cursos
CREATE TABLE Cursos (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    creditos INT NOT NULL
);

-- Tabla puente entre Catedráticos y Cursos
CREATE TABLE Catedraticos_Cursos (
    id_catedratico INT,
    id_curso INT,
    PRIMARY KEY (id_catedratico, id_curso),
    FOREIGN KEY (id_catedratico) REFERENCES Catedraticos(id_catedratico),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);

-- Tabla de Publicaciones
CREATE TABLE Publicaciones (
    id_publicacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_curso INT NULL,
    id_catedratico INT NULL,
    mensaje TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso),
    FOREIGN KEY (id_catedratico) REFERENCES Catedraticos(id_catedratico)
);

-- Tabla de Comentarios
CREATE TABLE Comentarios (
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    id_publicacion INT,
    id_usuario INT,
    mensaje TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_publicacion) REFERENCES Publicaciones(id_publicacion),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla de Cursos Aprobados
CREATE TABLE Cursos_Aprobados (
    id_usuario INT,
    id_curso INT,
    PRIMARY KEY (id_usuario, id_curso),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
);

SELECT * FROM Usuarios;



