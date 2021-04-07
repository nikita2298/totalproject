module.exports = app => {
    const category = require("../controllers/categories.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", category.create);

     // Retrieve all Tutorials
     router.get("/", category.findAll);

     // Retrieve a single Tutorial with id
    router.get("/:id", category.findOne);
  
  

    app.use('/api/categories', router);
}