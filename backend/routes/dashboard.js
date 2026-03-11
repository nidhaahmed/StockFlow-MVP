const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    // total products
    const productCount = await pool.query(
      "SELECT COUNT(*) FROM products WHERE organization_id=$1",
      [organizationId],
    );

    // total quantity
    const totalQuantity = await pool.query(
      "SELECT COALESCE(SUM(quantity),0) FROM products WHERE organization_id=$1",
      [organizationId],
    );

    // low stock items
    const lowStock = await pool.query(
      `SELECT COUNT(*) 
       FROM products
       WHERE organization_id=$1
       AND quantity <= low_stock_threshold`,
      [organizationId],
    );

    res.json({
      total_products: parseInt(productCount.rows[0].count),
      total_quantity: parseInt(totalQuantity.rows[0].coalesce),
      low_stock_items: parseInt(lowStock.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
