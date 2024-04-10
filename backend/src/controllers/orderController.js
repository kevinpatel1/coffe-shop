const orderService = require("../services/orderService");

const orderGetAll = (req, res) => {
  orderService
    .list(
      req.user,
      req.query.size,
      req.query.page,
      req.query.fromDate,
      req.query.toDate,
      req.query.userId
    )
    .then((order) => {
      res.status(200).send({
        status: 200,
        data: order,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};
module.exports = {
  orderGetAll,
};
