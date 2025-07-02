
const User = require('../models/user');

module.exports = {
  name: 'saldo',
  async execute(message) {
    let user = await User.findOne({ userId: message.author.id });
    if (!user) {
      user = new User({ userId: message.author.id });
      await user.save();
    }
    message.reply(`💰 Saldo kamu: ${user.saldo} koin.`);
  }
};
