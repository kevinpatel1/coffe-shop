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
      email: "dweep8850@gmail.com",
      password: "gdnwlxqtwexuwywa",
    },
  },

  db: {
    host: "118.139.180.148",
    port: "3306",
    user: "coffeeshop",
    password: "_6STOkaFm~1?",
    database: "coffeeshop",
  },

  uploads: {
    file_path: "uploads",
  },
};
