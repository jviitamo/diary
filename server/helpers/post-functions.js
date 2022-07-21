require('dotenv').config()
const { Pool } = require("pg");

const credentials = require("./credentials")

async function getPosts(user) {

    const pool = new Pool(credentials);

    let params = []
    let baseSqlQuery = ""
    if (typeof user.username !== 'undefined' && typeof user.location !== 'undefined') {
      baseSqlQuery = "SELECT * FROM posts WHERE location=$1 AND creator=$2"
      params = [user.location, user.username]
    } else if (typeof user.location == 'undefined' && typeof user.username !== 'undefined') {
      baseSqlQuery = "SELECT * FROM posts WHERE creator=$1"
      params = [user.username]
    } else if (typeof user.username == 'undefined' && typeof user.location !== 'undefined') {
      baseSqlQuery = "SELECT * FROM posts WHERE location=$1"
      params = [user.location]
    } else {
      baseSqlQuery = "SELECT * FROM posts"
      params = []
    }
    
    const posts = await pool.query(baseSqlQuery, params);
    await pool.end();
    return posts.rows;
}

async function insertPost(post, user) {
  const pool = new Pool(credentials);
  const text = `INSERT INTO posts (id, name, publisher, content, photo, creator, location) VALUES (default, $1, $2, $3, $4, $5, $6)`;
  const values = [post.name, post.publisher, post.content, post.photo, user.username, user.location];
  response = await pool.query(text, values);
  await pool.end();
  return values;
}


module.exports = {
  getPosts,
  insertPost
}