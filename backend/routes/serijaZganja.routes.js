import { Router } from "express";
import pool from "../db/conections.js";

const router = Router();


//GET METODA
router.get("/", async(req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = "SELECT * FROM serija_zganja";
        let params = [];

        if (iskanje) {
            sql += ` WHERE naziv_serije LIKE ?
                     OR vrsta_zganja LIKE ?
                     OR leto_pridelave LIKE ?
                     OR jakost LIKE ?
                     OR skupna_kolicina_l LIKE ?
                     OR kakovostni_razred LIKE ?`;
            
            const iskalniNiz = `%${iskanje}%`;

            params = [ iskalniNiz,
                       iskalniNiz,
                       iskalniNiz,
                       iskalniNiz,
                       iskalniNiz,
                       iskalniNiz ];
        }
        const [rows] = await pool.query(sql, params);
        res.json(rows);
    }
    catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju serija zganja!",
            napaka: error.message,
        });
    }
});

//POST METODA
router.post("/", async(req, res) => {
    try{
        const {
            naziv_serije,
            vrsta_zganja,
            leto_pridelave,
            jakost,
            skupna_kolicina_l,
            kakovostni_razred,
            opomba
        }=req.body;

        if (!naziv_serije || !vrsta_zganja || !leto_pridelave ||
            jakost == null || skupna_kolicina_l == null ||
            kakovostni_razred == null) {
            
            return res.status(400).json({
                sporocilo: "Obvezna polja niso izpolnjena!"
            });
        }
            const [result] = await pool.query(
                `INSERT INTO serija_zganja (naziv_serije, vrsta_zganja, leto_pridelave, jakost, skupna_kolicina_l, kakovostni_razred, opomba)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [ naziv_serije,
                  vrsta_zganja,
                  leto_pridelave,
                  jakost,
                  skupna_kolicina_l,
                  kakovostni_razred,
                  opomba || null]
            );

            res.status(201).json({
                sporocilo: "Serija žganja uspešno dodana!"
            }); 

    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri dodajanju zganja!",
            napaka: error.message
        });
    }
});

//PUT METODA
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const {
            naziv_serije,
            vrsta_zganja,
            leto_pridelave,
            jakost,
            skupna_kolicina_l,
            kakovostni_razred,
            opomba
        } = req.body;

        if (!naziv_serije || !vrsta_zganja || !leto_pridelave ||
            jakost == null || skupna_kolicina_l == null ||
            kakovostni_razred == null) {
            
            return res.status(400).json({
                sporocilo: "Obvezna polja niso izpolnjena!"
            });
        }

        const [result] = await pool.query(
            `UPDATE serija_zganja SET naziv_serije = ?,
                                      vrsta_zganja = ?,
                                      leto_pridelave = ?,
                                      jakost = ?,
                                      skupna_kolicina_l = ?,
                                      kakovostni_razred = ?,
                                      opomba = ?
                                    WHERE id = ?`,
                                    [naziv_serije,
                                     vrsta_zganja,
                                     leto_pridelave,
                                     jakost,
                                     skupna_kolicina_l,
                                     kakovostni_razred,
                                     opomba || null,
                                     id
                                    ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                sporocilo: "Serija žganja ni najdena!"
            });
        }

        res.json({
            sporocilo: "Serija žganja uspešno posodobljena!"
        });

    } catch(error){
        res.status(500).json({
            sporocilo: "Napaka pri posodabljanju serije žganja!",
            napaka: error.message
        });
    }
});

//DELETE METODA
router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;

        const [result] = await pool.query(
            "DELETE FROM serija_zganja WHERE id = ?", [id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                sporocilo: "Serija žganja ni najdena!"
            });
        }

        res.json({
            sporocilo: "Serija žganja uspešno izbrisana!"
        });

    } catch(error){
        res.status(500).json({
            sporocilo: "Napaka pri brisanju serije žganja!",
            napaka: error.message
        });
    }
});

export default router;