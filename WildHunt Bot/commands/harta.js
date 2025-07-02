
const User = require('../models/user');
const hartaList = require('../data/harta');

const cooldown = 15 * 60 * 1000;
const cooldownMap = new Map();

module.exports = {
  name: 'harta',
  async execute(message) {
    const userId = message.author.id;
    const now = Date.now();
    const lastUsed = cooldownMap.get(userId);

    if (lastUsed && now - lastUsed < cooldown) {
      const timeLeft = Math.ceil((cooldown - (now - lastUsed)) / 60000);
      return message.reply(`🧭 Kamu sedang kelelahan mencari harta. Coba lagi dalam ${timeLeft} menit.`);
    }

    const chances = [
      ...Array(45).fill('umum'),
      ...Array(25).fill('langka'),
      ...Array(15).fill('epik'),
      ...Array(10).fill('legendaris'),
      ...Array(5).fill('zonk')
    ];
    const pickedType = chances[Math.floor(Math.random() * chances.length)];

    const possibleHarta = hartaList.filter(h => pickedType === 'zonk' ? h.zonk : h.rarity === pickedType);
    const harta = possibleHarta[Math.floor(Math.random() * possibleHarta.length)];

    let user = await User.findOne({ userId });
    if (!user) user = new User({ userId });

    if (!harta.zonk) {
      user.saldo += harta.hadiah;
      await user.save();
      message.reply(`🏴‍☠️ Kamu menemukan ${harta.nama} dan mendapatkan 💰 ${harta.hadiah} koin! [${harta.rarity.toUpperCase()}]`);
    } else {
      message.reply(`😢 Kamu menemukan ${harta.nama}... Sayangnya isinya kosong.`);
    }

    cooldownMap.set(userId, now);
  }
};
