const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    productDetails: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
  };

  return sequelize.define("order", attributes, {
    freezeTableName: true,
  });
}

module.exports = model;
