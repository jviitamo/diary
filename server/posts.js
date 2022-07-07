require('dotenv').config()
const { Pool } = require("pg");

const credentials = {
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
};


async function getPosts() {
  const pool = new Pool(credentials);
  const posts = await pool.query("SELECT * FROM posts");
  await pool.end();
  console.log(posts)
  return posts.rows;
}

async function insertPost(mail) {
  const pool = new Pool(credentials);
  const text = `INSERT INTO posts (id, name, publisher, content, photo) VALUES (default, $1, $2, $3, $4)`;
  const values = [mail.name, mail.publisher, mail.content, mail.photo];
  response = await pool.query(text, values);
  console.log(values)
  await pool.end();
  return values;
}


module.exports = {
  getPosts,
  insertPost
}