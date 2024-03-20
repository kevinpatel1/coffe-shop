const express = require("express");
const app = express();

app.use("/user", require("./userRoute"));
app.use("/category", require("./categoryRoute"));
app.use("/product", require("./productRoute"));
app.use("/stock", require("./stockRoute"));

module.exports = app;
