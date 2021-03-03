const db = require("../../../models");
const crypto = require("crypto");

exports.post_login = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const cryptoPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");

  db.User.findOne({
    where: { email, password: cryptoPassword },
    attributes: ["name"],
  }).then((user) => {
    if (user) {
      console.log("Login Success");
    } else {
      console.log("Login Failed");
    }
  });
  res.send(req.body);
};
exports.get_login_page = (_, res) => {
  res.render("login.html");
};

exports.get_register_page = (_, res) => {
  res.render("register.html");
};

exports.post_validation = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.User.findOne({
      where: { email },
      attributes: ["id"],
      raw: true,
    });
    if (user === null) {
      console.log("NOT FOUND!");
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.post_register = async (req, res) => {
  const { name, email, password } = req.body;
  const cryptoPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");
  console.log(cryptoPassword);
  let message = "Successfuly signed up";
  try {
    await db.User.create({ name, email, password: cryptoPassword });
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
