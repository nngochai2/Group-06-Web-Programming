import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.set('views','/src/views/pages/index.ejs');
app.set("view engine", "ejs");

app.listen(PORT)