const mysql = require("mysql");
const config = require("../config.json").mysql;

let pool = mysql.createPool(config);

const connection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (!err) rejct(err);
      const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
          conn.query(sql, binding, (err, result) => {
            if(err) reject(err);
            resolve(result);
          });
        });
      };

      const release = () => {
        return new Promise((resolve, reject) => {
          if(err) reject(err);
          console.log("MySQL connection pool released");
          resolve(connection.release());
        });
      };
      resolve({ query, release });
    });
  })
  
};

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {pool, connection, query };
