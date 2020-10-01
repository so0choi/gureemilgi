const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("index.html");
});
router.use("/login", require("./user/login"));
router.use("/signup", require("./user/signup"));

module.exports = router;
