const express = require("express");
const pool = require("../db/conections");

const router = express.Router();

//GET METODA
router.get("/", async(req, res) => {
    try{
        const iskanje = req.query.iskanje;
        let sql = `SELECT
                   fermentacija.id,

                  fermentacija.prevzem_sadja_id,

                  sadje.naziv AS sadje,
                  sadje.sorta AS sorta,

                  dobavitelj.ime_ali_naziv AS dobavitelj,

                  fermentacija.datum_zacetka,
                  fermentacija.datum_zakljucka,
                  fermentacija.posoda,
                  fermentacija.zacetna_kolicina_kg,
                  fermentacija.status,
                  fermentacija.opomba

                  FROM fermentacija
                  JOIN prevzem_sadja ON fermentacija.prevzem_sadja_id = prevzem_sadja.id
                  JOIN sadje ON prevzem_sadja.sadje_id = sadje.id
                  JOIN dobavitelj ON prevzem_sadja.dobavitelj_id = dobavitelj.id`;
            
        const params = [];
        
        if (iskanje) {
            sql += ` WHERE sadje.naziv LIKE ?
                     OR fermentacija.posoda LIKE ?
                     OR fermentacija.status LIKE ?
                     OR fermentacija.opomba LIKE ?`;

            const iskalniNiz = `%${iskanje}%`;
            params = [ iskalniNiz,
                       iskalniNiz,
                       iskalniNiz,
                       iskalniNiz ];
        }
        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobijanju podatkov o fermentaciji!",
            napaka: error.message
        });
    }
});

//POST METODA
router.post("/", async(req, res) => {
    try{

        const {
            prevzem_sadja_id,
            datum_zacetka,
            datum_zakljucka,
            posoda,
            zacetna_kolicina_kg,
            status,
            opomba
        } = req.body;

    if (!prevzem_sadja_id || !datum_zacetka ||
        !posoda || zacetna_kolicina_kg == null || !status)
     {
        return res.status(400).json({
            sporocilo: "Obvezna polja niso izpolnjena!"
            });
    } 

    const [result] = await pool.query(
        `INSERT INTO fermentacija
        (
            prevzem_sadja_id,
            datum_zacetka,
            datum_zakljucka,
            posoda,
            zacetna_kolicina_kg,
            status,
            opomba
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            prevzem_sadja_id,
            datum_zacetka,
            datum_zakljucka || null,
            posoda,
            zacetna_kolicina_kg,
            status,
            opomba || null
        ]
    );

    res.status(201).json({
     sporocilo: "Fermentacija uspešno dodana!"
    });    
        
    } catch (error) {
         res.status(500).json({
            sporocilo: "Napaka pri dodajanju fermentacije!",
            napaka: error.message
        });
    } 
});

//PUT METODA
router.put("/:id", async(req, res) => {
    try{
        const id = req.params.id;

        const {
            prevzem_sadja_id,
            datum_zacetka,
            datum_zakljucka,
            posoda,
            zacetna_kolicina_kg,
            status,
            opomba
        } = req.body;

    if (!prevzem_sadja_id || !datum_zacetka ||
        !posoda || zacetna_kolicina_kg == null || !status)
     {
        return res.status(400).json({
            sporocilo: "Obvezna polja niso izpolnjena!"
            });
    } 

    const [result] = await pool.query(
        `UPDATE fermentacija SET prevzem_sadja_id = ?,
                                 datum_zacetka = ?,
                                 datum_zakljucka = ?,
                                 posoda = ?,
                                 zacetna_kolicina_kg = ?,
                                 status = ?,
                                 opomba = ?
                                 WHERE id = ?`,
                                 [ prevzem_sadja_id,
                                   datum_zacetka,
                                   datum_zakljucka || null,
                                   posoda,
                                   zacetna_kolicina_kg,
                                   status,
                                   opomba || null, id ] );

     if (result.affectedRows === 0) {
        return res.status(404).json({
          sporocilo: "Fermentacija ni najdena!"
        });
      }

      res.json({
        sporocilo: "Fermentacija uspešno posodobljena!"
      });

    } catch (error){
      res.status(500).json({
      sporocilo: "Napaka pri posodabljanju fermentacije!",
      napaka: error.message
    });
    }
});

//DELETE METODA
router.delete("/:id", async (req, res) => {
  try{
      const id = req.params.id;

      const [result] = await pool.query(
        "DELETE FROM fermentacija WHERE id=?", [id]
      );

      if (result.affectedRows === 0) {
        return res.status(400).json({
          sporocilo: "Fermentacija ni najdena!"
        });

      }
      
        res.json({
          sporocilo: "Fermentacija uspešno izbrisana!"
        });

  } catch (error){
    res.status(500).json({
      sporocilo: "Napaka pri brisanju fermentacije!",
      napaka: error.message
    });
  }
});

module.exports = router;