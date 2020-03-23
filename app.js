
const TelegramBot = require('node-telegram-bot-api');



const { getToken }  = require('./token.js');

const { handleStart, handleMessage } = require('./handlers.js')




const token = getToken();
const bot = new TelegramBot(token, {polling: true});



bot.onText(/\/start/, (msg) => handleStart(msg, bot));

bot.on('callback_query', query => handleMessage(query, bot));

bot.on("polling_error", (err) => console.log(err));

