CREATE DATABASE IF NOT EXISTS API;

USE API;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL
);
select * from productos;

INSERT INTO `API`.`productos` (`nombre`, `costo`, `precio`) VALUES ('Pato', '5.09', '7.99');
INSERT INTO `API`.`productos` (`nombre`, `costo`, `precio`) VALUES ('Catsup', '3.09', '5.99');
INSERT INTO `API`.`productos` (`nombre`, `costo`, `precio`) VALUES ('Mostaza', '4.09', '6.99');
