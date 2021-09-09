const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Task = sequelize.define("tasks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Task;
};
