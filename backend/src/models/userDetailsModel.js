const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    role: {
      type: DataTypes.STRING,
      required: true,
    },

    email: {
      type: DataTypes.STRING,
      required: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      required: true,
    },
    updatedBy: {
      type: DataTypes.STRING,
      required: true,
    },
  };

  return sequelize.define("user_details", attributes, {
    freezeTableName: true,
  });
}

module.exports = model;
