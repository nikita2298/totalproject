const db = require("../models");
const quize = db.quizzes;
const Op = db.DataType.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    
    if (!req.body.quiz_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const us = {
      quiz_name: req.body.quiz_name,
      quiz_cat_id:req.body.quiz_cat_id,
      questions:req.body.questions,
      quiz_time:req.body.quiz_time,
      description:req.body.description
    };
  
    // Save Tutorial in the database
    quize.create(us)
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
  // exports.findAll = (req, res) => {
  //   const quize_name = req.query.quize_name;
  //   var condition = quize_name ? { quize_name: { [Op.like]: `%${quize_name}%` } } : null;
  
  //   quize.findAll({ where: condition })
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving tutorials."
  //       });
  //     });
  // };
//------------------------------------------------------------------------------------
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    quize.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

  //find quizes by quiz category i.e FK 
exports.getSpecificQuizes=(req,res)=>{

  // console.log(" Body " ,req.params);
  db.sequelize.query("select * from quizzes where quiz_cat_id=?",
  {replacements:[req.params.quiz_cat_id],type:db.sequelize.QueryTypes.SELECT}
  ).then(data=>{
    res.send(data);
    // console.log(data);
  });


}

  // select *from quizes where quize_name like "Physic"  Search functionality;
  exports.findAll = (req, res) => {
    // db.sequelize.query(" select *from quizes where quize_name like ? ",
    // {replacements:[req.params.quize_name],type:db.sequelize.QueryTypes.SELECT}
    // )
    // console.log("request body : ",req.params.quiz_name);
    console.log(" req.params : ", req.params);
  
    const quize_name = req.params.quiz_name;
    console.log(" const : ", quize_name);
  
    var condition = quize_name ? { quiz_name: { [Op.like]: `%${quize_name}%` } } : null;
  
    quize.findAll({ where: condition })
      .then(data => {
        res.send(data);
        console.log(data);
      });
  }
  
