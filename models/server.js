const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Available endpoints
    this.usersEndpoint = "/api/users";

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

  middlewares() {
    // Public directory
    this.app.use(express.static("public"));

    // Cors
    this.app.use(cors());

    // Read and parse requests' body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersEndpoint, require("../routes/users_routes"));
  }
}

module.exports = Server;
