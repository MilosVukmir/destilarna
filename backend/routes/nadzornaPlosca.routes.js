import { Router } from "express";
import pool from "../db/conections.js";

const router = Router();


//GET METODA
router.get("/", async(req, res) => {
    
    try{
    const [[dobavitelji]] = await pool.query(
        "SELECT COUNT(*) AS skupaj FROM dobavitelj"
    );

    const [[destilacije]] = await pool.query(
        "SELECT COUNT(*) AS skupaj FROM destilacija"
    );

    const [[prodaja]] = await pool.query(
        "SELECT COUNT(*) AS skupaj FROM prodaja"
    );

    const [[stranke]] = await pool.query(
        "SELECT COUNT(*) AS skupaj FROM stranka"
    );

    res.json({
        dobavitelji: dobavitelji.skupaj,
        destilacije: destilacije.skupaj,
        prodaja: prodaja.skupaj,
        stranke: stranke.skupaj,
    });
    } catch (error){
        res.status(500).json({
            sporocilo: "Napaka pri pridobivanju podatkov za nadzorno ploščo!",
            napaka: error.message
        });
    }
});
export default router;