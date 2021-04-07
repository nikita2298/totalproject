module.exports = app => {
    const gameresult = require("../controllers/game_result.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", gameresult.create);

     // Retrieve all Tutorials
     router.get("/", gameresult.findAll);

     // Retrieve a single Tutorial with id
    router.get("/:id", gameresult.findOne);
  
  

    app.use('/api/gameresult', router);
}