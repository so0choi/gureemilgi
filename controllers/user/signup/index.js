const { Router } = require("express");
const router = Router();
const ctrl = require("./signup.ctrl");

router.get("/", ctrl.get_signup);
router.post("/", ctrl.post_signup);

module.exports = router;
