module.exports = app => {
    const qCat = require("../controllers/quiz_categories.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", qCat.create);

     // Retrieve all Tutorials
     router.get("/", qCat.findAll);

     // Retrieve a single Tutorial with id
    //router.get("/:id", qCat.findOne);
  
  

    app.use('/api/quizecategories', router);
}