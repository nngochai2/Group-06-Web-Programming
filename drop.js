//  RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023B
// Assessment: Assignment 2
// Author: Group 6
// ID: Pham Thanh Mai (s3978365)
//      Nguyen Ngoc Hai (s3978281)
//      Phan Nguyen Viet Nhan (s3978145)
//      Tran Nhat Minh (s3977767)
//      Nguyen Duy Anh (s4022628)
// Acknowledgement: Bootstrap, FontAwesome , Ion-icon, W3School, Freepik
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
