
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();

// Load command files
fs.readdirSync('./commands').forEach(file => {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
});

mongoose.connect(process.env.MONGO_URI);

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const args = message.content.slice(1).split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) {
    client.commands.get(command).execute(message, args);
  }
});

client.login(process.env.TOKEN);
