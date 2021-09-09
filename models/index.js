const dbConfig = require("../db/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize);
db.category = require("./category.model")(sequelize);
db.task = require("./task.model")(sequelize);

// define relathions user -> categories
db.user.hasMany(db.category);
// telathion category ->tasks
db.category.hasMany(db.task);
module.exports = db;
