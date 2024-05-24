const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");

async function register(data, user) {
  let stockDetails = await db.stock.findOne({
    where: {
      productId: data.productId,
      isDeleted: false,
    },
  });
  if (!stockDetails) {
    throw new Error("Product Does not exists");
  }
  const newData = {
    productId: data.productId,
    openingBalance: stockDetails.closingBalance,
    qty: data.qty,
    stockDate: new Date(),
    closingBalance: parseInt(stockDetails.closingBalance) + parseInt(data.qty),
    transactionType: "Inward",

    isDeleted: false,
  };

  let addData = await db.stock.create(newData);
}

async function list(user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  const list = await db.stock.findAndCountAll(sqlQuery);

  if (list) {
    let finalResponse = {
      rows: [],
      count: list.count,
    };

    for (let index = 0; index < list?.rows?.length; index++) {
      const element = list?.rows[index];

      let obj = {
        id: element.id,
        openingBalance: element.openingBalance,
        qty: element.qty,
        stockDate: element.stockDate,
        closingBalance: element.closingBalance,
        transactionType: element.transactionType,
        isDeleted: element.isDeleted,
      };

      const product = await db.product.findOne({
        where: { isDeleted: false, id: element.productId },
        include: [
          {
            model: db.category,
            as: "category",
          },
        ],
      });

      obj.product = product;

      finalResponse.rows.push(obj);
    }

    return finalResponse;
  }
}

async function listById(id, user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  if (
    await db.stock.findOne({
      where: { id: id },
    })
  ) {
    const list = db.stock.findAndCountAll({
      limit: limit || 5,
      offset: offset || 0,
      where: { id: id, isDeleted: false },
      order: [["updatedAt", "DESC"]],
    });

    if (list) {
      return list;
    }
  } else {
    throw new Error("stock does not exists");
  }
}

async function listByFilter(user, size, page, productId, fromDate, toDate) {
  let sqlQuery = {
    isDeleted: false,
  };

  if (productId) {
    sqlQuery.productId = productId;
  }

  if (fromDate) {
    if (toDate) {
      sqlQuery = {
        ...sqlQuery,
        stockDate: {
          [Op.between]: [fromDate, toDate], // Replace 'agendaDate' with your actual date field name
        },
      };
    } else {
      sqlQuery = {
        ...sqlQuery,
        stockDate: {
          [Op.gte]: fromDate, // Greater than or equal to 'fromDate'
        },
      };
    }
  }
  let limit = parseInt(size);
  let offset = parseInt(page);

  console.log("sqlQuery: ", sqlQuery);
  const list = db.stock.findAndCountAll({
    limit: limit || 5,
    offset: offset || 0,
    where: sqlQuery,
    order: [["updatedAt", "DESC"]],
  });
  if (list) {
    return list;
  }
}

const getCount = async () => {
  return await db.stock.count();
};

module.exports = {
  register,
  getCount,
  list,
  listById,
  listByFilter,
};
