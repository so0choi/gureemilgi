const { Router } = require("express");
const router = Router();
const ctrl = require("./login.ctrl");

router.get("/", ctrl.get_login);
router.post("/", ctrl.post_login);

module.exports = router;
