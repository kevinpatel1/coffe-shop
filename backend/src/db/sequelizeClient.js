const config = require("config");
const mysql = require("mysql");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.db;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  var sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    logging: false,
    maxConcurrentQueries: 100,
    dialect: "mysql",
    // dialectOptions: {
    //   ssl: "Amazon RDS",
    // },
    dialectOptions: {
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      // },
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: "en",
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.userDetails = require("../models/userDetailsModel")(sequelize);
  db.category = require("../models/categoryModel")(sequelize);
  db.stock = require("../models/stockModel")(sequelize);
  db.product = require("../models/productModel")(sequelize);

  await sequelize.sync().catch((err) => {
    console.log(
      err,
      "#########################################################################################################################################################################################################################"
    );
  });
}
