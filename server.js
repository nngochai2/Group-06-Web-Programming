const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(logger);

app.get("/", (req, res) => {
    console.log("Here");
    res.render(index)
})

// Setup middleware
function logger(req, res, next) {
    console.log(req.originalUrl);
    next()
}

app.listen(5000);