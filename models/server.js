const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

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

  routes() {
    this.app.get("/api", (req, res) => {
      res.send("Hello World");
    });
  }

  middlewares() {
    // Public directory
    this.app.use(express.static("public"));
  }
}

module.exports = Server;
