const express = require("express");
const pool = require("../db/conections");

const router = express.Router();

//GET METODA
router.get("/", async(req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = "SELECT * FROM uporabnik";
        let params = [];

        if (iskanje) {
            sql += ` WHERE uporabnisko_ime LIKE ?
                     OR ime LIKE ?
                     OR telefon LIKE ?
                     OR e_naslov LIKE ?
                     OR vloga LIKE ?`;
            
            const iskalniNiz = `%${iskanje}%`;

            params = [ iskalniNiz,
                       iskalniNiz,
                       iskalniNiz,
                       iskalniNiz,
                       iskalniNiz ];
        }

        const [rows] = await pool.query(sql, params);
        res.json(rows);

    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju uporabnikov!",
            napaka: error.message,
        });
    }
});

//POST METODA
router.post("/", async(req, res) => {
    try{
        const {
            uporabnisko_ime,
            ime,
            telefon,
            e_naslov,
            geslo,
            vloga
        } = req.body;

    if(!uporabnisko_ime || !ime || !e_naslov ||
       !geslo || !vloga)
       {
         return res.status(400).json({
        sporocilo: "Obvezna polja niso izpolnjena!"
      });
       }

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

      if (!emailRegex.test(e_naslov)) {
        return res.status(400).json({
          sporocilo: "Neveljaven e-poštni naslov!"
        });
      }

    if (telefon) {
         const telefonRegex = /^[0-9\s-]{6,30}$/;

    if (!telefonRegex.test(telefon)) {
      return res.status(400).json({
        sporocilo: "Neveljavna telefonska številka!"
      });
    }
    }

    const [result] = await pool.query(
        `INSERT INTO uporabnik (uporabnisko_ime, ime, telefon, e_naslov, geslo, vloga)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [ uporabnisko_ime,
          ime,
          telefon || null,
          e_naslov,
          geslo,
          vloga
        ]);

    res.status(201).json({
        sporocilo: "Uporabnik uspešno dodan!"
    });

    } catch (error){
        res.status(500).json({
      sporocilo: "Napaka pri dodajanju uporabnika.",
      napaka: error.message
    });
    }
});

//PUT METODA
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const {
            uporabnisko_ime,
            ime,
            telefon,
            e_naslov,
            geslo,
            vloga
        } = req.body;

    if(!uporabnisko_ime || !ime || !e_naslov ||
       !geslo || !vloga)
       {
         return res.status(400).json({
        sporocilo: "Obvezna polja niso izpolnjena!"
      });
       }

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

      if (!emailRegex.test(e_naslov)) {
        return res.status(400).json({
          sporocilo: "Neveljaven e-poštni naslov!"
        });
      }

    if (telefon) {
         const telefonRegex = /^[0-9\s-]{6,30}$/;

    if (!telefonRegex.test(telefon)) {
      return res.status(400).json({
        sporocilo: "Neveljavna telefonska številka!"
      });
    }
    }

    const [result] = await pool.query(
        `UPDATE uporabnik SET uporabnisko_ime = ?,
                              ime = ?,
                              telefon = ?,
                              e_naslov = ?,
                              geslo = ?,
                              vloga = ?
                              WHERE id=?`,
                              [ uporabnisko_ime,
                                ime,
                                telefon || null,
                                e_naslov,
                                geslo,
                                vloga,
                                id
                              ]);
    
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        sporocilo: "Uporabnik ni najden!"
      });
    }

    res.json({
      sporocilo: "Uporabnik uspesno posodobljen!"
    });
  

    } catch (error){
      res.status(500).json({
      sporocilo: "Napaka pri posodabljanju uporabnika!",
      napaka: error.message
    });
    }
});

//DELETE METODA
router.delete("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const [result] = await pool.query(
            "DELETE FROM uporabnik WHERE id = ?", [id]
        );
    
     if (result.affectedRows === 0) {
      return res.status(404).json({
        sporocilo: "Uporabnik ni najden!"
      });
    }

    res.json({
      sporocilo: "Uporabnik uspesno izbrisan!"
    });

    } catch(error){
      res.status(500).json({
      sporocilo: "Napaka pri brisanju uporabnika.",
      napaka: error.message,
    });
    }
});
module.exports = router;