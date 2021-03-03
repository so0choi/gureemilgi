const db = require("../../../models");

exports.get_diary_list_page = async (req, res, next) => {
  res.render("diary.html");
};

exports.get_diary_draw_page = async (req, res, next) => {
  res.render("draw.html");
};

exports.post_diary_draw = async (req, res, next) => {
  res.send(req);
};

exports.get_diary_detail = async (req, res, next) => {
  res.render("detail.html");
};
