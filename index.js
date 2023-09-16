const express = require('express')
const app = express()
const port = 3000




// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Define a route to render an EJS template
app.get('/', (req, res) => {
  res.render('frontpage'); 
});
app.get('/shopping', (req, res) => {
  res.render('customer'); 
});
app.get('/products', (req, res) => {
  res.render('products'); 
});
app.get('/cart', (req, res) => {
  res.render('cart'); 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  // Handle errors here
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
})