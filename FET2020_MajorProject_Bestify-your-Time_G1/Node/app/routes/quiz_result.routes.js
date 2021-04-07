module.exports = app => {
    const quizeresult = require("../controllers/quiz_result.controller");

    var router = require("express").Router();

    

    // Retrieve all Tutorials
    router.get("/", quizeresult.findAll);

    // Retrieve a single Tutorial with id
    //router.get("/:id", quizeresult.findOne);


    router.post("/quizres/:id", quizeresult.updateQuizResultByID);

    // Retrieve Result 
    router.get("/quizres/userid=:uid&quizid=:qid", quizeresult.findByQuizIDandUserID);

    // Create a new Tutorial
    router.post("/quizres/", quizeresult.create);

    router.post("/sendmail", quizeresult.sendMail);

       //get Quiz Analysis
   router.get("/getQuizAnalysis",quizeresult.getQuizAnalysis);

    app.use('/api/quizeresult', router);
}