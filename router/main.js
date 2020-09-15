module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.html");
  });
  app.get("/register", (req, res) => {
    res.render("register.html");
  });

  app.post("/login", (req, res) => {
    // do login logic

    res.render("list.html");
  });
  app.get("/list", function (req, res) {
    res.render("list.html");
  });
};
