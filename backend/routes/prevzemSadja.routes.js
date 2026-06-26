const express = require("express");
const pool = require("../db/conections");

const router = express.Router();

//GET METODA
router.get("/", async (req, res) => {
  try{
    const iskanje = req.query.iskanje;

    let sql = `SELECT
               prevzem_sadja.id,

               prevzem_sadja.dobavitelj_id,
               dobavitelj.ime_ali_naziv AS dobavitelj,

               prevzem_sadja.sadje_id,
               sadje.naziv AS sadje,
               
               prevzem_sadja.datum_prevzema,
               prevzem_sadja.kolicina_kg,
               prevzem_sadja.cena_na_kg,
               prevzem_sadja.skupna_cena,
               prevzem_sadja.opomba
               FROM prevzem_sadja
               JOIN dobavitelj ON prevzem_sadja.dobavitelj_id = dobavitelj.id
               JOIN sadje ON prevzem_sadja.sadje_id = sadje.id`;
    
    let params = [];

    if (iskanje) {
      sql +=` WHERE dobavitelj.ime_ali_naziv LIKE ?
              OR sadje.naziv LIKE ?
              OR prevzem_sadja.opomba LIKE ?`;

      const iskalniNiz = `%${iskanje}%`;
      params = [ iskalniNiz,
                 iskalniNiz,
                 iskalniNiz ];
    }
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (error){
    res.status(500).json({
      sporocilo: "Napaka pri pridobijanju podatkov o prevzemu sadja!",
      napaka: error.message,
    });
  }
});

// POST METODA
router.post("/", async (req, res) => {
    try {

        const {
            dobavitelj_id,
            sadje_id,
            datum_prevzema,
            kolicina_kg,
            cena_na_kg,
            skupna_cena,
            opomba
        } = req.body;

        if (
            !dobavitelj_id ||
            !sadje_id ||
            !datum_prevzema ||
            kolicina_kg == null ||
            cena_na_kg == null ||
            skupna_cena == null
        ) {
            return res.status(400).json({
                sporocilo: "Obvezna polja niso izpolnjena!"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO prevzem_sadja
            (
                dobavitelj_id,
                sadje_id,
                datum_prevzema,
                kolicina_kg,
                cena_na_kg,
                skupna_cena,
                opomba
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                dobavitelj_id,
                sadje_id,
                datum_prevzema,
                kolicina_kg,
                cena_na_kg,
                skupna_cena,
                opomba || null
            ]
        );

        res.status(201).json({
            sporocilo: "Prevzem sadja uspešno dodan!"
        });

    } catch (error) {
        res.status(500).json({
            sporocilo: "Napaka pri dodajanju prevzema sadja!",
            napaka: error.message
        });
    }
});

//PUT METODA
router.put("/:id", async (req, res) => {
  try{
      const id = req.params.id;

      const {
           dobavitelj_id,
            sadje_id,
            datum_prevzema,
            kolicina_kg,
            cena_na_kg,
            skupna_cena,
            opomba 
      } = req.body;

      if (!dobavitelj_id || !sadje_id || !datum_prevzema ||
          kolicina_kg == null || cena_na_kg == null || 
          skupna_cena == null ) {
            
            return res.status(400).json({
              sporocilo: "Nisu izpolnjena vsa obvezna polja!"
            });
      }
      const [result] = await pool.query(
        `UPDATE prevzem_sadja SET dobavitelj_id = ?,
                                  sadje_id = ?,
                                  datum_prevzema = ?,
                                  kolicina_kg = ?,
                                  cena_na_kg = ?,
                                  skupna_cena = ?,
                                  opomba = ?
                                  WHERE id = ?`,
                                  [ dobavitelj_id, sadje_id,
                                    datum_prevzema, kolicina_kg,
                                    cena_na_kg, skupna_cena,
                                    opomba || null, id ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          sporocilo: "Prevzem ni najden!"
        });
      }

      res.json({
        sporocilo: "Prevzem uspešno posodobljen!"
      });

  } catch (error) {
    res.status(500).json({
      sporocilo: "Napaka pri posodabljanju prevzema!",
      napaka: error.message
    });
  }
});

//DELETE METODA
router.delete("/:id", async (req, res) => {
  try{
      const id = req.params.id;

      const [result] = await pool.query(
        "DELETE FROM prevzem_sadja WHERE id=?", [id]
      );

      if (result.affectedRows === 0) {
        return res.status(400).json({
          sporocilo: "Prevzem ni najden!"
        });

      }
      
        res.json({
          sporocilo: "Prevzem uspešno izbrisan!"
        });

  } catch (error){
    res.status(500).json({
      sporocilo: "Napaka pri brisanju prevzema!",
      napaka: error.message
    });
  }
});

module.exports = router;
