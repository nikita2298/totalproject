module.exports = app => {
    const state = require("../controllers/state.controller");
  
    var router = require("express").Router();
  
    // Create a new state
    router.post("/", state.create);
    
    //
    router.post("/:id", state.updateStateByID);

     // Retrieve all Tutorials
     //router.get("/", state.findAll);

     // Retrieve a single Tutorial with id
    router.get("/userid=:uid&quizid=:qid", state.findByUserIDAndQuizID);

    router.delete("/:id", state.deleteByID);

    app.use('/api/state', router);
}
