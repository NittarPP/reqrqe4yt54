const { Client, GatewayIntentBits, ActivityType, TextChannel } = require('discord.js');
require('dotenv').config();
const express = require('express');

const client = new Client({
  intents: Object.values(GatewayIntentBits)
});

const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment or default to 3000

app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});

app.listen(port, () => {
  console.log(`🔗 Listening to Nittar: http://localhost:${port}`);
  console.log(`🔗 Powered By Nittar`);
});

const statusMessages = [process.env.STATUS_1, process.env.STATUS_2]; // Update environment variable names to be more descriptive
let currentIndex = 0;
const channelId = process.env.CHANNEL_ID; // Provide the channel ID here

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|    🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages() {
  const currentStatus = statusMessages[currentIndex];

  // Update the bot's presence
  client.user.setPresence({
    activities: [{ name: currentStatus, type: 'CUSTOM_STATUS' }],
    status: 'dnd',
  });

  // Find the text channel and send the status message
  const textChannel = client.channels.cache.get(channelId);

  if (textChannel instanceof TextChannel) {
    textChannel.send(`Bot status is: ${currentStatus}`).catch(console.error);
  } else {
    console.error(`Channel with ID ${channelId} not found or not a text channel.`);
  }

  currentIndex = (currentIndex + 1) % statusMessages.length;
}

client.once('ready', () => {
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✅ Bot is ready as ${client.user.tag}`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ✨HAPPY NEW YEAR MY DEAR FAMILY`);
  console.log(`\x1b[36m%s\x1b[0m`, `|    ❤️WELCOME TO 2024`);
  updateStatusAndSendMessages();

  // Schedule status updates every 10 seconds
  setInterval(updateStatusAndSendMessages, 10000);
});

login();
