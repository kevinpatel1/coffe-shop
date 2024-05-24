const config = require("config");
const { key_id, key_secret } = config.get("payment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const paymentOrder = async (req, res) => {
  console.log("req.body: ", req.body);

  const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });

  const options = {
    amount: parseInt(req.body.amount) * 100,
    currency: "INR",
    receipt: `order_receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      status: 200,
      response,
    });
  } catch (err) {
    res.status(400).send("Not able to create order. Please try again!");
  }
};

const verifyOrder = async (req, res) => {
  console.log("req.body: ", req.body);
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === req.body.razorpay_signature;

  if (isAuthentic) {
    let newOrderData = {
      userId: req.user?.userId,
      productDetails: JSON.stringify(req.body?.orderDetails),
      finalAmount: req.body?.finalAmount,
      taxAmount: req.body?.taxValue,
      totalPrice: req.body?.totalPrice,
      address: req.body.userDetails?.postalCode
        ? req.body.userDetails?.address
          ? req.body.userDetails?.address +
            "," +
            req.body.userDetails?.city +
            "," +
            req.body.userDetails?.state +
            "," +
            req.body.userDetails?.postalCode
          : req.body.userDetails?.city +
            "," +
            req.body.userDetails?.state +
            "," +
            req.body.userDetails?.postalCode
        : req.body.userDetails?.address
        ? req.body.userDetails?.address +
          "," +
          req.body.userDetails?.city +
          "," +
          req.body.userDetails?.state
        : req.body.userDetails?.city + "," + req.body.userDetails?.state,
      isDeleted: false,
    };

    let addData = await db.order.create(newOrderData);

    if (addData) {
      let newTransactionData = {
        userId: req.user?.userId,
        orderId: addData.id,
        paymentId: req.body.razorpay_payment_id,
        price: req.body.finalAmount,
        isDeleted: false,
      };

      let addTranscatoionData = await db.transaction.create(newTransactionData);

      for (let index = 0; index < req.body?.orderDetails.length; index++) {
        const element = req.body?.orderDetails[index];

        let getOldStockDetails = await db.stock.findOne({
          where: { productId: element.id },
          order: [["updatedAt", "DESC"]],
        });
        console.log("getOldStockDetails: ", getOldStockDetails);

        let newStockData = {
          productId: element.id,
          openingBalance: getOldStockDetails.closingBalance,
          qty: element.quantity,
          stockDate: new Date(),
          closingBalance:
            +getOldStockDetails?.closingBalance - +element.quantity,
          transactionType: "Outward",
          isDeleted: false,
        };

        let addDataStock = await db.stock.create(newStockData);
      }
    }

    let newUserData = {
      phoneNo: req.body.userDetails?.phoneNo,
      address: req.body.userDetails?.address,
      city: req.body.userDetails?.city,
      state: req.body.userDetails?.state,
      postalCode: req.body.userDetails?.postalCode,
    };

    db.userDetails.update(newUserData, {
      where: { id: req.user.userId },
    });

    res.json({
      status: 200,
      message: "Signature is Valid",
    });
  } else {
    res.json({
      status: 200,
      message: "Signature is Not  Valid",
    });
  }
};

module.exports = {
  paymentOrder,
  verifyOrder,
};
