module.exports = app => {
  const score = require("../controllers/score.controller");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", score.create);

  // Retrieve all Tutorials
  router.get("/", score.findAll);

  // Retrieve a single Tutorial with id
  // router.get("/:id", score.findOne);

  // to send an email
  router.post("/sendmail", score.sendMail);

  // to send an email via Admin
  router.post("/mail", score.mail);

  //get Top scorers 
  router.get("/getTopScores", score.getTopScores);

  //get Game Pie
  router.get("/getGamesPie", score.getGamesPie);

  //for calling top scores
  router.get("/:game_id", score.getTop5Scores);

  app.use('/api/scores', router);
}