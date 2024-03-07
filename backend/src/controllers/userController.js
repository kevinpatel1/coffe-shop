const userService = require("../services/userService");

const userRegister = (req, res) => {
  
    userService
      .register(req.body)
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


module.exports = {
  userRegister,
};