require("dotenv").config();
const { Router } = require("express");
const router = Router(); 
const credentials = require("../helpers/credentials")
const { Pool } = require("pg");
const { isLoggedIn, isAdmin } = require("../helpers/middleware")

router.get("/", isLoggedIn, isAdmin, async (req, res) => {
    const pool = new Pool(credentials);
    try {
        const locations = await pool.query("SELECT * FROM locations") 
        await pool.end();
        res.json(locations.rows)
    } catch (error) {
        res.status(400).json({ error });
    }
  });

router.post("/", isLoggedIn, isAdmin, async (req, res) => {
  const pool = new Pool(credentials);
  try {
      const response = await pool.query("INSERT INTO locations VALUES($1, $2, $3)", [req.body.name, req.body.address, req.user.username]) 
      await pool.end();
      res.json(response)
  } catch (error) {
      res.status(400).json({ error });
  }
});




module.exports = router;