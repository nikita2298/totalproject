module.exports = app => {
    const puzzle = require("../controllers/puzzles.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", puzzle.create);

     // Retrieve all Tutorials
     router.get("/", puzzle.findAll);

     // Retrieve a single Tutorial with id
    router.get("/:id", puzzle.findOne);
  
  

    app.use('/api/puzzles', router);
}