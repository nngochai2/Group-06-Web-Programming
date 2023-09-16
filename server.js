//const express = require('express');
//const app = express();

//app.set('view engine', 'ejs');
//app.use(logger);

//app.get("/", (req, res) => {
//    console.log("Here");
//    res.render(index)
//})

// Setup middleware
//function logger(req, res, next) {
//    console.log(req.originalUrl);
//    next()
//}

//app.listen(5000);

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

// Configure Express Session
app.use(
  session({
    secret: '1234', // Replace with a secure secret key(Dang la 1234)
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/user_auth'; // Replace with your MongoDB connection string
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

// Signup 
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
        res.status(500).json({ message: 'Server error' }); 
    }
});


// Render the signin page
app.get('/signin', (req, res) => {
    res.render('signin', { message: '' });
});

// Signin 
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
