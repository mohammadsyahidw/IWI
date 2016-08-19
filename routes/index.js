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
router.all('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/api', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = 'SELECT * FROM eventlist';
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

router.post('/submit', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "INSERT INTO eventlist (creatorid, destination, description, date) VALUES ('"+req.body.creatorid+"', '"+req.body.destination+"', '"+req.body.description+"', '"+req.body.date+"')";
   // var sqlForSelectList = "INSERT INTO eventlist (destination, description, date) VALUES ('Dongdaemun', 'Belanja Ceria', '2016-09-01');";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});

module.exports = router;
