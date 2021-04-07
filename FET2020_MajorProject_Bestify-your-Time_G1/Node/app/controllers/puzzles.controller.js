const db = require("../models");
const puzzle = db.puzzles;
const Op = db.DataType.Op;

// Create and Save a new Puzzle
exports.create = (req, res) => {
    // Validate request
    if (!req.body.puzzle_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Puzzle
    const us = {
        puzzle_name: req.body.puzzle_name,
        puzzle_answer:req.body.puzzle_answer,
        puzzle_question:req.body.puzzle_question,
        puzzle_explanation:req.body.puzzle_explanation,
        
      
    };
  
    // Save Puzzle in the database
    puzzle.create(us)
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
// Retrieve all Puzzle from the database.
  exports.findAll = (req, res) => {
    const puzzle_name = req.query.puzzle_name;
    var condition = puzzle_name ? { puzzle_name: { [Op.like]: `%${puzzle_name}%` } } : null;
  
    puzzle.findAll({ where: condition })
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
// Find a single Puzzle with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    puzzle.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

  exports.getAnswerById=(req,res)=>{
    db.sequelize.query("select puzzle_answer from puzzles where puzzle_id=?",
    {
      replacements:[req.params.puzzle_id], type:db.sequelize.QueryTypes.SELECT 
    }).then(data=>{
      // console.log(data);
       res.send(data);
    })
    
  }
  exports.getTopScores=(req,res)=>{
    db.sequelize.query("select puzzle_answer from puzzles where puzzle_id=?select score from puzzle_result order by  score desc limit 3;",
    {
     
    }).then(data=>{
      // console.log(data);
       res.send(data);
    })

  }