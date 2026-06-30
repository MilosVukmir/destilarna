import { Router } from "express";
import pool from "../db/conections.js";

const router = Router();


//GET METODA
router.get("/", async(req, res) => {
    try{
        const iskanje = req.query.iskanje;

        let sql = `SELECT  
                   sod.id,

                   sod.serija_zganja_id,
                   serija_zganja.naziv_serije AS serija,
                   
                   sod.oznaka,
                   sod.material,
                   sod.prostornina_l,
                   sod.lokacija,
                   sod.stanje
                   FROM sod
                   JOIN serija_zganja ON sod.serija_zganja_id = serija_zganja.id`;
        
        let params = [];

        if (iskanje) {
            sql += ` WHERE serija_zganja.naziv_serije LIKE ?
                     OR  sod.oznaka LIKE ?
                     OR  sod.material LIKE ?
                     OR  sod.prostornina_l LIKE ?
                     OR  sod.lokacija LIKE ?
                     OR  sod.stanje LIKE ?`;
        
            const iskalniNiz = `%${iskanje}%`;
            params = [
                iskalniNiz,
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
            sporocilo: "Napaka pri pridobijanju sodov!",
            napaka: error.message,
        });
    }
});

//POST METODA
router.post("/", async(req, res) => {
    try{

        const {
            serija_zganja_id,
            oznaka,
            material,
            prostornina_l,
            lokacija,
            stanje
        } = req.body;

        if (!serija_zganja_id || !oznaka || !material ||
            prostornina_l == null || !stanje)
         {
          return res.status(400).json({
            sporocilo: "Obvezna polja niso izpolnjena!"
          });  
        }

        const [result] = await pool.query(
            `INSERT INTO sod
            (
                serija_zganja_id,
                oznaka,
                material,
                prostornina_l,
                lokacija,
                stanje
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                serija_zganja_id,
                oznaka,
                material,
                prostornina_l,
                lokacija || null,
                stanje
            ]
        );

        res.status(201).json({
            sporocilo: "Sod uspešno dodan!"
        })

    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri dodajanju soda!",
            napaka: error.message
        });
    }
});

//PUT METODA
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const {
                serija_zganja_id,
                oznaka,
                material,
                prostornina_l,
                lokacija,
                stanje 
              } = req.body;
        
        if (!serija_zganja_id || !oznaka || !material ||
             prostornina_l == null || !stanje)
        {
            return res.status(400).json({
            sporocilo: "Obvezna polja niso izpolnjena!"
          });  
        }
              const [result] = await pool.query(
                `UPDATE sod SET serija_zganja_id = ?,
                                oznaka = ?,
                                material = ?,
                                prostornina_l = ?,
                                lokacija = ?,
                                stanje = ?
                                WHERE id = ?`,
                                [ serija_zganja_id, oznaka,
                                  material, prostornina_l,
                                  lokacija || null, stanje, id ]
              );
        
              if (result.affectedRows === 0) {
                return res.status(404).json({
                  sporocilo: "Sod ni najden!"
                });
              }
        
              res.json({
                sporocilo: "Sod uspešno posodobljen!"
              });
        
    }  catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri posodabljanju soda!",
      napaka: error.message
    });
  }
});

//DELETE METODA
router.delete("/:id", async (req, res) => {
  try{
      const id = req.params.id;

      const [result] = await pool.query(
        "DELETE FROM sod WHERE id=?", [id]
      );

      if (result.affectedRows === 0) {
        return res.status(400).json({
          sporocilo: "Sod ni najden!"
        });

      }
      
        res.json({
          sporocilo: "Sod uspešno izbrisan!"
        });

  } catch (error){
    res.status(500).json({
      sporocilo: "Napaka pri brisanju soda!",
      napaka: error.message
    });
  }
});

export default router;