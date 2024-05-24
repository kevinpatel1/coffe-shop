const stockService = require("../services/stockService");

const stockAdd = (req, res) => {
  console.log("req.body, req.user: ", req.body, req.user);
  stockService
    .register(req.body, req.user)
    .then(() =>
      res.status(200).send({
        status: 200,
        data: "You have been registered successfully!.",
      })
    )
    .catch((err) =>
      res.status(400).send({
        err_msg: err.message,
      })
    );
};

const stockGetAll = (req, res) => {
  stockService
    .list(req.user, req.query.size, req.query.page)
    .then((stock) => {
      res.status(200).send({
        status: 200,
        data: stock,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const stockGetAllFilter = (req, res) => {
  const { productId, fromDate, toDate } = req.query;

  stockService
    .listByFilter(
      req.user,
      req.query.size,
      req.query.page,
      productId,
      fromDate,
      toDate
    )
    .then((stock) => {
      res.status(200).send({
        status: 200,
        data: stock,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const stockGetById = (req, res) => {
  stockService
    .listById(req.params.id, req.user)
    .then((stock) =>
      res.send({
        status: 200,
        data: stock,
      })
    )
    .catch((err) =>
      res.status(400).send({
        status: 400,
        err_msg: err.message,
      })
    );
};

module.exports = {
  stockAdd,
  stockGetAll,
  stockGetById,
  stockGetAllFilter,
};
