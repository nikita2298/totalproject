module.exports = app => {
    const game = require("../controllers/games.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", game.create);

     // Retrieve all Tutorials
     router.get("/", game.findAll);

     // Retrieve a single Tutorial with id
    router.get("/:id", game.findOne);
  
  

    app.use('/api/games', router);
}