const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Auth routes working");
});

router.post("/signup", async (req, res) => {
  res.send("Signup endpoint working");
});

router.post("/login", async (req, res) => {
  res.send("Login endpoint working");
});

module.exports = router;
