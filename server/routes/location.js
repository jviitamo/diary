require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken"); 
const router = Router(); 
const credentials = require("../helpers/credentials")
const { Pool } = require("pg");
const middleware = require("../helpers/middleware")

router.get("/", middleware, async (req, res) => {
    const pool = new Pool(credentials);
    try {
        const locations = await pool.query("SELECT * FROM locations") 
        await pool.end();
        res.json(locations.rows)
    } catch (error) {
        res.status(400).json({ error });
    }
  });

router.post("/",middleware, async (req, res) => {
  const pool = new Pool(credentials);
  try {
      const response = await pool.query("INSERT INTO locations VALUES($1, $2, $3)", [req.body.name, req.body.address, 'juhana']) 
      await pool.end();
      res.json(response)
  } catch (error) {
      res.status(400).json({ error });
  }
});

router.put("/", middleware, async (req, res) => {
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