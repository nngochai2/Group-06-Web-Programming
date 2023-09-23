const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // 'customer', 'vendor', or 'shipper'

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
