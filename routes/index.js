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
router.all('/api/getdata', function (req, res, next) {
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
/*
router.post('/login', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "SELECT count(*) as result FROM userlist where username ='"+req.body.name+"' and password ='"+req.body.password+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      console.log(rows[0].result);
      if(rows[0].result==1){
       // res.json(rows);
      //  res.send('success');
        res.send('Success' + "###" + req.body.name);
        req.session.regenerate(function(){
          req.session.logined = true;
          req.session.user_id = req.body.name;
       });
      }
      else {
        res.send('Failed');
      };

      connection.release();
    });
  });
});
*/
router.post('/api/submit', function (req, res, next) {
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

router.all('/api/login', function(req, res, next){
  //req.session.logined = false;
  if(req.session.logined){
 //   res.render('logout', {session: req.session});
   res.render('firstpage', {session: req.session});
  }
  else {
 //   res.render('login', {session: req.session});
   res.render('firstpage', {sOOession: req.session});
  }

});

router.post('/api/checklogin', function(req, res, next){
  var sqlForSelectList = "SELECT count(*) as result FROM userlist where username ='"+req.body.name+"' and password ='"+req.body.password+"'";
  pool.getConnection(function (err, connection  ) {
  connection.query(sqlForSelectList, function (err, rows) {
    if (err) console.error("err : "+err);
    console.log("rows : "+JSON.stringify(rows));
    console.log(rows[0].result);
    if(rows[0].result==1){
      req.session.regenerate(function(){
        req.session.logined = true;
        req.session.user_id = req.body.name;
        res.send('Success');
      });
    }
    else {
      res.send('Failed');
    };

    connection.release();
  });
    });
  /*
  if(req.body.name == 'wise'  &&  req.body.password =='lab'){
    console.log(req.body.name);
    req.session.regenerate(function(){
      req.session.logined = true;
      req.session.user_id = req.body.name;
   //   console.log("yaya");
     // res.render('login', {session: req.session});
   //   console.log("yaya");

      res.send('Success');
    })
  }
  else{
    console.log("wrong password");
  }
  */
});

router.all('/api/signup', function (req, res, next) {
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
router.all('/signup',function (req,res,next) {
      res.render('sign_up');
    }
)


router.all('/mytrip', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    // var sqlForSelectList = "select * from eventlist";
    var sqlForSelectList = "select * from followerlist inner join eventlist on followerlist.eventid=eventlist.eventid where eventlist.eventid='"+req.body.eventid+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
      connection.release();
    });
  });
});
router.post('/join', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "INSERT INTO followerlist (eventid, follower) VALUES ('"+req.body.eventid1+"', '"+req.body.follower1+"')";
    // var sqlForSelectList = "INSERT INTO eventlist (destination, description, date) VALUES ('Dongdaemun', 'Belanja Ceria', '2016-09-01');";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});

router.post('/search', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "SELECT count(*) as result FROM followerlist where eventid ='"+req.body.eventid+"' and follower ='"+req.body.follower+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});


router.all('/show', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    // var sqlForSelectList = "select * from eventlist";
    var sqlForSelectList = "select * from followerlist inner join eventlist on followerlist.eventid=eventlist.eventid inner join userlist on followerlist.follower=userlist.id where eventlist.eventid='"+req.body.shevent+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
      connection.release();
    });
  });
});

router.post('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
});

module.exports = router;
