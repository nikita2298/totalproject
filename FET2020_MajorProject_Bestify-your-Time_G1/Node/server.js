const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bestify Your Time" });
});

require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app); 
require("./app/routes/categories.routes")(app);
require("./app/routes/quiz_categories.routes")(app);
require("./app/routes/quizzes.routes")(app);
// require("./app/routes/questions.routes")(app);
require("./app/routes/games.routes")(app);
require("./app/routes/puzzles.routes")(app);
require("./app/routes/score.routes")(app);
require("./app/routes/quiz_result.routes")(app);
require("./app/routes/puzzle_result.routes")(app);
require("./app/routes/game_result.routes")(app);
require("./app/routes/favourite.routes")(app);
require("./app/routes/state.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});