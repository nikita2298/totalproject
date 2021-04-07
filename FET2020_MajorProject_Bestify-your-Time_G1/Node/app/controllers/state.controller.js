const db = require("../models");
const state = db.state;
const Op = db.DataType.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.puzzle_id) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Tutorial
  const us = {
      user_id:req.body.user_id,
      quiz_id:req.body.quiz_id,
      quiz:req.body.quiz,
      cat_id:req.body.cat_id,
      timer:req.body.timer
  };

  // Save Tutorial in the database
  state.create(us)
    .then(data => {
      res.send(data);
      //// console.log("sending new state data -> "+JSON.stringify(data));
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
  const puzzle_id = req.query.puzzle_id;
  var condition = puzzle_id ? { puzzle_id: { [Op.like]: `%${puzzle_id}%` } } : null;

  state.findAll({ where: condition })
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

  state.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

exports.updateStateByID = (req, res) => {
  const id = req.params.id;
  const value=JSON.stringify(req.body.quiz);
  // console.log("JSON object to update -> "+value);

  db.sequelize
  .query("update state set quiz=(:quiz),timer=(:timer) where state_id=(:id)",{
    replacements: {quiz:value,timer:req.body.timer,id:req.params.id}
  })
    .then(data => {
      // // console.log("after updating state responce -> "+JSON.stringify(data));
      // res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
      // console.log(err);
    });
};

exports.findByUserIDAndQuizID = (req, res) => {
  //const id = req.params.id;
  //const value=JSON.stringify(req.body.quiz);
  // // console.log("user id = "+req.params.uid+" ; quiz id = "+req.params.qid);

  db.sequelize
  .query("select * from state where user_id=(:userid) and quiz_id=(:quizid)",{
    replacements: {userid:req.params.uid,quizid:req.params.qid}
  })
    .then(data => {
      res.send(data);
      //// console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving state"
      });
      // console.log(err);
    });
};

exports.deleteByID = (req, res) => {
  //const id = req.params.id;
  //const value=JSON.stringify(req.body.quiz);
  // // console.log("state id = "+req.params.id);

  db.sequelize
  .query("delete from state where state_id=(:sid)",{
    replacements: {sid:req.params.id}
  })
    .then(data => {
      res.send(data);
      // // console.log("deleting state -> "+data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving state"
      });
      // console.log(err);
    });
};
