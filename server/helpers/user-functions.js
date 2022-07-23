require('dotenv').config()
const { Pool } = require("pg");

const credentials = require("./credentials")

async function getUsers(user) {

    const pool = new Pool(credentials);

    let params = []
    let baseSqlQuery = ""
    if (typeof user.username !== 'undefined' && typeof user.location !== 'undefined') {
      baseSqlQuery = "SELECT * FROM users WHERE location=$1 AND username=$2"
      params = [user.location, user.username]
    } else if (typeof user.location == 'undefined' && typeof user.username !== 'undefined') {
      baseSqlQuery = "SELECT * FROM users WHERE username=$1"
      params = [user.username]
    } else if (typeof user.username == 'undefined' && typeof user.location !== 'undefined') {
      if (user.location == 'null') {
        baseSqlQuery = "SELECT * FROM users WHERE location IS NULL"
        params = []
      } else {
        baseSqlQuery = "SELECT * FROM users WHERE location=$1"
        params = [user.location]
      }
    } else {
      baseSqlQuery = "SELECT * FROM users"
      params = []
    }
    const users = await pool.query(baseSqlQuery, params);
    await pool.end();
    if (users.rows.length = 1) {
        return users.rows
    } else return users.rows;
}


module.exports = {
  getUsers
}