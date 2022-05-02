CREATE DATABASE warscape_db;
use warscape_db;

CREATE TABLE users (
    id INT not null AUTO_INCREMENT,
    first_name VARCHAR(40),
    last_name VARCHAR(30),
    email VARCHAR(30),
    city VARCHAR(20),
    region VARCHAR(20),
    pass VARCHAR(20),
    user_type VARCHAR(5),
    PRIMARY KEY (id)
);

CREATE TABLE shelters (
    id INT not null AUTO_INCREMENT,
    city VARCHAR(20),
    region VARCHAR(20),
    address VARCHAR(50),
    size INT,
    capacity INT,
    resources JSON,
    doctors JSON,
    risk INT,
    PRIMARY KEY (id)
);

CREATE TABLE borders (
    id INT not null AUTO_INCREMENT,
    city VARCHAR(20),
    region VARCHAR(20),
    address VARCHAR(50),
    size INT,
    capacity INT,
    risk INT,
    PRIMARY KEY (id)
);