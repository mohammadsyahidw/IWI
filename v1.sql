--
-- File generated with SQLiteStudio v3.1.0 on Fri Aug 19 17:59:13 2016
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: eventlist
CREATE TABLE eventlist (eventid INTEGER PRIMARY KEY REFERENCES followerlist (eventid), creatorid INTEGER NOT NULL REFERENCES userlist (id), title VARCHAR (100) NOT NULL, description VARCHAR (5000) NOT NULL);
INSERT INTO eventlist (eventid, creatorid, title, description) VALUES (0, 0, 'Hongdae', 'Ke club biar ketemu artis');

-- Table: followerlist
CREATE TABLE followerlist (eventid INTEGER, follower INTEGER REFERENCES userlist (id));
INSERT INTO followerlist (eventid, follower) VALUES (0, 1);
INSERT INTO followerlist (eventid, follower) VALUES (0, 2);

-- Table: userlist
CREATE TABLE userlist (id INTEGER PRIMARY KEY NOT NULL, username VARCHAR (20) NOT NULL, password VARCHAR (15) NOT NULL);
INSERT INTO userlist (id, username, password) VALUES (0, 'iffahnisrina', '12345');
INSERT INTO userlist (id, username, password) VALUES (1, 'indraputra', '23456');
INSERT INTO userlist (id, username, password) VALUES (2, 'wildanalay', '34567');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
