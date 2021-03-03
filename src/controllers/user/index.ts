import Router from "express";

const router = Router();
const ctrl = require("./user.ctrl");

// TODO: make class
router.get("/register", ctrl.get_register_page);
router.post("/register", ctrl.post_register);
router.get("/login", ctrl.get_login_page);
router.post("/login", ctrl.post_login);
router.post("/logout", ctrl.post_logout);
router.post("/validation", ctrl.post_validation);

module.exports = router;
