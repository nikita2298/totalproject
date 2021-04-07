// const db = require("../models");
// const que = db.questions;
// const Op = db.DataType.Op;

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.question) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a Tutorial
//     const quest = {
//         question:req.body.question,
//         question_type:req.body.question_type,
//         option1: req.body.option1,
//         option2: req.body.option2,
//         option3: req.body.option3,
//         option4: req.body.option4,
//         correct_option: req.body.correct_option,
//         quize_id: req.body.quize_id
//     };
  
//     // Save Tutorial in the database
//     que.create(quest)
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
//   //--------------------------------------------------------
// // Retrieve all Tutorials from the database.
//   exports.findAll = (req, res) => {
//     const question = req.query.question;
//     var condition = question ? { question: { [Op.like]: `%${question}%` } } : null;
  
//     que.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
// //------------------------------------------------------------------------------------
// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//     const id = req.params.quize_id;
  
//     que.findByPk(id)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
//   };

