const mysql = require("mysql");
const config = require("../config.json").mysql;

let pool = mysql.createPool(config);

const getConnection = (callback) => {
  pool.getConnection((err, conn) => {
    if (!err) {
      callback(conn);
    } else {
      throw err;
    }
  });
};

module.exports = getConnection;
