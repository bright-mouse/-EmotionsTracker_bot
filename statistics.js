const { getSomePriviosDay} = require('./date.js');
const { emotions } = require('./emotions.js');
const _ = require('lodash')

const Datastore = require('nedb');

const clc = require('cli-color');
const db = new Datastore({filename : 'users'});
db.loadDatabase();

const getDayStatistics = (id, daysAgo, bot) => {
  somePriviosDay = getSomePriviosDay(daysAgo);
  db.find({user: id, date: { $gt: somePriviosDay }}, function (err, docs) {

      const dailyEmotions = docs.map((item) => item.emotion)
      const emotionCountByTypes = dailyEmotions.reduce((acc, item) => {
        if (_.has(acc, item)) {
          acc[item] += 1
        } else {
          acc[item] = 1
        }
        return acc
      }, {})
      console.log('result', emotionCountByTypes)
      bot.sendMessage(id, formatStat(emotionCountByTypes))

  })

}

const formatStat = (emotionCountByTypes) => {
  let result = '';
  
  for (let emotionCode in emotionCountByTypes) {
    console.log('emotionCode', emotionCode)
     const displayName = emotions[emotionCode].displayName
     const counterOfEmotions = emotionCountByTypes[emotionCode]
     result += `${displayName}: ${counterOfEmotions}\n`
  }
  return result;
};

module.exports = { getDayStatistics };