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
  res.render('firstpage', {session: req.session});
});

router.all('/api/getdata', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "select eventlist.eventid, userlist.username, destination, Count(follower) as totalFollower, DATE_FORMAT(date, '%d-%m-%Y') as datevalue FROM eventlist, followerlist, userlist WHERE eventlist.eventid = followerlist.eventid AND creatorid = id GROUP BY followerlist.eventid";

    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
      connection.release();
    });
  });
});

router.all('/api/getdatatrip', function (req, res, next) {
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

router.post('/api/submit', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "INSERT INTO eventlist (creatorid, destination, description, date) VALUES ('"+req.body.creatorid+"', '"+req.body.destination+"', '"+req.body.description+"', '"+req.body.date+"')";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      var sqlForSelectList = "SELECT * FROM eventlist where creatorid = '"+req.body.creatorid+"' AND destination = '"+req.body.destination+"' AND description = '"+req.body.description+"' AND date = '"+ req.body.date+"'" ;
      connection.query(sqlForSelectList, function (err, rows) {
        if (err) console.error("err : "+err);
        console.log("rows : "+JSON.stringify(rows));
        var sqlForSelectList = "INSERT INTO followerlist (eventid, follower) VALUES ('"+rows[0].eventid+"', '"+req.body.creatorid+"')";
        // var sqlForSelectList = "INSERT INTO eventlist (destination, description, date) VALUES ('Dongdaemun', 'Belanja Ceria', '2016-09-01');";
        connection.query(sqlForSelectList, function (err, rows) {
          if (err) console.error("err : "+err);
          console.log("rows : "+JSON.stringify(rows));
          res.json(rows);
          connection.release();
        });
      });
    });
  });
});

router.all('/login', function(req, res, next){
  if(req.session.logined){
   res.render('firstpage', {session: req.session});
  }
  else {
      res.render('firstpage', {session: req.session});
  }

});

router.post('/api/checklogin', function(req, res, next){
  var sqlForSelectList = "SELECT count(*) as result, id FROM userlist where username ='"+req.body.name+"' and password ='"+req.body.password+"'";
  pool.getConnection(function (err, connection  ) {
  connection.query(sqlForSelectList, function (err, rows) {
    if (err) console.error("err : "+err);
    console.log("rows : "+JSON.stringify(rows));
    console.log(rows[0].result);
    if(rows[0].result==1){
      req.session.regenerate(function(){
        req.session.logined = true;
        req.session.user_id = req.body.name;
        req.session.user_number = rows[0].id;
        res.send('Success');
      });
    }
    else {
      res.send('Failed');
    };

    connection.release();
  });
    });
});

router.all('/api/signup', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "INSERT INTO userlist (username, password, email, phonenumber) VALUES ('"+req.body.newname+"', '"+req.body.newpassword1+"', '"+req.body.newemail+"', '"+req.body.newphonenumber+ "')";
    console.log(sqlForSelectList);
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
    });
router.all('/addTrip',function (req,res,next) {
  if(req.session.logined) {
    res.render('addEvent', {session: req.session});
  }
  else{
    res.redirect('/loginFailed');
  }
});
router.all('/editTrip',function (req,res,next) {
  res.render('editEvent',{session: req.session});

});
router.all('/myTrips',function (req,res,next) {
  if(req.session.logined){
    res.render('myTrips',{session: req.session});
  }
  else {
    res.redirect('/loginFailed');
  }
});

router.all('/deleteTrip/:idTrip',function (req,res,next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "DELETE FROM eventlist WHERE eventid = '"+req.params.idTrip+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      var sqlForSelectList = "DELETE FROM followerlist WHERE eventid = '"+req.params.idTrip+"'";
      connection.query(sqlForSelectList, function (err, rows) {
        if (err) console.error("err : "+err);
        console.log("rows : "+JSON.stringify(rows));
        res.send("Delete Success");
        connection.release();
      });
    });
  });
});

