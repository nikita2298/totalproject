const db = require("../models");
const quize_cat = db.quize_categories;
const Op = db.DataType.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.quize_cat_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const us = {
      quize_cat_name: req.body.quize_cat_name // ,
      // cat_id:req.body.cat_id
    };
  
    // Save Tutorial in the database
    quize_cat.create(us)
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
    const quize_cat_name = req.query.quize_cat_name;
    var condition = quize_cat_name ? { quize_cat_name: { [Op.like]: `%${quize_cat_name}%` } } : null;
  
    quize_cat.findAll({ where: condition })
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
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     quize_cat.findByPk(id)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
//   };

