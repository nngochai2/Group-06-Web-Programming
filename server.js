const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 3000;

// Configure EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
const mongoURI = 'mongodb+srv://andrew:1234@cluster0.9ic6ttr.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Create a User model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Render the signup page
app.get('/signup', (req, res) => {
  res.render('signup', { message: '' });
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('signup', { message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.render('signup', { message: 'User created' });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Server error' }); // You can modify this response for better error handling
    }
  });
  

// Render the signin page
app.get('/signin', (req, res) => {
  res.render('signin', { message: '' });
});

// Signin endpoint
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.render('signin', { message: 'Authentication failed' });
    }

    // Check if the provided password matches the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.render('signin', { message: 'Authentication failed' });
    }

    // Store user data in the session
    req.session.user = {
      userId: user._id,
      username: user.username,
    };

    res.redirect('/welcome');
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route protection middleware
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/signin');
  }
  next();
};

// Welcome page
app.get('/welcome', requireAuth, (req, res) => {
  res.render('welcome', { username: req.session.user.username });
});

// Sign out
app.get('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Session could not be destroyed' });
    }
    res.redirect('/signin');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
