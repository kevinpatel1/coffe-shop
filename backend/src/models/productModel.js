const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      required: true,
    },
    productName: {
      type: DataTypes.STRING,
      required: true,
    },
    gram: {
      type: DataTypes.STRING,
      required: true,
    },
    productDescription: {
      type: DataTypes.STRING,
      required: true,
    },
    price: {
      type: DataTypes.INTEGER,
      required: true,
    },
    images: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    reviews: {
      type: DataTypes.TEXT("long"),
      required: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      required: true,
    },
  };

  const Product = sequelize.define("product", attributes, {
    freezeTableName: true,
  });

  Product.belongsTo(sequelize.models.category, {
    foreignKey: "categoryId",
    as: "category",
  });
  return Product;
}

module.exports = model;
