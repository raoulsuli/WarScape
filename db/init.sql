CREATE DATABASE warscape_db;
use warscape_db;

CREATE TABLE shelters (
    id INT not null AUTO_INCREMENT,
    city VARCHAR(200) unique,
    lat DOUBLE,
    lon DOUBLE,
    max_no_people,
    is_full BOOLEAN,
    PRIMARY KEY (id)
);