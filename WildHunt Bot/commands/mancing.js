
const User = require('../models/user');
const ikanList = require('../data/ikan');

const cooldown = 10 * 60 * 1000;
const cooldownMap = new Map();

module.exports = {
  name: 'mancing',
  async execute(message) {
    const userId = message.author.id;
    const now = Date.now();
    const lastUsed = cooldownMap.get(userId);

    if (lastUsed && now - lastUsed < cooldown) {
      const timeLeft = Math.ceil((cooldown - (now - lastUsed)) / 60000);
      return message.reply(`🎣 Kamu sedang menunggu umpan dimakan. Coba lagi dalam ${timeLeft} menit.`);
    }

    const chances = [
      ...Array(40).fill('umum'),
      ...Array(25).fill('langka'),
      ...Array(15).fill('epik'),
      ...Array(10).fill('legendaris'),
      ...Array(10).fill('zonk')
    ];
    const pickedType = chances[Math.floor(Math.random() * chances.length)];

    const hasil = ikanList.filter(i => pickedType === 'zonk' ? i.zonk : i.rarity === pickedType);
    const ikan = hasil[Math.floor(Math.random() * hasil.length)];

    let user = await User.findOne({ userId });
    if (!user) user = new User({ userId });

    if (!ikan.zonk) {
      user.saldo += ikan.hadiah;
      await user.save();
      message.reply(`🐡 Kamu berhasil menangkap ${ikan.nama} dan mendapatkan 💰 ${ikan.hadiah} koin! [${ikan.rarity.toUpperCase()}]`);
    } else {
      message.reply(`😅 Kamu menarik kail dan mendapatkan... ${ikan.nama}. Coba lagi lain kali.`);
    }

    cooldownMap.set(userId, now);
  }
};
