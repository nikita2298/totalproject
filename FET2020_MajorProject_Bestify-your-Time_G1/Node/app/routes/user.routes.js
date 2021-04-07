// module.exports = app => {
//     const us = require("../controllers/users.controller");
  
//     var router = require("express").Router();
  
//     // Create a new Tutorial
//     // router.post("/", us.create);

//      // Retrieve all Tutorials
//      router.get("/", us.findAll);

//      // Retrieve a single Tutorial with id
//     router.get("/:id", us.findOne);
  
  

//     app.use('/api/users', router);
// }

module.exports = app => {
    const us = require("../controllers/users.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", us.create);

     // Retrieve all Tutorials
     router.get("/", us.findAll);

     // Retrieve a single Tutorial with id
    router.get("/:id", us.findOne);

    app.use('/api/users', router);
}