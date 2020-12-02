"use strict";

exports.get_login = (req, res) => {
  res.render("login.html");
};

exports.post_login = (req, res) => {
  const id = req.body.
  res.send("hi");
};
