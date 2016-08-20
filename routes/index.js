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
   // var sqlForSelectList = "select * from eventlist";
    var sqlForSelectList = "select username, destination, Count(follower) as totalFollower, DATE_FORMAT(date, '%d-%m-%Y') as dateValue from eventlist, followerlist, userlist where eventlist.eventid=followerlist.eventid AND follower = id GROUP BY followerlist.eventid";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
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
      console.log(rows[0].result);
      if(rows[0].result==1){
        res.json(rows);
        req.session.regenerate(function(){
        req.session.logined = true;
        req.session.user_id = req.body.name;
       });
      }
      else {
        res.json(rows);
      }
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
//
// router.get('/login', function(req, res, next){
//   //req.session.logined = false;
//   if(req.session.logined)
//     res.render('logout', {session: req.session})
//   else {
//     res.render('login', {session: req.session})
//   }
//
// })
// router.post('/login', function(req, res, next){
//   if(req.body.id == 'wise'  &&  req.body.pw =='lab'){
//     req.session.regenerate(function(){
//       req.session.logined = true;
//       req.session.user_id = req.body.id;
//       res.render('logout', {session: req.session})
//     })
//   }
//   else{
//     console.log("wrong password");
//   }
//
// });

router.post('/signup', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "INSERT INTO userlist (username, password) VALUES ('"+req.body.newname+"', '"+req.body.newpassword1+"')";
    // var sqlForSelectList = "INSERT INTO eventlist (destination, description, date) VALUES ('Dongdaemun', 'Belanja Ceria', '2016-09-01');";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});

router.post('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
})

module.exports = router;
