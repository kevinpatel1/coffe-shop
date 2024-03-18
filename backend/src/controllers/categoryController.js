const categoryService = require("../services/categoryService");

const categoryAdd = (req, res) => {
  console.log("req.body, req.user: ", req.body, req.user);
  categoryService
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

const categoryGetAll = (req, res) => {
  categoryService
    .list(req.user, req.query.size, req.query.page)
    .then((category) => {
      res.status(200).send({
        status: 200,
        data: category,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const categoryGetAllFilter = (req, res) => {
  const { name } = req.query;

  categoryService
    .listByFilter(req.user, req.params.size, req.params.page, name)
    .then((category) => {
      res.status(200).send({
        status: 200,
        data: category,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

const categoryUpdate = (req, res) => {
  const id = req.params.id;
  categoryService
    .update(req.body, id, req.user)
    .then((category) => {
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

const categoryGetById = (req, res) => {
  categoryService
    .listById(req.params.id, req.user)
    .then((category) =>
      res.send({
        status: 200,
        data: category,
      })
    )
    .catch((err) =>
      res.status(400).send({
        status: 400,
        err_msg: err.message,
      })
    );
};

const categoryDelete = (req, res, next) => {
  const id = req.params.id;

  categoryService
    .soft_delete(id, req.user)
    .then((category) =>
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
  categoryAdd,
  categoryGetAll,
  categoryGetById,
  categoryUpdate,
  categoryDelete,
  categoryGetAllFilter,
};
