const db = require("../db/sequelizeClient");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/mail");

async function register(data) {
  if (await db.userDetails.findOne({ where: { email: data.email } })) {
    throw new Error(`Email ${data.email} is already taken`);
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(data.Password, salt);
  const newData = {
    userName: data.email,
    password: passwordHash,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: "customer",
    isDeleted: false,
    isActive: false,
  };

  await db.userDetails.create(newData);

  const token = jwt.sign(
    {
      email: data.email,
    },
    "secret_key"
  );
  sendEmail(
    data.email,
    "Verification Link",
    `Click On Below Link to Verify Your Account <br >  <a href="http://localhost:3006/api/verification/${token}" > Verify </a>`
  );
}

async function verifyRegisterLink(data) {
  console.log("asdsd", data.token);

  try {
    const decoded = jwt.verify(data.token, "secret_key");
    console.log(decoded, "decoded");
    let userData = await db.userDetails.findOne({
      where: { email: decoded.email, isActive: false, isDeleted: false },
    });
    console.log("userData: ", userData);
    if (userData) {
      let updateData = {
        isActive: true,
      };
      db.userDetails.update(updateData, {
        where: { id: userData.id },
      });
    } else {
      throw new Error(`User Does not Exists`);
    }
  } catch (err) {
    throw new Error(`Invalid Token`);
  }
  // }
}

async function list(user, size, page) {
  let limit = parseInt(size);
  let offset = parseInt(page);
  const sqlQuery = {
    where: { isDeleted: false },
    order: [["updatedAt", "DESC"]],
  };

  if (limit) {
    sqlQuery.limit = limit;
    sqlQuery.offset = offset;
  }

  const list = await db.userDetails.findAndCountAll(sqlQuery);

  if (list) {
    let filtered = list?.rows?.filter(
      (er) => er?.userName !== "admin@gmail.com"
    );

    return {
      count: list.count - 1,
      rows: filtered,
    };
  }
}

module.exports = {
  register,
  verifyRegisterLink,
  list,
};
