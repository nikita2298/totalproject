const db = require("../models");
const user = db.user;
const Op = db.DataType.Op;

// Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.first_name) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a Tutorial
//     const us = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password: req.body.password,
//      role:req.body.role
//     };
  
//     // Save Tutorial in the database
//     user.create(us)
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
  //--------------------------------------------------------
// Retrieve all Tutorials from the database.
  exports.findAll = (req, res) => {
    const first_name = req.query.first_name;
    var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;
  
    user.findAll({ where: condition })
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
  
    user.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

