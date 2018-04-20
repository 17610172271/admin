<template>

  <div class="calendar">
    <div class="weeks">
      <ul class="calendar-box">
        <li v-for="week in weeks">{{week}}</li>
      </ul>
    </div>
    <div class="days">
      <ul class="calendar-box">
        <li v-for="d in days"
            :class="classObj(d)"
            @click = "onClick(d)"
            :value="d.date"
            >
          <div class="day-container" :class="{'is-other-month': d.isOtherMonth}">
            <div class="day-name">{{d.day}}</div>
            <div class="day-info" v-if="d.info">
              <span v-if="d.info.is_occupy!=='1' && d.info.is_reserve!=='1'">{{d.info.price | currency}}</span>
              <span v-if="d.info.is_reserve=='1'">已预定</span>
              <span v-if="d.info.is_occupy=='1'">占用</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getCalendar from '../../tools/date/calendar'
const currency = val => {
  return '￥' + parseInt(val)
}
export default {
  props: {
    month: {
      type: Number,
      default: 0
    },
    data: {}
  },
  filters: {
    currency
  },
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      startMonth: this.month,
      days: [],
      priceList: this.data
    }
  },
  methods: {
    renderCalendar () {
      this.days = getCalendar(this.month, 1)
    },
    onClick (d) {
      if (!d.disabled) {
        this.$emit('click', d)
      }
    },
    classObj (d) {
      return {
        'selected': d.selected,
        'booked': d.info && d.info.is_reserve === '1',
        'disabled': d.disabled,
        'closed': d.info && d.info.is_occupy === '1'
      }
    },
    matchDate (priceList) {
      for (var index in this.days) {
        if (!this.days[index].isOtherMonth) {
          for (var key in priceList) {
            if (this.days[index].date === priceList[key].r_date) {
              this.days[index].info = priceList[key]
              break
            }
          }
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.renderCalendar()
      this.priceList = this.data
    })
  },
  watch: {
    month (val) {
      this.renderCalendar()
    },
    data (val) {
      this.matchDate(val)
    }
  }
}
</script>

<style lang="scss">

$calendar-width: 392px;

.calendar {
  width: $calendar-width;
  padding: 0;
  position: relative;
  display: inline-block;
  font-family: "PingFangSC-Medium";
  font-size: 14px;
  color: #8D9DB0;
}

.calendar .calendar_heading{
  padding: 10px 5px;
  color: #2E3E4C;
    .calendar-heading-title{
      margin: 0 30px;
      text-align: center;
      font-size: 16px;
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
  font-size: 12px;
  color: #8D9DB0;
}
.calendar .days .calendar-box{
  background-color: #f8f8f8;
  /*border-bottom:1px solid #EDEDED;*/
  min-height: 336px;
}

.calendar .days .calendar-box > li {
  height: 56px;
  padding: 0 1px 2px 1px;
}

.calendar .day-container {
  padding:5px 1px;
  height: 55px;
  display: block;
}
.calendar .is-other-month {
  display: none;
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
  // font-size: 14px;
  // padding-top: 5px;
  line-height: 28px;
}
.calendar .day-info {
  color: #FE7C1E;
  font-size: 12px;
  line-height: 17px;
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
