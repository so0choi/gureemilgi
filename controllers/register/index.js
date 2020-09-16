const { Router } = require("express");
const router = Router();
var ctrl = require("./register");

router.get("/register", (req, res) => ctrl.get_register);
router.post("/register", (req, res) => ctrl.post_register);

module.exports = router;
