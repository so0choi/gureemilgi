const { Router } = require("express");
const router = Router();
const ctrl = require("./user.ctrl");

router.get("/register", ctrl.get_register_page);
router.post("/register", ctrl.post_register);
router.get("/login", ctrl.get_login_page);
router.post("/login", ctrl.post_login);
router.post("/logout", ctrl.post_logout);
// router.post("/vaidation", ctrl.post_validation);

module.exports = router;
