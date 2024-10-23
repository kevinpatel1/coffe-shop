const db = require("../db/sequelizeClient");
const { Op } = require("sequelize");

async function register(data, file, user) {
  if (
    await db.category.findOne({
      where: {
        categoryName: data.categoryName,
      },
    })
  ) {
    throw new Error("Category already exists");
  }
  const newData = {
    categoryName: data.categoryName,
    isDeleted: false,
  };

  if (file) {
    newData.image = file.filename;
  }

  let addData = await db.category.create(newData);
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

  const list = db.category.findAndCountAll(sqlQuery);

  if (list) {
    return list;
  }
}

async function listById(id, user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  if (
    await db.category.findOne({
      where: { id: id },
    })
  ) {
    const list = db.category.findAndCountAll({
      limit: limit || 5,
      offset: offset || 0,
      where: { id: id, isDeleted: false },
      order: [["updatedAt", "DESC"]],
    });

    if (list) {
      return list;
    }
  } else {
    throw new Error("Category does not exists");
  }
}

async function listByFilter(user, size, page, categoryName) {
  let sqlQuery = {
    isDeleted: false,
  };

  if (categoryName) {
    sqlQuery.categoryName = { [Op.like]: `%${categoryName}%` };
  }

  let limit = parseInt(size);
  let offset = parseInt(page);

  const list = db.category.findAndCountAll({
    limit: limit || 5,
    offset: offset || 0,
    where: sqlQuery,
    order: [["updatedAt", "DESC"]],
  });
  if (list) {
    return list;
  }
}

async function update(data, id, file, user) {
  let checkCategory = await db.category.findOne({
    where: { id: id },
  });
  if (checkCategory) {
    if (checkCategory.categoryName !== data.categoryName) {
      if (
        await db.category.findOne({
          where: { categoryName: data.categoryName, isDeleted: false },
        })
      ) {
        throw new Error("Category Name already exists");
      }
    }

    const newData = {
      categoryName: data.categoryName,
    };

    if (file) {
      newData.image = file.filename;
    }

    await db.category.update(newData, {
      where: { id: id },
    });
  } else {
    throw new Error("Category does not exists");
  }
}

async function soft_delete(id, user) {
  if (
    await db.category.findOne({
      where: { id: id },
    })
  ) {
    const checkId = await db.product.findOne({
      where: { categoryId: id, isDeleted: false },
    });
    if (!checkId) {
      const newData = {
        isDeleted: true,
      };

      await db.category.update(newData, {
        where: { id: id },
      });
    } else {
      throw new Error("Record Cannot Be Deleted!");
    }
  } else {
    throw new Error("Category does not exists");
  }
}

const getCount = async () => {
  return await db.category.count();
};

module.exports = {
  register,
  update,
  soft_delete,
  getCount,
  list,
  listById,
  listByFilter,
};
