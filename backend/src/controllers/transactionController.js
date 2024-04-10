const transactionService = require("../services/transactionService");

const transactionGetAll = (req, res) => {
  transactionService
    .list(
      req.user,
      req.query.size,
      req.query.page,
      req.query.fromDate,
      req.query.toDate,
      req.query.userId
    )
    .then((transaction) => {
      res.status(200).send({
        status: 200,
        data: transaction,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};
module.exports = {
  transactionGetAll,
};
