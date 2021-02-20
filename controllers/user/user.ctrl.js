exports.post_login = (req, res) => {
  res.send(req.body);
};
exports.get_login_page = (_, res) => {
  res.render("login.html");
};

exports.get_register_page = (_, res) => {
  res.render("register.html");
};

exports.post_register = (req, res) => {
  res.send(req.body);
};

exports.post_logout = (req, res) => {
  res.send(req.body);
};
