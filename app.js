const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");

const router = require("./router/main")(app);

// nunjucks setting
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// static asset path setting
app.use(express.static("public"));

// body parser setting
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);

const server = app.listen(3000, function () {
  console.log("Express server has started on port 3000");
});
