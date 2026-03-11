const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

/*
CREATE PRODUCT
*/

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      quantity,
      cost_price,
      selling_price,
      low_stock_threshold,
    } = req.body;

    const organizationId = req.user.organizationId;

    const result = await pool.query(
      `INSERT INTO products
      (organization_id,name,sku,description,quantity,cost_price,selling_price,low_stock_threshold)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [
        organizationId,
        name,
        sku,
        description,
        quantity,
        cost_price,
        selling_price,
        low_stock_threshold,
      ],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ALL PRODUCTS
 */

router.get("/", authMiddleware, async (req, res) => {
  try {
    const organizationId = req.user.organizationId;

    const result = await pool.query(
      "SELECT * FROM products WHERE organization_id=$1 ORDER BY created_at DESC",
      [organizationId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * UPDATE PRODUCT
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const organizationId = req.user.organizationId;

    const {
      name,
      sku,
      description,
      quantity,
      cost_price,
      selling_price,
      low_stock_threshold,
    } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET name=$1,
           sku=$2,
           description=$3,
           quantity=$4,
           cost_price=$5,
           selling_price=$6,
           low_stock_threshold=$7,
           updated_at=NOW()
       WHERE id=$8 AND organization_id=$9
       RETURNING *`,
      [
        name,
        sku,
        description,
        quantity,
        cost_price,
        selling_price,
        low_stock_threshold,
        productId,
        organizationId,
      ],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE PRODUCT
 */

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    const organizationId = req.user.organizationId;

    await pool.query(
      "DELETE FROM products WHERE id=$1 AND organization_id=$2",
      [productId, organizationId],
    );

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
