import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes";
import { db } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
db.setup();

app.get('/', (req, res) => {
  res.send('API de distribuição de cartas está rodandoooooooooo!');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
