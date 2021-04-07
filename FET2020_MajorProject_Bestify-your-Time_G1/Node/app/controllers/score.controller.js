const db = require("../models");
const scores = db.scores;
const Op = db.DataType.Op;
const nodemailer = require("nodemailer");

// Create and Save a new Tutorial
exports.create = (req, res) => {

    console.log("body " , req.body);
    // Validate request
    if (!req.body.game_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const us = {
        game_id:req.body.game_id,
        user_id: req.body.user_id,
        score:req.body.score,
        //status:req.body.status,
        date_played:req.body.date_played,
        // start_time:req.body.start_time,
        // end_time:req.body.end_time
    };
  
    // Save Tutorial in the database
    scores.create(us)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
  //--------------------------------------------------------
// Retrieve all Tutorials from the database.
  exports.findAll = (req, res) => {
    const score_id = req.query.score_id;
    var condition = score_id ? { score_id: { [Op.like]: `%${score_id}%` } } : null;
  
    scores.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
//------------------------------------------------------------------------------------
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    scores.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };


// to send an email

exports.sendMail = (req, res) => {
  console.log("request came");
  let data = req.body;
  // console.log(data);
  // console.log(data[0]);
  // console.log(data[1]);

  let transporter = nodemailer.createTransport({
    host: "172.27.172.202",
    port: 25,
    secure: false,
    auth: {
      user: "dadaramj@evolvingsols.com",
      pass: "Tiger@321"
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: "dadaramj@evolvingsols.com",
    to: data[0].email,
    subject: 'Score for Your game XD',
    html: `<h1> Hey ${data[0].first_name} </h1><br>
              <h4> Your Result for Game is Listed Below</h4>
              <table style="border: 1 black solid;"><tr><th>Game</th><th>Score</th><th>Date Played</th></tr>
              <tr><td>${(data[1].game_id == 1) ?'Snake':'Tetris'}</td><td>${data[1].score}</td><td>${data[1].date_played}</td></tr></table>`
  };

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error occures", err);
    } else {
      console.log("Email send successfully....");
    }
  });
};

// }
// query1=select u.first_name,s.score from users u JOIN scores s ON u.user_id=s.user_id ORDER BY s.score DESC Limit 5;
// query=select score,user_id from scores order by score desc limit 3;
// queryDate=select u.first_name,s.score from users u JOIN scores s ON u.user_id=S.user_id AND s.date_played = '2020-12-17' ORDER BY s.score DESC Limit 5;
// queryGroupBy=mysql> select u.first_name,s.score from users u JOIN scores s ON u.user_id=S.user_id AND s.date_played = '2020-12-17'GROUP BY s.game_id ORDER BY s.score DESC Limit 5 ;

exports.getTopScores=(req,res)=>{
  db.sequelize.query("select distinct u.email,u.first_name,s.score from users u JOIN scores s ON u.user_id=s.user_id ORDER BY s.score DESC Limit 5;",
  {
    replacements: [], type: db.sequelize.QueryTypes.SELECT 
   
  }).then(data=>{
    console.log(data);
     res.send(data);
  })

}

exports.getTop5Scores=(req,res)=>{
  
}

// query2=select g.game_name,count(s.game_id) from scores s JOIN games g ON s.game_id=g.game_id GROUP BY s.game_id;
exports.getGamesPie=(req,res)=>{
  db.sequelize.query("select g.game_name,count(s.game_id) AS Count from scores s JOIN games g ON s.game_id=g.game_id GROUP BY s.game_id;",
  {
    replacements: [], type: db.sequelize.QueryTypes.SELECT 
   
  }).then(data=>{
    console.log(data);
     res.send(data);
  })

}


//Send Email by ADMIN
exports.mail = (req, res) => {
  console.log("request came");
  let data = req.body;
  // console.log(data);
  // console.log(data[0]);
  // console.log(data[1]);

  let transporter = nodemailer.createTransport({
    host: "172.27.172.202",
    port: 25,
    secure: false,
    auth: {
      user: "dadaramj@evolvingsols.com",
      pass: "Tiger@321"
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: "dadaramj@evolvingsols.com",
    to: data,
    subject: 'Winner For Our Event XD',
    html: `<h1> You guys are our Winner for today's Event #YOLO </h1>`
  };

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error occures", err);
    } else {
      console.log("Email send successfully....");
    }
  });
};