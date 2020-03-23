var emotions = {
  joy: 
  {
    displayName: 'Радость',
    emoji: '😊',
    code: 'joy',
  },
  anger:
  {
    displayName: 'Гнев',
    emoji: '🤬',
    code: 'anger',
  },
  sadness:
  {
    displayName: 'Печаль',
    emoji: '😔',
    code: 'sadness'
  },
  calm:
  {
    displayName: 'Спокойствие',
    emoji: '😌',
    code: 'calm'
  },
  irritation:
  {
    displayName: 'Раздражение',
    emoji: '😤',
    code: 'irritation'
  },
  fear: 
  {
    displayName: 'Страх',
    emoji: '😱',
    code: 'fear'
  },
  inspiration:
  {
    displayName: 'Воодушевление',
    emoji: '🤩',
    code: 'inspiration'
  },
  harm:
  {
    displayName: 'Обида',
    emoji: '😒',
    code: 'harm'
  },
  melancholy:
  {
    displayName: 'Тоска',
    emoji: '😑',
    code: 'melancholy'
  },
  love:
  {
    displayName: 'Любовь',
    emoji: '😍',
    code: 'love'
  },
  jealousy:
  {
    displayName: 'Ревность',
    emoji: '🤨',
    code: 'jealousy'
  },
  anxiety:
  {
    displayName: 'Тревога',
    emoji: '😬',
    code: 'anxiety'
  },
  envy:
  {
    displayName: 'Зависть',
    emoji: '😧',
    code: 'envy'
  },
  worry:
  {
    displayName: 'Волнение',
    emoji: '😖',
    code: 'worry'
  },
  shame: 
  {
    displayName: 'Стыд',
    emoji: '😰',
    code: 'shame'
  },
  gratitude:
  {
    displayName: 'Благодарность',
    emoji: '🙏',
    code: 'gratitude'
  },
  hopelessness:
  {
    displayName: 'Отчаяние',
    emoji: '😩',
    code: 'hopelessness'
  },
  awkwardness: {
    displayName: 'Неловкость',
    emoji: '😟',
    code: 'awkwardness'
  }
};

const getKeyboard = (emotions) => {
  console.log(emotions)
    return {
      inline_keyboard: [
        [
          {
            text:  `${emotions.joy.emoji} - ${emotions.joy.displayName}`,
            callback_data: emotions.joy.code
          },
          {
            text:  `${emotions.anger.emoji} - ${emotions.anger.displayName}`,
            callback_data: emotions.anger.code
          },],


          [
            {
            text:  `${emotions.sadness.emoji} - ${emotions.sadness.displayName}`,
            callback_data: emotions.sadness.code
          },
          {
            text:  `${emotions.calm.emoji} - ${emotions.calm.displayName}`,
            callback_data: emotions.calm.code
          },
          ],
          
          [
            {
            text:  `${emotions.irritation.emoji} - ${emotions.irritation.displayName}`,
            callback_data: emotions.irritation.code
          },
          {
            text:  `${emotions.fear.emoji} - ${emotions.fear.displayName}`,
            callback_data: emotions.fear.code
          }
          ],


          [
            {
            text:  `${emotions.inspiration.emoji} - ${emotions.inspiration.displayName}`,
            callback_data: emotions.inspiration.code
          },
          {
            text:  `${emotions.harm.emoji} - ${emotions.harm.displayName}`,
            callback_data: emotions.harm.code
          }
          ],


          [
            {
            text:  `${emotions.melancholy.emoji} - ${emotions.melancholy.displayName}`,
            callback_data: emotions.melancholy.code
          },
          {
            text:  `${emotions.love.emoji} - ${emotions.love.displayName}`,
            callback_data: emotions.love.code
          }
        ],


          [
            {
            text:  `${emotions.jealousy.emoji} - ${emotions.jealousy.displayName}`,
            callback_data: emotions.jealousy.code
          }, 
          {
            text:  `${emotions.anxiety.emoji} - ${emotions.anxiety.displayName}`,
            callback_data: emotions.anxiety.code
          }
        ],


          [
            {
            text:  `${emotions.envy.emoji} - ${emotions.envy.displayName}`,
            callback_data: emotions.envy.code
          },
          {
            text:  `${emotions.worry.emoji} - ${emotions.worry.displayName}`,
            callback_data: emotions.worry.code
          }
        ],


          [
            {
            text:  `${emotions.shame.emoji} - ${emotions.shame.displayName}`,
            callback_data: emotions.shame.code
          },
          {
            text:  `${emotions.gratitude.emoji} - ${emotions.gratitude.displayName}`,
            callback_data: emotions.gratitude.code
          }
        ],


          [
            {
            text:  `${emotions.hopelessness.emoji} - ${emotions.hopelessness.displayName}`,
            callback_data: emotions.hopelessness.code
          },
          {
            text:  `${emotions.awkwardness.emoji} - ${emotions.awkwardness.displayName}`,
            callback_data: emotions.awkwardness.code
          }
        ],

          [
            {
              text:  'На сегодня все',
              callback_data: 'end'
            } 
          ],
          [
            {
              text:  'Статистика за три дня',
              callback_data: 'statOfTreeDays'
            }
          ],
          [
            {
              text:  'Статистика за неделю',
              callback_data:  'statOfSevenDays'
            }
          ]
        ]
      
    }
  };

const getNewEmotion = (chatId, bot) => {
  bot.sendMessage(chatId, 'Выбери, какую эмоцию ты сейчас испытываешь?', {
    reply_markup: getKeyboard(emotions)
      });
      };

module.exports = { getNewEmotion, emotions }; 