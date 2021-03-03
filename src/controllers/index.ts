const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("index.html");
});

router.use("/user", require("./user"));
router.use("/diary", require("./diary"));

module.exports = router;
