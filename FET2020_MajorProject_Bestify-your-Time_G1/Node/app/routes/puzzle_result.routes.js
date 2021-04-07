module.exports = app => {
    const puzzleresult = require("../controllers/puzzle_result.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", puzzleresult.create);

     // Retrieve all Tutorials
     //router.get("/", puzzleresult.findAll);

     // Retrieve a single Tutorial with id
    //router.get("/:id", puzzleresult.findOne);
  
    //for mail
   // router.post("/sendmail", puzzleresult.sendMail);
    router.get("/getTopScores",puzzleresult.getTopScores)

    app.use('/api/puzzleresult', router);
}