router.all('/loginFailed',function (req,res,next) {
  res.render('loginFailed');

});
router.all('/api/myTrip', function (req, res, next) {

    pool.getConnection(function (err, connection  ) {
      // var sqlForSelectList = "select * from eventlist";
      var sqlForSelectList = "select destination, DATE_FORMAT(date, '%d-%m-%Y') as datevalue, Count(follower) as totalFollower , eventlist.eventid from followerlist inner join eventlist on followerlist.eventid=eventlist.eventid where eventlist.creatorid='"+req.session.user_number+"' GROUP BY followerlist.eventid";
      connection.query(sqlForSelectList, function (err, rows) {
        if (err) console.error("err : "+err);
        console.log("rows : "+JSON.stringify(rows));
        res.json(rows);
        console.log(rows);

        connection.release();
      });
    });


});
router.post('/api/join', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "INSERT INTO followerlist (eventid, follower) VALUES ('"+req.body.eventid1+"', '"+req.body.follower1+"')";
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

router.post('/checktrip', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "SELECT count(*) as result FROM eventlist where creatorid ='"+req.session.user_number+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      connection.release();
    });
  });
});

router.all('/followerlist', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    var sqlForSelectList = "select count(*) as frslt from followerlist inner join eventlist on followerlist.eventid=eventlist.eventid inner join userlist on followerlist.follower=userlist.id where eventlist.eventid='"+req.body.shevent+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
      connection.release();
    });
  });
});

router.all('/detailTrip', function (req, res, next) {
    res.render('showEvent', {session: req.session});

});

router.all('/show/:eventid', function (req, res, next) {
  if(req.session.logined){
    pool.getConnection(function (err, connection  ) {
      // var sqlForSelectList = "select * from eventlist";
      var sqlForSelectList = "select * from followerlist inner join eventlist on followerlist.eventid=eventlist.eventid inner join userlist on followerlist.follower=userlist.id where eventlist.eventid='"+req.params.eventid+"'";
      var a = {};
      var data = {};
      var b = {};
      connection.query(sqlForSelectList, function (err, rows) {
        if (err) console.error("err : "+err);
        //  console.log("rows : "+JSON.stringify(rows));
        // res.json(rows);
        a = rows;
        console.log("yayaya1 " +JSON.stringify(rows));
        var sqlForSelectList = "select * from eventlist inner join followerlist on followerlist.eventid=eventlist.eventid inner join userlist on eventlist.creatorid=userlist.id where eventlist.eventid='"+req.params.eventid+"'";
        connection.query(sqlForSelectList, function (err, rows) {
          if (err) console.error("err : "+err);
          //  console.log("rows : "+JSON.stringify(rows));
          //res.json(rows);
          console.log("yayaya2 " +JSON.stringify(rows));
          data.sumber2 = rows;
          connection.release();
          b = rows;
          console.log("ini" + JSON.stringify(a));
          res.render('showEvent', {session: req.session, data: a, data2 : b});
        });
      });


      ;
    });
  }
  else {
    res.redirect('/loginFailed');
  }
});

router.all('/shownone', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    // var sqlForSelectList = "select * from eventlist";
    var sqlForSelectList = "select * from userlist inner join eventlist on userlist.id=eventlist.creatorid where eventlist.eventid='"+req.body.shevent+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
      connection.release();
    });
  });
});

router.all('/showcreator', function (req, res, next) {
  pool.getConnection(function (err, connection  ) {
    // var sqlForSelectList = "select * from eventlist";
    var sqlForSelectList = "select * from eventlist inner join followerlist on followerlist.eventid=eventlist.eventid inner join userlist on eventlist.creatorid=userlist.id where eventlist.eventid='"+req.body.shevent+"'";
    connection.query(sqlForSelectList, function (err, rows) {
      if (err) console.error("err : "+err);
      console.log("rows : "+JSON.stringify(rows));
      res.json(rows);
      console.log(rows);
      connection.release();
    });
  });
});

router.all('/logout', function(req,res,next){
  req.session.destroy();
  res.redirect('/login')
});

module.exports = router;
