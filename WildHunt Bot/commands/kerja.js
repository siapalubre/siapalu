
const User = require('../models/user');

module.exports = {
  name: 'kerja',
  async execute(message) {
    const userId = message.author.id;
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
    }

    const now = new Date();
    const cooldown = 60 * 60 * 1000;

    if (now - user.lastWork < cooldown) {
      const wait = Math.ceil((cooldown - (now - user.lastWork)) / 60000);
      return message.reply(`⏳ Kamu sudah bekerja. Tunggu ${wait} menit lagi.`);
    }

    const gaji = Math.floor(Math.random() * 200) + 100;
    user.saldo += gaji;
    user.lastWork = now;
    await user.save();

    message.reply(`💼 Kamu bekerja dan mendapatkan ${gaji} koin!`);
  }
};
