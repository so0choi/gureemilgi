const mysql = require("../../db");
// const crypto = require("crypto");

exports.get_signup = (req, res) => {
  res.render("register.html", {isRegister: false});
};

async function registerUser(id, pwd, name) {
  const connection = await mysql.connection();
  try{
    console.log("at querySignUp...");
    let idDupCheck = await connection.query("select count(*) from users where userid = ?", id);
    if (idDupCheck) { //id 중복
      return false;
    }
    await connection.query("INSERT INTO users SET ?", [id, pwd, name]);
    return true;
  } catch(err) {
    throw err;
  } finally {
    await connection.release();
  }
}

exports.post_signup = (req, res) => {
  const { email, password, fullname } = req.body;
  let querySignUp = await registerUser(email, password, fullname);
  if (querySignUp){
    res.send('<script>alert("You are now registered!"); window.location.href = "/signin"; </script>');
  }
};