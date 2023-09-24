const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const cartRoutes = require('./routes/cartRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const redirectOnLoginRoute = require('./routes/auth');
const User = require('./models/user');

const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://andrew:1234@cluster0.taoc8gg.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(productRoutes);
app.use(cartRoutes);

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => res.render('frontpage'));
app.get('/shopping', (req, res) => res.render('customer'));
app.get('/products', (req, res) => res.render('products'));
app.get('/cart', (req, res) => res.render('cart'));
app.get('/myaccount', (req, res) => res.render('myaccount'));
app.get('/shipper', (req, res) => res.render('shipper'));
app.get('/login', (req, res) => res.render('login'));
app.get('/product-detail', (req, res) => res.render('product-detail'));
app.get('/login/register', (req, res) => res.render('user'));
app.get('/customer', (req, res) => res.render('customer'));
app.get('/login/register/customer-registration-form', (req, res) => res.render('customer-register'));
app.get('/login/register/vendor-registration-form', (req, res) => res.render('vendor-register'));
app.get('/login/register/shipper-registration-form', (req, res) => res.render('shipper-register'));
app.get('/contact-us', (req, res) => res.render('contact-us'));
app.get('/about-us', (req, res) => res.render('about-us'));

app.use(vendorRoutes);
app.use(customerRoutes);
app.use('/auth', redirectOnLoginRoute);

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('Authenticating user:', username); // Log the username being authenticated
      const user = await User.findOne({ username });
      if (!user) {
        console.log('User not found:', username); // Log if the user is not found
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Incorrect password for user:', username); // Log if the password is incorrect
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      console.log('User authenticated successfully:', username); // Log if the user is authenticated successfully
      return done(null, user);
    } catch (err) {
      console.error('Error during authentication:', err); // Log any errors during authentication
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login', // redirect back to the login page on failure
}), (req, res) => {
  console.log('User authenticated:', req.user); // Log the authenticated user
  if (req.isAuthenticated()) {
    // Check the role of the user and redirect accordingly
    switch (req.user.role) {
      case 'shipper':
        res.redirect('/shipper');
        break;
      case 'vendor':  
        res.redirect('/vendor');
        break;
      case 'customer':
        res.redirect('/customer');
        break;
      default:
        res.redirect('/login'); // Redirect to login page if role is not recognized
    }
  } else {
    res.redirect('/login'); // Redirect to login page if not authenticated
  }
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


app.get('/protected-route', ensureAuthenticated, (req, res) => res.send('This is a protected route'));

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
