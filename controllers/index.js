const { Router } = require("express");
const router = Router();

router.use("/", (req, res) => {
  res.renderr("index.html");
});

router.use("/register", require("./register"));

module.exports = router;
