const getConnection = require("../../db");

exports.get_signup = (req, res) => {
  res.render("register.html");
};

exports.post_signup = (req, res) => {
  const id = req.body.id;
  console.log(id);
  getConnection((conn) => {
    console.log("hi");
    conn.release();
  });
};
