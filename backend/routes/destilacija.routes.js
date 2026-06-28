const express = require("express");
const pool = require("../db/conections");

const router = express.Router();

//GET METODA
router.get("/", async(req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = `SELECT
            destilacija.id,

            destilacija.fermentacija_id,

            fermentacija.prevzem_sadja_id,

            sadje.naziv AS sadje,
            sadje.sorta AS sorta,

            serija_zganja.id AS serija_zganja_id,
            serija_zganja.naziv_serije AS serija,

            destilacija.datum_destilacije,
            destilacija.tip_destilacije,
            destilacija.jakost_alkohola,
            destilacija.pridobljena_kolicina_l,
            destilacija.opomba

          FROM destilacija

          JOIN fermentacija ON destilacija.fermentacija_id = fermentacija.id

          JOIN prevzem_sadja ON fermentacija.prevzem_sadja_id = prevzem_sadja.id

          JOIN sadje ON prevzem_sadja.sadje_id = sadje.id

          JOIN serija_zganja ON destilacija.serija_zganja_id = serija_zganja.id`;

        let params = [];

if (iskanje) {
    sql += ` WHERE serija_zganja.naziv_serije LIKE ?
             OR sadje.naziv LIKE ?
             OR destilacija.tip_destilacije LIKE ?
             OR destilacija.jakost_alkohola LIKE ?
             OR destilacija.pridobljena_kolicina_l LIKE ?
             OR destilacija.opomba LIKE ?`;

    const iskalniNiz = `%${iskanje}%`;
     params = [
        iskalniNiz,
        iskalniNiz,
        iskalniNiz,
        iskalniNiz,
        iskalniNiz,
        iskalniNiz ];
    }
    const [rows] = await pool.query(sql, params);
    res.json(rows);

    } catch(error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju podatkov o destilaciji!",
            napaka: error.message
        });
    }
});

//POST METODA
router.post("/", async(req, res) => {
    try{
        const {
            fermentacija_id,
            serija_zganja_id,
            datum_destilacije,
            tip_destilacije,
            jakost_alkohola,
            pridobljena_kolicina_l,
            opomba
        } = req.body;

    if (!datum_destilacije || !tip_destilacije
         || jakost_alkohola == null || pridobljena_kolicina_l == null) 
         {
            return res.status(400).json({
                sporocilo: "Obvezna polja niso izpolnjena!"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO destilacija
            (
            fermentacija_id,
            serija_zganja_id,
            datum_destilacije,
            tip_destilacije,
            jakost_alkohola,
            pridobljena_kolicina_l,
            opomba
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                fermentacija_id,
                serija_zganja_id,
                datum_destilacije,
                tip_destilacije,
                jakost_alkohola,
                pridobljena_kolicina_l,
                opomba || null
            ]
        );

        res.status(201).json({
            sporocilo: "Destilacija uspešno dodana!"
        });

    } catch (error) {
         res.status(500).json({
            sporocilo: "Napaka pri dodajanju destilacije!",
            napaka: error.message
        });
    } 
});

//PUT METODA
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const {
            fermentacija_id,
            serija_zganja_id,
            datum_destilacije,
            tip_destilacije,
            jakost_alkohola,
            pridobljena_kolicina_l,
            opomba
        } = req.body;

    if (!datum_destilacije || !tip_destilacije
         || jakost_alkohola == null || pridobljena_kolicina_l == null) 
         {
            return res.status(400).json({
                sporocilo: "Obvezna polja niso izpolnjena!"
            });
        }

    const [result] = await pool.query(
        `UPDATE destilacija SET fermentacija_id = ?,
                                serija_zganja_id = ?,
                                datum_destilacije = ?,
                                tip_destilacije = ?,
                                jakost_alkohola = ?,
                                pridobljena_kolicina_l = ?,
                                opomba = ?
                                WHERE id = ?`,
                                [   fermentacija_id,
                                    serija_zganja_id,
                                    datum_destilacije,
                                    tip_destilacije,
                                    jakost_alkohola,
                                    pridobljena_kolicina_l,
                                    opomba || null, id]);
    
     if (result.affectedRows === 0) {
        return res.status(404).json({
          sporocilo: "Destilacija ni najdena!"
        });
      }

      res.json({
        sporocilo: "Destilacija uspešno posodobljena!"
      });

    } catch (error){
        res.status(500).json({
      sporocilo: "Napaka pri posodabljanju destilacije!",
      napaka: error.message
    });
    }
});

//DELETE METODA
router.delete("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const [result] = await pool.query(
            "DELETE FROM destilacija WHERE id=?", [id]
        );

    if (result.affectedRows === 0) {
        return res.status(400).json({
            sporocilo: "Destilacija ni najdena!"
        });
    }

    res.json({
        sporocilo: "Destilacija uspešno izbrisana!"
    });

    } catch(error){
        res.status(500).json({
            sporocilo: "Napaka pri brisanju destilacije!"
        });
    }
});

module.exports = router;