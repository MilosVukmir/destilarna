import { Router } from "express";
import pool from "../db/conections.js";

const router = Router();


//GET METODA
router.get("/", async(req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = `SELECT 
                   prodaja.id,
                   
                   prodaja.serija_zganja_id,
                   serija_zganja.naziv_serije AS serija,
                   
                   prodaja.stranka_id,
                   stranka.ime_ali_naziv AS stranka,
                   
                   prodaja.datum_prodaje,
                   prodaja.kolicina_l,
                   prodaja.cena_na_l,
                   prodaja.skupna_cena,
                   prodaja.nacin_placila,
                   prodaja.opomba
                   FROM prodaja
                   JOIN serija_zganja ON prodaja.serija_zganja_id = serija_zganja.id
                   JOIN stranka ON prodaja.stranka_id = stranka.id`;
        
        let params = [];

        if (iskanje) {
            sql += ` WHERE serija_zganja.naziv_serije LIKE ?
                     OR stranka.ime_ali_naziv LIKE ?
                     OR prodaja.kolicina_l LIKE ?
                     OR prodaja.skupna_cena LIKE ?
                     OR prodaja.nacin_placila LIKE ?
                     OR prodaja.opomba LIKE ?`;
            
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
    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju podatkov o prodaji!",
            napaka: error.message
        });
    }
});

//POST METODA
router.post("/", async (req, res) => {
    try{
        const{
            serija_zganja_id,
            stranka_id,
            datum_prodaje,
            kolicina_l,
            cena_na_l,
            skupna_cena,
            nacin_placila,
            opomba
        } = req.body;

    if (!serija_zganja_id || !stranka_id ||
        !datum_prodaje || kolicina_l == null ||
        cena_na_l == null || skupna_cena == null ||
        !nacin_placila) 
        {
        return res.status(400).json({
            sporocilo: "Obvezna polja niso izpolnjena!"
        });
    }

    const [result] = await pool.query(
        `INSERT INTO prodaja
        (
            serija_zganja_id,
            stranka_id,
            datum_prodaje,
            kolicina_l,
            cena_na_l,
            skupna_cena,
            nacin_placila,
            opomba
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            serija_zganja_id,
            stranka_id,
            datum_prodaje,
            kolicina_l,
            cena_na_l,
            skupna_cena,
            nacin_placila,
            opomba || null
        ]
    );

    res.status(201).json({
        sporocilo: "Prodaja uspešno dodana!"
    });

    } catch (error){
         res.status(500).json({
            sporocilo: "Napaka pri dodajanju prodaje!",
            napaka: error.message
        });
    }
});

//PUT METODA
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const{
            serija_zganja_id,
            stranka_id,
            datum_prodaje,
            kolicina_l,
            cena_na_l,
            skupna_cena,
            nacin_placila,
            opomba
        } = req.body;

     if (!serija_zganja_id || !stranka_id ||
        !datum_prodaje || kolicina_l == null ||
        cena_na_l == null || skupna_cena == null ||
        !nacin_placila) 
        {
        return res.status(400).json({
            sporocilo: "Obvezna polja niso izpolnjena!"
        });
    }
    const [result] = await pool.query(
        `UPDATE prodaja SET serija_zganja_id = ?,
                            stranka_id = ?,
                            datum_prodaje = ?,
                            kolicina_l = ?,
                            cena_na_l = ?,
                            skupna_cena = ?,
                            nacin_placila = ?,
                            opomba = ?
                            WHERE id = ?`,
                            [ serija_zganja_id, stranka_id, 
                              datum_prodaje, kolicina_l, 
                              cena_na_l, skupna_cena, 
                              nacin_placila, opomba || null, id ]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({
            sporocilo: "Prodaja ni najdena!"
        });
    }

    res.json({
        sporocilo: "Prodaja uspešno posodobljena!"
    });
        
    }catch(error){
        res.status(500).json({
        sporocilo: "Napaka pri posodabljanju prodaje!",
        napaka: error.message
    });
    }
});

//DELETE METODA
router.delete("/:id", async( req, res ) => {
    try{
        const id = req.params.id;

        const [result] = await pool.query(
            `DELETE FROM prodaja WHERE id=?`,[id]
        );

    if (result.affectedRows === 0) {
        return res.status(404).json({
            sporocilo: "Prodaja ni najdena!"
        });
    }

    res.json({
        sporocilo: "Prodaja uspešno izbrisana!"
    }); 

    } catch (error){
        res.status(500).json({
        sporocilo: "Napaka pri brisanju prodaje!",
        napaka: error.message
    });
    }
});
export default router;