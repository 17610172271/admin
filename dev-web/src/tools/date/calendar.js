const Format = require('./format')

module.exports = function (from = 0, to = 1, fmt = 'YYYY-MM-DD') {
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + from

  let firstDayOfMonth = new Date(year, month, 1).getDay() // 当月第一天周几
  let lastDayOfMonth = new Date(year, month + to, 0).getDay() // 当月最后一天周几

  let startDateOfMonth = new Date(year, month, 1).getTime() // 当月1号 0 点
  let endDateOfMonth = new Date(year, month + to, 0).getTime() // 当月30号 24点

  let startDateTime = startDateOfMonth - firstDayOfMonth * 24 * 60 * 60 * 1000 // 补全上个月的日期
  let endDateTime = endDateOfMonth + (6 - lastDayOfMonth) * 24 * 60 * 60 * 1000 // 补全下个月的日期

  let rs = []

  while (startDateTime <= endDateTime) {
    rs.push({
      disabled: startDateTime + 24 * 60 * 60 * 1000 < now.getTime(),
      selected: false,
      info: null,
      month: new Date(startDateTime).getMonth() + 1,
      day: new Date(startDateTime).getDate(),
      date: Format(startDateTime, fmt),
      isOtherMonth: startDateTime < startDateOfMonth || startDateTime > endDateOfMonth
    })
    startDateTime += 24 * 60 * 60 * 1000
  }
  return rs
}
