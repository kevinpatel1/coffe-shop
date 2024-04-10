const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");
async function list(user, size, page, fromDate, toDate, userId) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: db.userDetails,
        as: "user",
      },
    ],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  if (fromDate) {
    if (toDate) {
      sqlQuery.where = {
        ...sqlQuery.where,
        createdAt: {
          [Op.between]: [fromDate, toDate], // Replace 'agendaDate' with your actual date field name
        },
      };
    } else {
      sqlQuery.where = {
        ...sqlQuery.where,
        createdAt: {
          [Op.gte]: fromDate, // Greater than or equal to 'fromDate'
        },
      };
    }
  }

  if (userId) {
    sqlQuery.where.userId = userId;
  }

  const list = db.order.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

module.exports = {
  list,
};
