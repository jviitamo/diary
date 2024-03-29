require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const router = Router(); 
const { SECRET = "secret" } = process.env;
const credentials = require("../helpers/credentials")
const { Pool } = require("pg");
const { isLoggedIn, isAdmin } = require("../helpers/middleware")
const { getUsers } = require("../helpers/user-functions")

router.post("/signup", async (req, res) => {
    const pool = new Pool(credentials);
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const checkIfReserved = await pool.query("SELECT * FROM users WHERE username=$1", [req.body.username]);
        if (checkIfReserved.rows.length > 0) {
          await pool.end();
          res.status(400).json("Käyttäjänimi on jo varattu");
        } else {
          const response = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, password]) 
          await pool.end();
          res.json(response);
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.post("/login", async (req, res) => {
  const pool = new Pool(credentials);
  try {
    const response = await pool.query("SELECT * FROM users WHERE username=$1", [req.body.username]);
    await pool.end()
    if (response.rows.length > 0) {
      const user = response.rows[0]
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ username: user.username, location: user.location, type: user.type }, SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token, username: user.username, location: user.location, type: user.type });
      } else {
        res.status(400).json("Väärä salasana");
      }
    } else {
      res.status(400).json("Käyttäjää ei ole olemassa");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    res.json(await getUsers(req.query));
  } catch (err) {
      next(err);
  }});

router.put('/newpassword', isLoggedIn, async (req, res, next) => {
  try {
    const pool = new Pool(credentials);
    const new_password = await bcrypt.hash(req.body.new_password, 10);
    const old_password = await bcrypt.hash(req.body.old_password, 10);
    const users = await pool.query("SELECT * FROM users WHERE username=$1", [req.user.username])
    const isSameUser = await bcrypt.compare(req.body.password, users.rows[0].password);
    if (isSameUser) {
      const user = await pool.query("UPDATE users SET password=$1 WHERE username=$2 AND password=$3", [new_password, req.user.username, old_password]);
      await pool.end();
      res.json(user.rows[0]);
    } else {
      res.json("Väärä salasana")
    }
  } catch (err) {
      next(err);
  }
  });

router.put("/setlocation", isLoggedIn, isAdmin, async (req, res) => {
  const pool = new Pool(credentials);
  try {
      const response = await pool.query("UPDATE users SET location=$1 WHERE username=$2 and location IS NULL", [req.body.location, req.body.username]) 
      await pool.end();
      res.json(response)
  } catch (error) {
      res.status(400).json({ error });
  }
});

module.exports = router;