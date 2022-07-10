require('dotenv').config()
const { Pool } = require("pg");

const credentials = require("./credentials")

async function getPosts() {
  const pool = new Pool(credentials);
  const posts = await pool.query("SELECT * FROM posts");
  await pool.end();
  return posts.rows;
}

async function insertPost(mail) {
  const pool = new Pool(credentials);
  const text = `INSERT INTO posts (id, name, publisher, content, photo) VALUES (default, $1, $2, $3, $4)`;
  const values = [mail.name, mail.publisher, mail.content, mail.photo];
  response = await pool.query(text, values);
  await pool.end();
  return values;
}


module.exports = {
  getPosts,
  insertPost
}