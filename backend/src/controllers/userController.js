const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = (req, res) => {
  console.log("req.body: ", req.body);

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
const userLogin = async (req, res) => {
  var username = req.body.username;
  var pass = req.body.password;

  let checkuser = await db.userDetails.findOne({ where: { email: username } });
  if (checkuser) {
    if (checkuser.isActive) {
      let loginDetail = {};
      bcrypt.compare(pass, checkuser.password, async function (err, results) {
        if (err) {
          console.log("error", err);
        }
        if (results == true) {
          const token = jwt.sign(
            {
              userId: checkuser.id,
              email: checkuser.email,
              name: checkuser.firstName + checkuser.lastName,
              role: "customer",
            },
            "secret_key"
          );

          res.json({
            status: true,
            message: "Login Successfully",
            data: {
              userDetails: checkuser,
              token: token,
            },
          });
        }
      });
      console.log(loginDetail, "loginDetail");
    } else {
      res.json({
        status: false,
        message: "User is Not Active. Please Verify the Account!",
      });
    }
  } else {
    res.json({
      status: false,
      message: "user Does Not Exists!",
    });
  }
};

const verifyRegisterLink = (req, res) => {
  console.log("req.params: ", req.params);
  userService
    .verifyRegisterLink(req.params)
    .then(() =>
      res.status(200).send({
        status: 200,
        data: "Verify Successfully",
      })
    )
    .catch((err) =>
      res.status(400).send({
        err_msg: err.message,
      })
    );
};

const adminUserLogin = async (req, res) => {
  var username = req.body.username;
  var pass = req.body.password;

  let checkuser = await db.userDetails.findOne({
    where: { email: username, role: "admin", isDeleted: false },
  });
  console.log("checkuser: ", checkuser);
  if (checkuser) {
    if (checkuser.isActive) {
      let loginDetail = {};
      bcrypt.compare(pass, checkuser.password, async function (err, results) {
        if (err) {
          console.log("error", err);
        }
        if (results == true) {
          const token = jwt.sign(
            {
              userId: checkuser.id,
              email: checkuser.email,
              name: checkuser.firstName + checkuser.lastName,
              role: "admin",
            },
            "secret_key"
          );

          res.json({
            status: true,
            message: "Login Successfully",
            data: {
              userDetails: checkuser,
              token: token,
            },
          });
        }
      });
      console.log(loginDetail, "loginDetail");
    } else {
      res.json({
        status: false,
        message: "User is Not Active. Please Verify the Account!",
      });
    }
  } else {
    res.json({
      status: false,
      message: "user Does Not Exists!",
    });
  }
};

const userGetAll = (req, res) => {
  userService
    .list(req.user, req.query.size, req.query.page, req.query.name)
    .then((user) => {
      res.status(200).send({
        status: 200,
        data: user,
      });
    })
    .catch((err) => {
      res.status(400).send({
        err_msg: err.message,
      });
    });
};

module.exports = {
  userRegister,
  verifyRegisterLink,
  userLogin,
  adminUserLogin,
  userGetAll,
};
