const express = require("express");
const pool = require("../db/conections");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { uporabnisko_ime, geslo } = req.body;

    if (!uporabnisko_ime || !geslo) {
      return res.status(400).json({
        sporocilo: "Uporabniško ime in geslo sta obvezna!"
      });
    }

    const [rows] = await pool.query(
      "SELECT * FROM uporabnik WHERE uporabnisko_ime = ?",
      [uporabnisko_ime]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        sporocilo: "Napačno uporabniško ime ali geslo!"
      });
    }

    const uporabnik = rows[0];

    if (uporabnik.geslo !== geslo) {
      return res.status(401).json({
        sporocilo: "Napačno uporabniško ime ali geslo!"
      });
    }

    res.json({
      id: uporabnik.id,
      uporabnisko_ime: uporabnik.uporabnisko_ime,
      e_naslov: uporabnik.e_naslov,
      vloga: uporabnik.vloga
    });

  } catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri prijavi!",
      napaka: error.message
    });
  }
});

module.exports = router;