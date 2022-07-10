require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const router = Router(); 
const { SECRET = "secret" } = process.env;
const credentials = require("./credentials")
const { Pool } = require("pg");
const middleware = require("./middleware")


router.post("/signup", async (req, res) => {
    const pool = new Pool(credentials);
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const response = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, password]) 

        await pool.end();
        res.json(response);
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
        const token = await jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get('/user', middleware, async (req, res, next) => {
  try {
    const pool = new Pool(credentials);
    const user = await pool.query("SELECT * FROM users WHERE username=$1", [req.user.username]);
    await pool.end();
    res.json(user.rows[0]);
  } catch (err) {
      next(err);
  }
  });

router.post('/newpassword', middleware, async (req, res, next) => {
  try {
    const pool = new Pool(credentials);
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await pool.query("UPDATE users SET password=$1 WHERE username=$2", [password, req.user.username]);
    await pool.end();
    res.json(user.rows[0]);
  } catch (err) {
      next(err);
  }
  });
module.exports = router;