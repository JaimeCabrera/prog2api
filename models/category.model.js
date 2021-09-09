const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Category = sequelize.define("categories", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Category;
};
