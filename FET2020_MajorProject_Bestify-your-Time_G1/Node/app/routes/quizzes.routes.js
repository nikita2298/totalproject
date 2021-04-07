module.exports = app => {
    const quizes = require("../controllers/quizzes.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", quizes.create);

     // Retrieve all Tutorials
     router.get("/", quizes.findAll);

     // Retrieve a single Tutorial with id
    router.get("/findOne/:id", quizes.findOne);
  
   //get quiz by FK
   router.get("/getSpecificQuizes/:quiz_cat_id",quizes.getSpecificQuizes);

   router.get("/findAll/:quiz_name",quizes.findAll);


    app.use('/api/quizes', router);
}