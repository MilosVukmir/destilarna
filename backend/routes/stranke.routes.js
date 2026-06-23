const express = require("express");
const pool = require("../db/conections");
const router = express.Router();

//GET METODA
router.get("/", async (req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = "SELECT * FROM stranka";
        let params = [];

        if (iskanje) {
            sql += ` WHERE ime_ali_naziv LIKE ?
                     OR telefon LIKE ?
                     OR e_naslov LIKE ?
                     OR naslov LIKE ?
                     OR tip_stranke LIKE ?`;
        
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
    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju strank!",
            napaka: error.message,
        });
    }
});

//POST METODA
router.post("/", async (req, res) => {
    try{
        const {
            ime_ali_naziv,
            telefon,
            e_naslov,
            naslov,
            tip_stranke
        } = req.body;
    
        if (!ime_ali_naziv || !tip_stranke){
            return res.status(400).json({
                sporocilo: "Polja ime in tip stranke so obvezna!"
            });
        } 
        if (tip_stranke !== "fizicna" && tip_stranke !== "pravna") {
            return res.status(400).json({
                sporocilo: "Neveljaven tip stranke!"
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
            `INSERT INTO stranka (ime_ali_naziv, telefon, e_naslov, naslov, tip_stranke)
            VALUES (?, ?, ?, ?, ?)`,
            [ ime_ali_naziv,
              telefon || null,
              e_naslov || null,
              naslov || null,
              tip_stranke ]
        );

        res.status(201).json({
            sporocilo: "Stranka uspešno dodana!"
        });
    }
    catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri dodajanju stranke!",
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
            telefon,
            e_naslov,
            naslov,
            tip_stranke 
        } = req.body;

    if (!ime_ali_naziv || !tip_stranke) {
            return res.status(400).json({
                sporocilo: "Polja ime in tip stranke so obvezna!"
            });
    }

    if (telefon) {
        const telefonRegex = /^[0-9\s-]{6,30}$/;

    if (!telefonRegex.test(telefon)) {
      return res.status(400).json({
        sporocilo: "Neveljavna telefonska številka."
      });
    }
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
        `UPDATE stranka SET ime_ali_naziv = ?,
                            telefon = ?,
                            e_naslov = ?,
                            naslov = ?,
                            tip_stranke = ?
                        WHERE id = ?`,
                        [ime_ali_naziv,
                         telefon || null,
                         e_naslov || null,
                         naslov || null,
                         tip_stranke,
                         id
                        ]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({
            sporocilo: "Stranka ni najdena!"
        });
    }

    res.json({
        sporocilo: "Stranka uspešno posodobljena!"
    });

    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri posodabljanju stranke!",
            napaka: error.message
        });
    }
});

//DELETE METODA

router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;

        const[result] = await pool.query(
            "DELETE FROM stranka WHERE id = ?", [id]
        );
    if (result.affectedRows === 0) {
        return res.status(400).json({
            sporocilo: "Stranka ni najdena!"
        });
    }

    res.json({
        sporocilo: "Stranka uspešno izbrsana!"
    });
    }
    catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri brisanju stranke!",
            napaka: error.message
        });
    }
});

module.exports = router;

