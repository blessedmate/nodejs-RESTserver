const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/db-config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Available endpoints
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      users: "/api/users",
      products: "/api/products",
    };

    // DB connection
    this.connectDB();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Public directory
    this.app.use(express.static("public"));

    // Cors
    this.app.use(cors());

    // Read and parse requests' body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth_routes"));
    this.app.use(this.paths.categories, require("../routes/categories_routes"));
    this.app.use(this.paths.users, require("../routes/users_routes"));
    this.app.use(this.paths.products, require("../routes/products_routes"));
  }
}

module.exports = Server;
