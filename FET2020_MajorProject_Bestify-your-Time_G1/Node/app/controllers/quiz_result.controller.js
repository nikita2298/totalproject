const db = require("../models");
const qresult = db.quize_result;
const Op = db.DataType.Op;
const nodemailer = require("nodemailer");

// Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.quize_id) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }

//     // Create a Tutorial
//     const us = {
//         quize_id:req.body.quize_id,
//         user_id: req.body.user_id,
//         status:req.body.status,
//         finised:req.body.finised,
//         date_played:req.body.date_played,
//         score:req.body.score,
//         outOff:req.body.outOff

//     };

//     // Save Tutorial in the database
//     qresult.create(us)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Tutorial."
//         });
//       });
//   };


// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.quize_id) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // // console.log("creating quiz result");
  // // console.log("body param : " , req.body);
  // Create a Tutorial
  const us = {
    quiz_id: req.body.quiz_id,
    user_id: req.body.user_id,
    status: req.body.status,
    date_played: req.body.date_played,
    score: req.body.score,
    out_off: req.body.out_off
  };

  // Save Tutorial in the database
  qresult.create(us)
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
  const quize_id = req.query.quize_id;
  var condition = quize_id ? { quize_id: { [Op.like]: `%${quize_id}%` } } : null;

  qresult.findAll({ where: condition })
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

  qresult.findByPk(id)
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
  // console.log("request came");
  let data = req.body;
  // // console.log(data);
  // // console.log(data[0]);
  // // console.log(data[1]);

  let transporter = nodemailer.createTransport({
    host: "172.27.172.202",
    port: 25,
    secure: false,
    auth: {
      // user: process.env.EMAIL,
      // pass: process.env.PASSWORD
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
    subject: 'SMTP',
    html: `<h1> Hey ${data[0].first_name} </h1><br>
              <h4> Your Result for Quiz is Listed Below</h4>
              <table style="border: 1 black solid;"><tr><th>Quiz Id</th><th>Status</th><th>Score</th><th>Outoff</th><th>Date Played</th></tr>
              <tr><td>${data[1].quize_id}</td><td>${data[1].status ? 'Pass' : 'Fail'}</td><td>${data[1].score}</td><td>${data[1].outOff}</td><td>${data[1].date_played}</td></tr></table>`
  };

  transporter.verify(function (error, success) {
    if (error) {
      // console.log(error);
    } else {
      // console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      // console.log("Error occures", err);
    } else {
      // console.log("Email send successfully....");
    }
  });
};


exports.findByQuizIDandUserID = (req, res) => {
  // console.log("findByQuizIDandUserID user id = "+req.params.uid+" ; quiz id = "+req.params.qid);

  db.sequelize
    .query("select * from quiz_result where user_id=(:userid) and quiz_id=(:quizid)", {
      replacements: { userid: req.params.uid, quizid: req.params.qid }
    })
    .then(data => {
      res.send(data);
      // // console.log("Sending quiz result -> "+JSON.stringify(data));
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving state"
      });
      // console.log(err);
    });
};

exports.updateQuizResultByID = (req, res) => {
  const id = req.params.id;
  // const value=JSON.stringify(req.body.quiz);
  // // console.log("Got Quiz_result object -> "+JSON.stringify(req.body));

  db.sequelize
    .query("update quiz_result set status=(:status),date_played=(:dp),score=(:sc),out_off=(:outoff) where quize_result_id=(:id)", {
      replacements: { status: req.body.status, dp: req.body.date_played, sc: req.body.score, outoff: req.body.out_off, id: req.params.id }
    })
    .then(data => {
      // console.log("After update responce -> "+JSON.stringify(data));
      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
      // console.log(err);
    });
};


   // query=select q.quiz_name,count(r.quiz_id) from quiz_result r JOIN quizzes q ON r.quiz_id=q.quiz_id GROUP BY r.quiz_id;
   exports.getQuizAnalysis=(req,res)=>{
    db.sequelize.query("select q.quiz_name,count(r.quiz_id)AS Analysis from quiz_result r JOIN quizzes q ON r.quiz_id=q.quiz_id GROUP BY r.quiz_id;",
    {
      replacements: [], type: db.sequelize.QueryTypes.SELECT 
     
    }).then(data=>{
      console.log(data);
       res.send(data);
    })
  
  }