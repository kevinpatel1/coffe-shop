const express = require("express");
const app = express();

app.use("/user", require("./userRoute"));

module.exports = app;
