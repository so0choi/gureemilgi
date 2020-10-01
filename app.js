const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const logger = require("morgan");
const config = require("./config.json");

class App {
  constructor() {
    this.app = express();
    this.setConfigure();
    this.setViewEngine();
    this.setMiddleware();
    this.setLocals();
    this.getRouting();
    this.render404();
    this.render500();
  }

  setConfigure() {
    this.app.set("port", config.port);
    this.app.set("dbConfig", config.mysql);
  }

  setViewEngine() {
    nunjucks.configure("views", {
      autoescape: true,
      express: this.app,
    });
  }

  setMiddleware() {
    // static asset path
    this.app.use(express.static("public"));
    this.app.use(logger("dev"));
    //bodyparser
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
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
