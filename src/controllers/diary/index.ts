const { Router } = require("express");
const router = Router();
const ctrl = require("./diary.ctrl");

router.get("/", ctrl.get_diary_list_page);
router.get("/draw", ctrl.get_diary_draw_page);
router.post("/draw", ctrl.post_diary_draw);
router.post("/deatil/:id", ctrl.get_diary_detail);

module.exports = router;
