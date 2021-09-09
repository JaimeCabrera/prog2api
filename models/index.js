const dbConfig = require("../db/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize);
db.categories = require("./category.model")(sequelize);
db.tasks = require("./task.model")(sequelize);

// define relathions user -> categories
db.users.hasMany(db.categories);
// telathion category ->tasks
db.categories.hasMany(db.tasks);
module.exports = db;
