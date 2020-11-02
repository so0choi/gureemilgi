const getConnection = require("../../db");

exports.get_signup = (req, res) => {
  res.render("register.html");
};

function createUser(id, pwd, name) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO USERS(id, pwd, name) VALUES ('${id}','${pwd}','${name}');`;
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
  const { inputId, inputPwd, inputName } = req.body;
  
  if (createUser(inputId, inputPwd, inputName)) {
    console.log("success");
    res.render("register.html");
  }
};

exports.post_checkId = (req, res) => {
  const inputId = req.body.inputId || '';
  const sql = `select * from users where userid = ?`;
  getConnection((conn => {
    conn.query(sql, inputId, (err, result) => {
      conn.release();
      if (err) console.error('ID 중복 검사 에러:',err);
      if (result[0]) res.json({result: false}); //중복
      else res.json({result: true}); //사용가능
    })
  }))
}