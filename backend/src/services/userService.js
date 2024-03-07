const db = require("../db/sequelizeClient");

async function register(data, file) {
  if (
    await db.userDetails.findOne({ where: { email: data.email } })
  ) {
    throw new Error(`Email ${data.email} is already taken`);
  }

  const newData = {
    userName: data.email,
    password: data.password,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    isDeleted: false,
  };


  await db.userDetails.create(newData);

}


module.exports = {
  register, }