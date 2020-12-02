const { Router } = require("express");
const router = Router();
const ctrl = require("./signin.ctrl");

router.get("/", ctrl.get_signin);
router.post("/", ctrl.post_signin);

module.exports = router;
