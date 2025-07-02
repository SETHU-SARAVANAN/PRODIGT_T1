
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/authSystem');


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
