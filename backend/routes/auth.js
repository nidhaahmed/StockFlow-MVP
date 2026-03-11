const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

router.post("/signup", async (req, res) => {
  try {
    const { email, password, organizationName } = req.body;

    if (!email || !password || !organizationName) {
      return res.status(400).json({ error: "All fields required" });
    }

    // check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create organization
    const orgResult = await pool.query(
      "INSERT INTO organizations (name) VALUES ($1) RETURNING id",
      [organizationName],
    );

    const organizationId = orgResult.rows[0].id;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const userResult = await pool.query(
      "INSERT INTO users (email, password_hash, organization_id) VALUES ($1,$2,$3) RETURNING id,email,organization_id",
      [email, hashedPassword, organizationId],
    );

    const user = userResult.rows[0];

    // generate JWT
    const token = jwt.sign(
      { userId: user.id, organizationId: user.organization_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "User created successfully",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, organizationId: user.organization_id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
