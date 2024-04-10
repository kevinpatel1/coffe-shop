const express = require("express");
const app = express();

app.use("/user", require("./userRoute"));
app.use("/category", require("./categoryRoute"));
app.use("/product", require("./productRoute"));
app.use("/stock", require("./stockRoute"));
app.use("/payment", require("./paymentRoute"));
app.use("/transaction", require("./transactionRoute"));
app.use("/order", require("./orderRoute"));

module.exports = app;
