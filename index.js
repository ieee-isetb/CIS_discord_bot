const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const http = require("http");
dotenv.config();

const port = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("I'm alive");
  } else {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.end("Method Not Allowed");
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // required to read messages
  ],
});

const VERIF_CHANNEL = process.env.VERIF_CHANNEL;
const CUSTOM_REPLY = "<@&1289590923973496912> <@&1289597166276444181> A new user has joined! Please verify them.";

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  // Ignore bot messages
  if (message.author.id === client.user.id) return;

  // Check if it's the verification channel
  if (message.channel.id === VERIF_CHANNEL) {
    try {
      await message.reply(CUSTOM_REPLY);
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  }
});

client.login(process.env.TOKEN);