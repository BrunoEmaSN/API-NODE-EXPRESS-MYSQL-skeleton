DROP DATABASE IF EXISTS test_db;   
CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
  ( 
     id         	INT UNSIGNED AUTO_INCREMENT, 
     username   	VARCHAR(25) UNIQUE NOT NULL, 
     password   	CHAR(60) NOT NULL, 
     first_name 	VARCHAR(50) NOT NULL, 
     last_name  	VARCHAR(50) NOT NULL, 
     email      	VARCHAR(100) UNIQUE NOT NULL, 
     role       	ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
     date_of_birth	DATE,
     PRIMARY KEY(id)
); 