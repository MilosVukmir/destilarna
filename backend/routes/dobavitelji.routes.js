const express = require("express");
const pool = require("../db/conections");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM dobavitelj");
    res.json(rows);
  }
  catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri pridobianju dobaviteljev!",
      napaka: error.message,
    });
  }
});

router.post("/", (req, res) => {
  res.json({
    sporocilo: "Dobavitelj uspesno dodan"
  });
});

module.exports = router;