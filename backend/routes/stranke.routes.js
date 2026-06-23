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



module.exports = router;

