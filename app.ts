import * as express from "express";
import * as bodyParser from "body-parser";
import * as nunjucks from "nunjucks";

const logger = require("morgan");
const db = require("./models");

class App {
  public app: express.Application;

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

  private setDbConnection() {
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

  private setMiddleware() {
    this.app.use(logger("dev"));
    //bodyparser
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }
  private setViewEngine() {
    nunjucks.configure("public/views", {
      autoescape: true,
      express: this.app,
    });
  }
  private setStatic() {
    this.app.use(express.static("public"));
  }

  private setLocals() {
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = false;
      next();
    });
  }

  private getRouting() {
    this.app.use(require("./controllers"));
  }

  private render404() {
    this.app.use((req, res) => {
      res.status(404).render("common/404.html");
    });
  }
  private render500() {
    this.app.use((req, res) => {
      res.status(500).render("common/500.html");
    });
  }

  public listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log("Express is listening on port", process.env.PORT || 3000);
    });
  }
}

export default App;
