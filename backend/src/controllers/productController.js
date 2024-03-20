const productService = require("../services/productService");

const productAdd = (req, res) => {
  productService
    .register(req.body, req.file, req.user)
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

const productGetAll = (req, res) => {
  productService
    .list(req.user, req.query.size, req.query.page)
    .then((product) => {
      res.status(200).send({
        status: 200,
        data: product,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};
const productGetAllByCategoryId = (req, res) => {
  productService
    .listByCategoryId(
      req.query.categoryId,
      req.user,
      req.query.size,
      req.query.page
    )
    .then((product) => {
      res.status(200).send({
        status: 200,
        data: product,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const productUpdate = (req, res) => {
  const id = req.params.id;
  productService
    .update(req.body, id, req.file, req.user)
    .then((product) => {
      res.status(200).send({
        status: 200,
        data: "Your Data has been Updated",
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const productDelete = (req, res, next) => {
  const id = req.params.id;

  productService
    .soft_delete(id, req.user)
    .then((product) =>
      res.status(200).send({
        status: 200,
        data: " Data has been deleted ! ",
      })
    )
    .catch((err) =>
      res.status(400).send({
        err: err.message,
      })
    );
};

module.exports = {
  productAdd,
  productGetAll,
  productUpdate,
  productDelete,
  productGetAllByCategoryId,
};
