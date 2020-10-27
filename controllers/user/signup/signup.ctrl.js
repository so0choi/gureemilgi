const getConnection = require("../../db");

exports.get_signup = (req, res) => {
  res.render("register.html");
};

function createUser(id, pwd, name) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO USER(id, pwd, name) VALUES ('${id}','${pwd}','${name}');`;
    console.log(sql);
    getConnection((conn) => {
      conn.query(sql, (err, result) => {
        conn.release();
        if (err) reject(err);
        resolve(true);
      });
    });
  });
}

exports.post_signup = (req, res) => {
  console.log(req.body);
  const { id, pwd, name } = req.body;
  if (createUser(id, pwd, name)) {
    console.log("success");
    res.render("register.html");
  }
};
