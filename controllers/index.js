const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("index.html");
});

router.use("/user", require("./user"));

module.exports = router;
