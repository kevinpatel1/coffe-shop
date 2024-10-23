const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");
const fs = require('fs');
const path = require('path');
const config = require("config");
const { file_path } = config.get("uploads");

async function register(data, files, user) {
  if (
    await db.product.findOne({
      where: {
        productName: data.productName,
      },
    })
  ) {
    throw new Error("Product already exists");
  }

  const newData = {
    categoryId: data.categoryId,
    productName: data.productName,
    productDescription: data.productDescription,
    price: data.price,
    gram: data.gram,
    reviews: data.reviews,
    isDeleted: false,
  };

  if (files) {
    let arr = [];

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      arr.push(element.filename);
    }
    newData.images = JSON.stringify(arr);
  }

  let addData = await db.product.create(newData);

  if (addData) {
    let newStockData = {
      productId: addData.id,
      openingBalance: 0,
      qty: data.stock,
      stockDate: new Date(),
      closingBalance: data.stock,
      transactionType: "Inward",
      isDeleted: false,
    };

    let addDataStock = await db.stock.create(newStockData);
  }
}

async function list(user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: db.category,
        as: "category",
      },
    ],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  const list = await db.product.findAndCountAll(sqlQuery);

  if (list) {
    let finalResponse = {
      rows: [],
      count: list.count,
    };
    for (let index = 0; index < list?.rows?.length; index++) {
      const element = list?.rows[index];

      let obj = {
        id: element.id,
        productName: element.productName,
        productDescription: element.productDescription,
        price: element.price,
        category: element.category,
        images: JSON.parse(element.images || "[]"),
        reviews: element.reviews,
        isDeleted: element.isDeleted,
      };

      const stockDetails = await db.stock.findOne({
        where: { productId: element.id, isDeleted: false },
        order: [["updatedAt", "DESC"]],
      });

      obj.stock = stockDetails.closingBalance;

      finalResponse.rows.push(obj);
    }

    return finalResponse;
  }
}


async function update(data, id, files, user) {
  let checkProduct = await db.product.findOne({
    where: { id: id },
  });
  if (checkProduct) {
    if (checkProduct.productName !== data.productName) {
      if (
        await db.product.findOne({
          where: { productName: data.productName, isDeleted: false },
        })
      ) {
        throw new Error("product Name already exists");
      }
    }

    // Delete the removed images from the uploads folder

    const newData = {
      categoryId: data.categoryId,
      productName: data.productName,
      productDescription: data.productDescription,
      price: data.price,
      reviews: data.reviews,
      isDeleted: false,
    };
    // Parse old images
    let arr = JSON.parse(data?.oldImages || "[]");

    // Handle uploaded files
    if (files) {
      let uploadedFiles = [];
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        uploadedFiles.push(element.filename);
      }
      arr = arr.concat(uploadedFiles); // Add new uploaded files to the image array
    }

    // Delete the removed images from the uploads folder
    const currentImages = JSON.parse(checkProduct.images || "[]");
    const removedImages = currentImages.filter((image) => !arr.includes(image));

    removedImages.forEach((image) => {
      const filePath = path.join(file_path, image); // Adjust your upload folder path accordingly
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        } else {
          console.log(`Successfully deleted file: ${filePath}`);
        }
      });
    });

    // Update the product's images
    newData.images = JSON.stringify(arr);

    await db.product.update(newData, {
      where: { id: id },
    });
  }
}

async function soft_delete(id, user) {
  if (
    await db.product.findOne({
      where: { id: id },
    })
  ) {
    const newData = {
      isDeleted: true,
    };

    await db.product.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Product does not exists");
  }
}

async function listByCategoryId(categoryId, user, size, page) {
  console.log("categoryId: ", categoryId);
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false, categoryId: categoryId },
    order: [["updatedAt", "DESC"]],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  const list = await db.product.findAndCountAll(sqlQuery);

  if (list) {
    let finalResponse = {
      rows: [],
      count: list.count,
    };
    for (let index = 0; index < list?.rows?.length; index++) {
      const element = list?.rows[index];

      let obj = {
        id: element.id,
        productName: element.productName,
        productDescription: element.productDescription,
        price: element.price,
        gram: element.gram,
        images: element.images,
        reviews: element.reviews,
        isDeleted: element.isDeleted,
      };

      // const stockDetails = await db.stock.findOne({
      //   where: { productId: element.id, isDeleted: false },
      //   order: [["updatedAt", "DESC"]],
      // });

      // obj.stock = stockDetails.closingBalance;

      finalResponse.rows.push(obj);
    }

    return finalResponse;
  }
}

module.exports = { register, list, update, soft_delete, listByCategoryId };
