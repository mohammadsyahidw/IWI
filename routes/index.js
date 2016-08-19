var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  database: 'dbs',
  password: '1234'
});

/* GET home page. */
/*
router.all('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.all('/', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "select username, destination, Count(follower) as totalFollower, DATE_FORMAT(date, '%d-%m-%Y') as dateValue from eventlist, followerlist, userlist where eventlist.eventid=followerlist.eventid AND follower = id GROUP BY followerlist.eventid";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});

router.post('/login', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "SELECT count(*) as result FROM userlist where username ='"+req.body.name+"' and password ='"+req.body.password+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});

module.exports = router;
