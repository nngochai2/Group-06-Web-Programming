const mongoose = require('mongoose');


const mongoURI = 'mongodb://localhost:27017/user_auth'; // Replace voi cai localhost

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const User = mongoose.model('User', {
    username: String,
    password: String,
});

module.exports = { connectDB, User };
