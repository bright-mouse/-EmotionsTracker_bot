const { getNewEmotion } = require('./emotions.js')
const { getDayStatistics } = require('./statistics.js')
const { getCurrentDate, getMStoTommorowMorning, getNoticeInterval} = require('./date.js');
const Datastore = require('nedb');

const db = new Datastore({filename : 'users'});
db.loadDatabase();

const handleMessage = (query, bot) => {
  const id = query.message.chat.id;
  const callbackData = query.data;
 
  if (isEndButtonClicked(callbackData)) {
    bot.sendMessage(id, 'Спасибо, следующее напоминание будет завтра в 9.00\nВаша статистика за день:');
    setTimeout(() => getNewEmotion(id), getMStoTommorowMorning());
    getDayStatistics(id, 1, bot);
  } else if (isStatOfTreeDaysButtonClicked(callbackData)) {
    bot.sendMessage(id, 'Ваша статистика за три дня:');
    getDayStatistics(id, 3, bot);
  } else if (isStatOfSevenDaysButtonClicked(callbackData)) {
    bot.sendMessage(id, 'Ваша статистика за неделю:');
    getDayStatistics(id, 7, bot);
  } else {
    const currentDate = getCurrentDate()
    db.insert({user : id, date: currentDate, emotion: callbackData});
    bot.sendMessage(id, 'Спасибо, следующее напоминание будет через час')
    setTimeout(() => getNewEmotion(id, bot), getNoticeInterval())
  }
};

const handleStart = (msg, bot) => {
  const chatId = msg.chat.id;
  getNewEmotion(chatId, bot)
}


const isEndButtonClicked = (callbackData) => {
  if (callbackData === 'end') {
    return true
  } 
  return false
};

const isStatOfTreeDaysButtonClicked = (callbackData) => {
  if (callbackData === 'statOfTreeDays') {
    return true
  } 
  return false
};

const isStatOfSevenDaysButtonClicked = (callbackData) => {
  if (callbackData === 'statOfSevenDays') {
    return true
  } 
  return false
};
module.exports = { handleStart, handleMessage }