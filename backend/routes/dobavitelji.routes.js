import { Router } from "express";
import pool from "../db/conections.js";

const router = Router();

//GET METODA
router.get("/", async (req, res) => {
  try {
    const iskanje = req.query.iskanje;

    let sql = "SELECT * FROM dobavitelj";
    let params = [];

    if (iskanje) {
      sql += ` WHERE ime_ali_naziv LIKE ?
              OR kontakt_oseba LIKE ?
              OR telefon LIKE ?
              OR e_naslov LIKE ?
              OR naslov LIKE ?`;
    
      const iskalniNiz = `%${iskanje}%`;

      params = [
        iskalniNiz,
        iskalniNiz,
        iskalniNiz,
        iskalniNiz,
        iskalniNiz];
    }
  const [rows] = await pool.query(sql, params);
  res.json(rows);
  
  }
  
  catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri pridobianju dobaviteljev!",
      napaka: error.message,
    });
  }
});

//POST METODA
router.post("/", async(req, res) => {
  try {
    const {
      ime_ali_naziv,
      kontakt_oseba,
      telefon,
      e_naslov,
      naslov
    } = req.body;

    if (!ime_ali_naziv || !kontakt_oseba || !telefon){
      return res.status(400).json({
        sporocilo: "Polja ime, kontakt in telefon so obvezna!"
      });
    }

    const telefonRegex = /^[0-9\s-]{6,30}$/;

    if (!telefonRegex.test(telefon)) {
      return res.status(400).json({
        sporocilo: "Neveljavna telefonska številka!"
      });
    }

    if (e_naslov) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

      if (!emailRegex.test(e_naslov)) {
        return res.status(400).json({
          sporocilo: "Neveljaven e-poštni naslov!"
        });
      }
    }

    const [result] = await pool.query(
      `INSERT INTO dobavitelj (ime_ali_naziv, kontakt_oseba, telefon, e_naslov, naslov)
      VALUES (?, ?, ?, ?, ?)`,
      [ ime_ali_naziv,
        kontakt_oseba,
        telefon,
        e_naslov || null,
        naslov || null]
    );

    res.status(201).json({
      sporocilo: "Dobavitelj uspešno dodan."
    });
  }

  catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri dodajanju dobavitelja.",
      napaka: error.message
    });
  }
});

//PUT METODA
router.put("/:id", async (req, res) => {
  try{
    const id = req.params.id;

    const {
      ime_ali_naziv,
      kontakt_oseba,
      telefon,
      e_naslov,
      naslov
    } = req.body;

    if (!ime_ali_naziv || !kontakt_oseba || !telefon) {
      return res.status(400).json({
        sporocilo: "Polja ime, kontakt in telefon so obvezna!"
      });
    }

    const telefonRegex = /^[0-9\s-]{6,30}$/;

    if (!telefonRegex.test(telefon)) {
      return res.status(400).json({
        sporocilo: "Neveljavna telefonska številka."
      });
    }

    if (e_naslov) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(e_naslov)) {
        return res.status(400).json({
          sporocilo: "Neveljaven e-poštni naslov."
        });
      }
    }

    const [result] = await pool.query(
      `UPDATE dobavitelj SET ime_ali_naziv = ?,
                             kontakt_oseba = ?,
                             telefon = ?,
                             e_naslov = ?,
                             naslov = ?
                          WHERE id = ?`,
                          [ ime_ali_naziv,
                            kontakt_oseba,
                            telefon,
                            e_naslov || null,
                            naslov || null,
                            id 
                          ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        sporocilo: "Dobavitelj ni najden!"
      });
    }

    res.json({
      sporocilo: "Dobavitelj uspesno posodobljen!"
    });
  
  } catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri posodabljanju dobavitelja!",
      napaka: error.message
    });
  }
});

//DELETE METODA
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await pool.query(
      "DELETE FROM dobavitelj WHERE id = ?", [id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        sporocilo: "Dobavitelj ni najden!"
      });
    }

    res.json({
      sporocilo: "Dobavitelj uspešno izbrisan!"
    });
  }
  catch (error){
    res.status(500).json({
      sporocilo: "Napaka pri brisanju dobavitelja.",
      napaka: error.message
    });
  }
});

export default router;