

const getCurrentDate = () => { 
  const today = Date.now() ;
  return today;
};

const getMStoTommorowMorning = () => {
  const today = getCurrentDate()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(9,0,0,0)
  const tomorrowDateInMS = tomorrow.getTime();
  return tomorrowDateInMS - today;
}

const getNoticeInterval = () => {
  const HOUR = 60 * 60 * 1000
  return HOUR;
};

const getSomePriviosDay = (daysAgo) => {
  const somePriviosDay = new Date()
  somePriviosDay.setDate(somePriviosDay.getDate() - daysAgo)
  somePriviosDay.setHours(0,0,0,0)
  return Date.parse(somePriviosDay)
}

module.exports = { getSomePriviosDay, getCurrentDate, getMStoTommorowMorning, getNoticeInterval }