const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://andrew:1234@cluster0.taoc8gg.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Drop the existing unique index on the email field
    mongoose.connection.collection('users').dropIndex('email_1', function(err, result) {
      if (err) {
        console.error('Error dropping index:', err);
      } else {
        console.log('Dropped index:', result);
      }
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
