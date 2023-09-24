const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path if necessary

const mongoURI = 'mongodb+srv://andrew:1234@cluster0.taoc8gg.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Sample users
const sampleUsers = [
  {
    username: 'customer5',
    password: 'hello',
    role: 'customer',
    email: 'customer1123@example.com',
    fullName: 'Customer123 One',
    address: '123 Customer123 St',
    phoneNumber: '1234567891230',
  },
  // Add more sample users as needed
];

// Hash passwords and save users
sampleUsers.forEach(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({ ...user, password: hashedPassword });
    await newUser.save();
    console.log(`User ${user.username} saved.`);
  } catch (err) {
    console.error('Error saving user:', err);
  }
});
