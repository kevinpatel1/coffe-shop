const config = require("config");
const mysql = require("mysql");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
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

    language: "en",
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("connected to mysql");
    })
    .catch((err) => {
      console.log(err);
    });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  db.userDetails = require("../models/userDetailsModel")(sequelize);

 
  await sequelize.sync().catch((err) => {
    console.log(
      err,
      "#########################################################################################################################################################################################################################"
    );
  });

  
}
