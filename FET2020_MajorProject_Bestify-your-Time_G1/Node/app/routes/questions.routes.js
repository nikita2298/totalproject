// module.exports = app => {
//     const questions = require("../controllers/questions.controller");
  
//     var router = require("express").Router();
  
//     // Create a new Tutorial
//     router.post("/", questions.create);

//      // Retrieve all Tutorials
//      router.get("/", questions.findAll);

//      // Retrieve a single Tutorial with id
//     router.get("/:id", questions.findOne);
  
  

//     app.use('/api/questions', router);
// }