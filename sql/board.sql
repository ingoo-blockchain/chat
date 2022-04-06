CREATE DATABASE IF NOT EXISTS express_board;
use express_board;

CREATE TABLE IF NOT EXISTS board(
    idx int NOT NULL AUTO_INCREMENT,
    subject varchar(100) NOT NULL,
    writer varchar(30) NOT NULL,
    content TEXT NULL,
    register_date TIMESTAMP NOT NULL default current_timestamp,
    hit int default 0,
    PRIMARY KEY(idx)
);

