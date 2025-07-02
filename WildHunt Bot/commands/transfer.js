
const User = require('../models/user');

module.exports = {
  name: 'transfer',
  async execute(message, args) {
    const target = message.mentions.users.first();
    const jumlah = parseInt(args[1]);

    if (!target || isNaN(jumlah) || jumlah <= 0) {
      return message.reply('⚠️ Format salah! Contoh: `!transfer @user 100`');
    }

    const senderId = message.author.id;
    const receiverId = target.id;

    if (senderId === receiverId) return message.reply('😒 Tidak bisa transfer ke diri sendiri.');

    const sender = await User.findOne({ userId: senderId }) || new User({ userId: senderId });
    const receiver = await User.findOne({ userId: receiverId }) || new User({ userId: receiverId });

    if (sender.saldo < jumlah) {
      return message.reply('❌ Saldo kamu tidak cukup.');
    }

    sender.saldo -= jumlah;
    receiver.saldo += jumlah;

    await sender.save();
    await receiver.save();

    message.reply(`✅ Kamu telah mentransfer ${jumlah} koin ke ${target.username}.`);
  }
};
