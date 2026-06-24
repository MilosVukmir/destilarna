const express = require("express");
const cors = require("cors");

const dobaviteljiRoutes = require("./routes/dobavitelji.routes");
const strankeRoutes = require("./routes/stranke.routes");
const sadjeRoutes = require("./routes/sadje.routes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Backend za destilarno deluje.</h1>");
});

app.use("/dobavitelji", dobaviteljiRoutes);
app.use("/stranke", strankeRoutes);
app.use("/sadje", sadjeRoutes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Strežnik teče na portu ${port}`);
});