const db = require("../../models");
const crypto = require("crypto");

exports.post_login = (req, res) => {
  res.send(req.body);
};
exports.get_login_page = (_, res) => {
  res.render("login.html");
};

exports.get_register_page = (_, res) => {
  res.render("register.html");
};

// exports.post_validation = async (req, res) => {
//   const { email } = req.body;
//   const checkEmailValidation = await db.User.findOne({ where: { email } });
//   if (checkEmailValidation) {
//     res.send(JSON.stringify({ result: false }));
//   } else {
//     res.send(JSON.stringify({ result: true }));
//   }
// };

exports.post_register = async (req, res) => {
  const { name, email, password } = req.body;
  const cryptoPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  let message, redirectUrl;
  try {
    await db.User.create({ name, email, cryptoPassword });
    res.send(
      `<script>alert('${message}');window.location.href='/user/login'</script>`
    );
  } catch (err) {
    console.error("DB insert err >> ", err);
  }
};

exports.post_logout = (req, res) => {
  res.send(req.body);
};
