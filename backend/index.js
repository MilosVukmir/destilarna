import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import dobaviteljiRoutes from "./routes/dobavitelji.routes.js";
import strankeRoutes from "./routes/stranke.routes.js";
import sadjeRoutes from "./routes/sadje.routes.js";
import prevzemSadjaRoutes from "./routes/prevzemSadja.routes.js";
import serijaZganjaRoutes from "./routes/serijaZganja.routes.js";
import sodiRoutes from "./routes/sodi.routes.js";
import prodajaRoutes from "./routes/prodaja.routes.js";
import fermentacijaRoutes from "./routes/fermentacija.routes.js";
import destilacijaRoutes from "./routes/destilacija.routes.js";
import nadzornaPloscaRoutes from "./routes/nadzornaPlosca.routes.js";
import uporabnikiRoutes from "./routes/uporabniki.routes.js";
import loginRoutes from "./routes/login.routes.js";

const app = express();
const port = process.env.PORT || 30169;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reactBuildPath = path.join(__dirname, "dist");

app.use(cors());
app.use(express.json());

app.use("/dobavitelji", dobaviteljiRoutes);
app.use("/stranke", strankeRoutes);
app.use("/sadje", sadjeRoutes);
app.use("/prevzemsadja", prevzemSadjaRoutes);
app.use("/serijazganja", serijaZganjaRoutes);
app.use("/sodi", sodiRoutes);
app.use("/prodaja", prodajaRoutes);
app.use("/fermentacija", fermentacijaRoutes);
app.use("/destilacija", destilacijaRoutes);
app.use("/nadzornaplosca", nadzornaPloscaRoutes);
app.use("/uporabniki", uporabnikiRoutes);
app.use("/login",loginRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Strežnik teče na portu ${port}`);
});