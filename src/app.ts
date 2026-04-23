import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");
 
app.get("/", (req, res ) => {
    res.render("home");
});

export default app;
