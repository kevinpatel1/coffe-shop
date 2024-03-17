module.exports = {
  api: {
    port: 3006,
    root: "/api",
  },

  auth: {
    jwt: {
      secret: "jwt_secret",
      expiresIn: "24 * 60 * 60",
    },
    mail: {
      email: "kevinwebmyne@gmail.com",
      password: "zzmgzpokkrnlnylz",
    },
  },

  db: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "coffeeshop",
  },

  uploads: {
    file_path: "uploads",
  },
};
