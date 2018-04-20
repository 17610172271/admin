<template>
  <div class="">

  <div class="calendar">
    <div class="calendar_heading">
      <a @click="getPreMonth()" class="btn pre-month">上个月</a>
      <div class="calendar-heading-title">
        2017年6月
      </div>
      <a @click="getNextMonth()" class="btn next-month">下个月</a>
    </div>
    <div class="weeks">
      <ul class="calendar-box">
        <li v-for="week in weeks">{{week}}</li>
      </ul>
    </div>
    <div class="days">
      <ul class="calendar-box">
        <li v-for="d in days"
            :class="{'selected': d.selected, 'booked': d.booked, 'disabled': d.disabled, 'closed': d.closed}"
            @click = "selectDay(d)"
            :value="d.value"
            >
          <div class="day-container">
            <div class="day-name">{{d.day}}</div>
            <div class="day-info">
              <span v-if="!d.closed && !d.booked">￥{{d.fee ? d.fee : 0}}</span>
              <span v-if="d.booked">已预定</span>
              <span v-if="d.closed">占用</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import getDateRange from '../../tools/date/range'
import getCalendar from '../../tools/date/calendar'

export default {
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      startMonth: 0,
      days: getCalendar(this.startMonth, 1),
      rv_calendar: []
    }
  },
  methods: {
    getCurrentMonth () {
      let now = new Date()
      let firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay() // 当月第一天周几
      let lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0).getDay()
      let startDate = new Date(now.getFullYear(), now.getMonth(), 1).getTime() // 当月第一天
      let endDate = new Date(now.getFullYear(), now.getMonth() + 2, 0).getTime() // 当月最后一天

      if (firstDayOfMonth > 0) startDate -= firstDayOfMonth * 24 * 60 * 60 * 1000 // 补全上个月的日期
      if (lastDayOfMonth < 6) endDate += (6 - lastDayOfMonth) * 24 * 60 * 60 * 1000 // 补全上个月的日期

      const datesValues = getDateRange(startDate, endDate)

      const mapDate = datesValues.map((val, index) => {
        return {
          name: val.day,
          value: val.value,
          disabled: val.disabled,
          fee: this.rv_calendar[index] ? this.rv_calendar[index].fee : '0',
          closed: parseInt(this.rv_calendar[index] ? this.rv_calendar[index].closed : 0),
          booked: parseInt(this.rv_calendar[index] ? this.rv_calendar[index].booked : 0)
        }
      })
      return mapDate
    },
    getNextMonth () {
      this.startMonth += 1
    },
    getPreMonth () {
      this.startMonth -= 1
    },
    renderCalendar () {
      this.days = getCalendar(this.startMonth, 1)
    },
    selectDay (d) {
      d.selected = d.disabled ? false : !d.selected
    }
  },
  created () {
    // do something after creating vue instance
    this.$nextTick(() => {
      // this.renderCalendar()
    })
  },
  watch: {
    startMonth () {
      return this.renderCalendar()
    }
  }
}
</script>

<style lang="scss">

$calendar-width: 100%;
$calendar-min-width: 392px;

.calendar {
  width: $calendar-width;
  min-width: $calendar-min-width;
  padding: 0;
  position: relative;
  display: block;
}
.calendar .calendar_heading{
  padding: 10px 5px;
  color: #2E3E4C;
    .calendar-heading-title{
      margin: 0 30px;
      text-align: center;
      font-size: 16px;
      font-family: 'PingFangSC-Medium';
    }
    .pre-month,
    .next-month{
      position: absolute;
      padding: 5px 10px;
      font-size: 12px;
      color: #2E3E4C;
    }
    .pre-month{
      top: 5px;
      left: 0;
    }
    .next-month{
      top: 5px;
      right: 0;
    }
}


.calendar .calendar-box {
  width: 100%;
  margin: 0 0;
  padding: 0;
}

.calendar .calendar-box > li {
  position: relative;
  display: inline-block;
  // width: 56px;
  width: ($calendar-width/7);
  text-align: center;
  border-bottom: 1px solid #EDEDED;
  vertical-align: middle;
}
.calendar .weeks > .calendar-box > li{
  text-align: center;
  padding: 10px 0;
  border:none;
  font-weight: 600;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #8D9DB0;
}
.calendar .days .calendar-box{
  background-color: #f8f8f8;
  /*border-bottom:1px solid #EDEDED;*/
  min-height: 337px;
}

.calendar .days .calendar-box > li {
  padding: 2px 1px;
  margin-bottom: -1px;
}


.calendar .day-container {
  padding:5px 5px;
}
.calendar .days .calendar-box > li:hover .day-container,
.calendar .selected .day-container{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  border-radius: 4px;
  transition: .05s ease;
  cursor: pointer;
}
.calendar .selected .day-container
{
  background-color: #fff;
}

.calendar .days .calendar-box > li.disabled:hover .day-container{
  background-color: transparent;
  box-shadow:none;
  border-radius: 0;
  cursor: default;
}

.calendar .days .calendar-box > li.selected:first-child .day-container{
  border-radius: 8px;
}

.calendar .day-name {
  font-size: 14px;
  padding-top: 5px;
}
.calendar .day-info {
  color: #FE7C1E;
}
.calendar .disabled,
.calendar .disabled .day-info{
  color: #C8D1DC;
}
.calendar .closed,
.calendar .closed .day-info{
  color: #C8D1DC;
}
.calendar .booked .day-info{
  color: #77B825;
}

</style>
