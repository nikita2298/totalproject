const dbConfig = require("../config/db.config.js");

const DataType = require("sequelize");
const sequelize = new DataType(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.DataType = DataType;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, DataType);
db.categories = require("./categories.model")(sequelize, DataType);
db.quize_categories = require("./quiz_categories.model")(sequelize, DataType);
db.quizzes = require("./quizzes.model")(sequelize, DataType);
// db.questions = require("./questions.model")(sequelize, DataType);
db.games = require("./games.model")(sequelize, DataType);
db.puzzles = require("./puzzles.model")(sequelize, DataType);
db.scores = require("./score.model")(sequelize, DataType);
db.quize_result = require("./quiz_result.model")(sequelize, DataType);
db.puzzle_result = require("./puzzle_result.model")(sequelize, DataType);
db.game_result = require("./game_result.model")(sequelize, DataType);
db.favourites = require("./favourite.model")(sequelize, DataType);
db.state = require("./state..model")(sequelize, DataType);

module.exports = db;