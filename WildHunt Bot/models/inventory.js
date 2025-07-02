const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  userId: String,
  items: [{
    nama: String,
    jumlah: Number
  }]
});

module.exports = mongoose.model('Inventory', inventorySchema);
