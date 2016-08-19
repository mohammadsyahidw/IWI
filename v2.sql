--
-- File generated with SQLiteStudio v3.1.0 on Sat Aug 20 01:11:01 2016
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: eventlist
CREATE TABLE eventlist (eventid INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, creatorid INTEGER NOT NULL REFERENCES userlist (id), destination VARCHAR (100) NOT NULL, description VARCHAR (5000) NOT NULL, date DATE NOT NULL);
INSERT INTO eventlist (creatorid, destination, description, date) VALUES (3, 'Hongdae', 'Mo ketemu artis', '2016-08-27');

-- Table: followerlist
CREATE TABLE followerlist (eventid INTEGER NOT NULL REFERENCES eventlist (eventid), follower INTEGER NOT NULL REFERENCES userlist (id));
INSERT INTO followerlist (eventid, follower) VALUES (1, 1);
INSERT INTO followerlist (eventid, follower) VALUES (1, 2);

-- Table: userlist
CREATE TABLE userlist (id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, username VARCHAR (20) NOT NULL, password VARCHAR (15) NOT NULL);
INSERT INTO userlist (username, password) VALUES ('iffahnisrina', '1234');
INSERT INTO userlist (username, password) VALUES ('wildanalay', '2345');
INSERT INTO userlist (username, password) VALUES ('indraputra', '3456');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
