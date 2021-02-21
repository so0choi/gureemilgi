const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const logger = require("morgan");
const db = require("./models");

class App {
  constructor() {
    this.app = express();
    this.setDbConnection();
    this.setViewEngine();
    this.setMiddleware();
    this.setStatic();
    this.setLocals();
    this.getRouting();
    this.render404();
    this.render500();
  }

  setDbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        return db.sequelize.sync();
      })
      .then(() => {
        console.log("DB Sync complete.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }

  setMiddleware() {
    this.app.use(logger("dev"));
    //bodyparser
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
  setViewEngine() {
    nunjucks.configure("public/views", {
      autoescape: true,
      express: this.app,
    });
  }
  setStatic() {
    this.app.use(express.static("public"));
  }

  setLocals() {
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = false;
      next();
    });
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  render404() {
    this.app.use((req, res) => {
      res.status(404).render("common/404.html");
    });
  }
  render500() {
    this.app.use((req, res) => {
      res.status(500).render("common/500.html");
    });
  }
}

module.exports = new App().app;
