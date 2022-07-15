require('dotenv').config()
const { Pool } = require("pg");

const credentials = require("./credentials")

async function getUserLocation(user) {
  const pool = new Pool(credentials);
  const userInfo = await pool.query("SELECT location FROM users WHERE username=$1", [user.username]);
  await pool.end();
  return userInfo.rows[0].location
}

async function getPosts(user) {
    const pool = new Pool(credentials);
    const posts = await pool.query("SELECT name, publisher, content, photo FROM posts, users WHERE posts.location=$1 AND posts.creator=users.username", [await getUserLocation(user)]);
    await pool.end();
    return posts.rows;
}

async function getOwnPosts(user) {
  const pool = new Pool(credentials);
  const posts = await pool.query("SELECT * FROM posts WHERE creator=$1 ", [user.username]);
  await pool.end();
  return posts.rows;
}

async function insertPost(post, username, location) {
  const pool = new Pool(credentials);
  const text = `INSERT INTO posts (id, name, publisher, content, photo, creator, location) VALUES (default, $1, $2, $3, $4, $5, $6)`;
  const values = [post.name, post.publisher, post.content, post.photo, username, location];
  response = await pool.query(text, values);
  await pool.end();
  return values;
}


module.exports = {
  getPosts,
  insertPost,
  getOwnPosts,
  getUserLocation
}