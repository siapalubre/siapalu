
const User = require('../models/user');
const hewanList = require('../data/hewan');

const cooldown = 10 * 60 * 1000;
const cooldownMap = new Map();

module.exports = {
  name: 'berburu',
  async execute(message) {
    const userId = message.author.id;
    const lastUsed = cooldownMap.get(userId);
    const now = Date.now();
    if (lastUsed && now - lastUsed < cooldown) {
      const timeLeft = Math.ceil((cooldown - (now - lastUsed)) / 60000);
      return message.reply(`⏳ Kamu kelelahan. Coba berburu lagi dalam ${timeLeft} menit.`);
    }

    const chances = [
      ...Array(50).fill('umum'),
      ...Array(30).fill('langka'),
      ...Array(15).fill('epik'),
      ...Array(5).fill('legendaris')
    ];
    const pickedRarity = chances[Math.floor(Math.random() * chances.length)];

    const possibleAnimals = hewanList.filter(h => h.rarity === pickedRarity);
    const hewan = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];

    let user = await User.findOne({ userId });
    if (!user) user = new User({ userId });

    user.saldo += hewan.hadiah;
    await user.save();

    cooldownMap.set(userId, now);

    message.reply(`🎯 Kamu berhasil memburu ${hewan.nama} dan mendapatkan 💰 ${hewan.hadiah} koin! [${hewan.rarity.toUpperCase()}]`);
  }
};
