const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const config = require("./config.json");
const router = require("./router/main")(app);

class App {
  constructor() {
    this.app = express();
    this.setViewEngine();
  }
}

// nunjucks setting
const setViewEngine = () => {
  nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });
};

const setMiddleware = () => {
  // static asset path
  app.use(express.static("public"));

  //bodyparser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json);
};

app.configure("development", function () {
  app.use(express.errorHandler());
});

const server = app.listen(config.port, function () {
  console.log("Express server has started on port 3000");
});
