const getConnection = require("../../db");

exports.get_signup = (req, res) => {
  res.render("register.html", {isRegister: false});
};

function createUser(id, pwd, name) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO USERS(userid, password, name) VALUES ('${id}','${pwd}','${name}');`;
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
  
  //회원가입 성공
  if (createUser(inputId, inputPwd, inputName)) {
    res.render('/signup', {isRegister: false});
  }
  else {
    res.render('/signup', {isRegister: false});
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