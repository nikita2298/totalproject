const db = require("../models");
const puzresult = db.puzzle_result;
const Op = db.DataType.Op;
const nodemailer = require("nodemailer");


exports.create = (req, res) => {
  // Validate request
  if (!req.body.score) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  
  const us = {
    user_id: req.body.user_id,

    date_played: req.body.date_played,
    score: req.body.score,
  };

  
  puzresult
    .create(us)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
//--------------------------------------------------------

exports.findAll = (req, res) => {
  const puzzle_id = req.query.puzzle_id;
  var condition = puzzle_id
    ? { puzzle_id: { [Op.like]: `%${puzzle_id}%` } }
    : null;

  puzresult
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
//------------------------------------------------------------------------------------

exports.findOne = (req, res) => {
  const id = req.params.id;

  puzresult
    .findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

exports.getTopScores = (req, res) => {
  db.sequelize
    .query(
      "select users.first_name, puzzle_result.score from puzzle_result,users where users.user_id=puzzle_result.user_id order by  score desc limit 3",
      {
        replacements: [],
        type: db.sequelize.QueryTypes.SELECT,
      }
    )
    .then((data) => {
      console.log(data);
      res.send(data);
    });
};



  exports.getTopScores = (req, res) => {
    db.sequelize
      .query(
        "select users.first_name, puzzle_result.score from puzzle_result,users where users.user_id=puzzle_result.user_id order by  score desc limit 3",
        {
          replacements: [],
          type: db.sequelize.QueryTypes.SELECT,
        }
      )
      .then((data) => {
        console.log(data);
        res.send(data);
      });
  };
  