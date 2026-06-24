const express = require("express");
const pool = require("../db/conections");
const { route } = require("./stranke.routes");
const router = express.Router();

//GET METODA
router.get("/", async (req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = "SELECT * FROM sadje";
        let params = [];

        if(iskanje){
            sql += ` WHERE naziv LIKE ?
                     OR sorta LIKE ?
                     OR opis LIKE ?`;
            
            const iskalniNiz = `%${iskanje}%`;
            params=[iskalniNiz,
                    iskalniNiz,
                    iskalniNiz];
        }

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju sadja!",
            napaka: error.messsage,
        });
    }
});

//POST METODA
router.post("/", async (req, res) => {
    try{
        const {
            naziv,
            sorta,
            opis
        } = req.body;

        if (!naziv || !sorta) {
            return res.status(400).json({
                sporocilo: "Polja naziv in sorta so obvezna!"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO sadje (naziv, sorta, opis)
             VALUES(?, ?, ?)`,
             [naziv,
              sorta,
              opis || null]
        );

        res.status(201).json({
            sporocilo: "Sadje uspešno dodano!"
        });
        
    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri dodajanju sadja!",
            napaka: error.messsage
        });
    }
});

//PUT METODA
router.put("/:id", async(req, res) =>{
    try{
        const id = req.params.id;

        const { naziv,
                sorta,
                opis
              }=req.body;

        if (!naziv || !sorta) {
            res.status(400).json({
                sporocilo: "Polja naziv in sorta so obvezna!"
            });
        }

        const [result] = await pool.query(
            `UPDATE sadje SET naziv = ?,
                              sorta = ?,
                              opis = ?
             WHERE id = ?`,
             [naziv,
              sorta,
              opis || null,
              id
             ]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({
                sporocilo: "Sadje ni najdeno"
            });
        }

        res.json({
            sporocilo: "Sadje uspešno posodobljeno!"
        });
    } catch (error) {
        res.status(500).json({
            sporocilo: "Napaka pri posodabljanu sadja!"
        });
    }
});

//DELETE METODA
router.delete("/:id", async(req, res) =>{
    try{
        const id = req.params.id;

        const [result] = await pool.query(
            "DELETE FROM sadje WHERE id=?",[id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                sporocilo: "Sadje ni najdeno!"
            });
        }

        res.json({
            sporocilo: "Sadje uspešno izbrisano!"
        });
    } catch(error){
        res.status(500).json({
            sporocilo: "Napaka pri brisanju sadja!",
            napaka: error.messsage
        });
    }
});

module.exports = router;