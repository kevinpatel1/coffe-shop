const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    openingBalance: {
      type: DataTypes.STRING,
      required: true,
    },
    qty: {
      type: DataTypes.STRING,
      required: false,
    },
    stockDate: {
      type: DataTypes.DATE,
      required: false,
    },
    closingBalance: {
      type: DataTypes.STRING,
      required: true,
    },
    transactionType: {
      type: DataTypes.STRING,
      required: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
  };

  return sequelize.define("stock", attributes, {
    freezeTableName: true,
  });
}

module.exports = model;
