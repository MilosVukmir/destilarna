const express = require("express");

const router = express.Router();

const dobavitelji = [
  { id: 1, ime: "Mirko Petrović" },
  { id: 2, ime: "Ivan Horvat" }
];

router.get("/", (req, res) => {
  res.json(dobavitelji);
});

module.exports = router;