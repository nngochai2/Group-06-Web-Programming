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
app.get('/myaccount', (req, res) => {
  res.render('myaccount'); 
});
app.get('/shipper', (req, res) => {
  res.render('shipper'); 
});
app.get('/vendor', (req, res) => {
  res.render('vendor'); 
});
app.get('/product-detail', (req, res) => {
  res.render('product-detail'); 
});
+app.get('/login', (req, res) => {
  res.render('login'); 
});
app.get('/login/register', (req, res) => {
  res.render('user'); 
});
app.get('/login/register/customer-registration-form', (req, res) => {
  res.render('customer-register'); 
});
app.get('/login/register/vendor-registration-form', (req, res) => {
  res.render('vendor-register'); 
});
app.get('/login/register/shipper-registration-form', (req, res) => {
  res.render('shipper-register'); 
});
app.get('/contact-us', (req, res) => {
  res.render('contact-us'); 
});
app.get('/about-us', (req, res) => {
  res.render('about-us'); 
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  // Handle errors here
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
})