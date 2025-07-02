
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  saldo: { type: Number, default: 0 },
  lastWork: { type: Date, default: new Date(0) },
});

module.exports = mongoose.model('User', userSchema);
