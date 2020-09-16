const { Router } = require("express");
const router = Router();

// 회원가입 페이지 출력
exports.get_register = (_, res) => res.render("register.html");

exports.post_register = (req, res) => {
  // 회원가입 로직 작성
};
