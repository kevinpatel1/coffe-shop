const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");
require("./db/sequelizeClient");
const app = express();
const { verifyToken } = require("./utils/auth");
const { port, root } = config.get("api");
const userController = require("./controllers/userController");

const route = require("./routes/index");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.post(`${root}/register`, userController.userRegister);
app.get(`${root}/verification/:token`, userController.verifyRegisterLink);
app.post(`${root}/login`, userController.userLogin);
app.post(`${root}/admin/login`, userController.adminUserLogin);

app.use(`${root}`, route);
app.get("/", (req, res) => {
  console.log("asdsad");
  res.send("Products Backend!");
});
// process.on("unhandledRejection", (error) => {
//   // Will print "unhandledRejection err is not defined"
//   console.log("unhandledRejection", error.message);
// });

const http = require("http").Server(app);
http.listen(`${port}`, () => {});

console.log(`Server Start Listening ${port}`);
