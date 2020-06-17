CREATE DATABASE papeleria;

USE papeleria;


CREATE TABLE productos (
  id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  fullname VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL 
);