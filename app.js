
const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash')
let Datastore = require('nedb');
let db = new Datastore({filename : 'users'});
db.loadDatabase();


const token = '1052961090:AAHXOU3E9WAS6KtuFeK4c9KcCevxlRXEhWM';
const bot = new TelegramBot(token, {polling: true});

const getNewEmotion = (chatId) => {
  bot.sendMessage(chatId, 'выбери, какую эмоцию ты сейчас испытываешь?', {
    reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '😊 - Радость',
                  callback_data: 'Радость'
                },
                {
                  text: '🤬 - Гнев',
                  callback_data: 'Гнев'
                }],


                [{
                  text: '😔 - Печаль',
                  callback_data: 'Печаль'
                },
                {
                  text: '😌 - Спокойствие',
                  callback_data: 'Спокойствие'
                }],


                [{
                  text: '😤 - Раздражение',
                  callback_data: 'Раздражение'
                },
                {
                  text: '😱 - Страх',
                  callback_data: 'Страх'
                }],


                [{
                  text: '🤩 - Воодушевление',
                  callback_data: 'Воодушевление'
                },
                {
                  text: '😒 - Обида',
                  callback_data: 'Обида'
                }],


                [{
                  text: '😑 - Тоска',
                  callback_data: 'Тоска'
                },
                {
                  text: '😍 - Любовь',
                  callback_data: 'Любовь'
                }],


                [{
                  text: '🤨 - Ревность',
                  callback_data: 'Ревность'
                },
                {
                  text: '😬 - Тревога',
                  callback_data: 'Тревога'
                }],


                [{
                  text: '😧 - Зависть',
                  callback_data: 'Зависть'
                },
                {
                  text: '😖 - Волнение',
                  callback_data: 'Волнение'
                }],


                [{
                  text: '😰 - Стыд',
                  callback_data: 'Стыд'
                },
                {
                  text: '🙏 - Благодарность',
                  callback_data: 'Благодарность'
                }],


                [{
                  text: '😩 - Отчаяние',
                  callback_data: 'Отчаяние'
                },
                {
                  text: '😟 - Неловкость',
                  callback_data: 'Неловкость'
                }],

                [
                {
                  text: 'На сегодня все',
                  callback_data: 'end'
                }
              ]
            ]
          }
      });
      }

bot.onText(/\/start/, (msg, match) => {

  const chatId = msg.chat.id;
  getNewEmotion(chatId)
  
  });

      

const getCurrentDate = () => { 
  Data = new Date();
  Year = Data.getFullYear();
  Month = Data.getMonth() + 1;
  Day = Data.getDate();
  Hour = Data.getHours();
  Minutes = Data.getMinutes();
  return {'Year' : Year, 'Month' : Month , 'Day' : Day , 'Hour' : Hour , 'Minutes' : Minutes }
};

const getDiffDays = () => {
  const today = Date.now()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9,0,0,0)
  const tomorrowDateInMS = tomorrow.getTime();
  return tomorrowDateInMS - today;
}

bot.on("polling_error", (err) => console.log(err));

bot.on('callback_query', query => {
  console.log(query)
  const id = query.message.chat.id;
  const callbackData = query.data;
  const currentDate = getCurrentDate();


  if (callbackData === 'end') {
    bot.sendMessage(id, 'Спасибо, следующее напоминание будет завтра в 9.00')
    setTimeout(() => getNewEmotion(id), getDiffDays())
    getDayStatistics(id)

  } else {
    db.insert({user : id, ... currentDate, emotion: callbackData});
    bot.sendMessage(id, 'Спасибо, следующее напоминание будет через час')
    setTimeout(() => getNewEmotion(id), 5000)
  }
  
});

 
  const getDayStatistics = (id) => {
    Data = new Date();
    Day = Data.getDate();
    db.find({user: id, Day: Day}, function (err, docs) {
        const dailyEmotions = docs.map((item) => item.emotion)
        const dailyEmotionsStatistic = dailyEmotions.reduce((acc, item) => {
          if (_.has(acc, item)) {
            acc[item] += 1
          } else {
            acc[item] = 1
          }
          return acc
        }, {})
        console.log(dailyEmotionsStatistic)
        bot.sendMessage(id, `Ваша статистика за день:\n${formatStat(dailyEmotionsStatistic)}`)

    })
  
}

const formatStat = (obj) => {
  let result = '';
  for (let item in obj) {
     result += `${item}: ${obj[item]}\n`
  }
  return result;
}


// 
      
