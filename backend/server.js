const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");


const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StockFlow API Running");
});

app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.use("/api/auth", authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
