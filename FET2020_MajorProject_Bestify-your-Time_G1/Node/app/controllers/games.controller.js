const db = require("../models");
const game = db.games;
const Op = db.DataType.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.game_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const us = {
        game_name: req.body.game_name
      //  cat_id:req.body.cat_id
    };
  
    // Save Tutorial in the database
    game.create(us)
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
    const game_name = req.query.game_name;
    var condition = game_name ? { game_name: { [Op.like]: `%${game_name}%` } } : null;
  
    game.findAll({ where: condition })
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
  
    game.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

