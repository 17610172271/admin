const Format = require('./format')

module.exports = function (m = 0, fmt = 'YYYY-MM-DD') {
  let now = new Date()

  let year = now.getFullYear()
  let month = now.getMonth() + m

  let firstDayOfMonth = new Date(year, month, 1).getDay() // 当月第一天周几
  let lastDayOfMonth = new Date(year, month + 1, 0).getDay() // 当月最后一天周几

  let startDateOfMonth = new Date(year, month, 1).getTime() // 当月1号 0 点
  let endDateOfMonth = new Date(year, month + 1, 0).getTime() // 当月30号 24点

  return {
    startDay: firstDayOfMonth,
    endDay: lastDayOfMonth,
    startDate: Format(startDateOfMonth, fmt),
    endDate: Format(endDateOfMonth, fmt)
  }
}
