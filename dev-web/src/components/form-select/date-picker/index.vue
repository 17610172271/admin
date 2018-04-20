<template>
  <div class="date-picker">

  <input type="text"
    :class="classes"
    :placeholder="placeholder"
    ref="date-picker-input"
    v-model="currentValue"
    @focus="onFocus"
    @blur="onBlur($event)"
    @keydown.tab="onTab($event)"
  >

  <div class="date-picker-dropdown"
  v-show="isOpen"
  >
  <div class="date-picker-mask" @click="closeDropdown($event)"></div>
  <div class="calendar" tabindex="-1" ref="calendar">
    <div class="calendar_heading">
      <a @click="preMonth" class="btn pre-month">
        <i class="fa fa-arrow-left"></i>
      </a>
      <div class="calendar-heading-title">
        {{currentMonth}}
      </div>
      <a @click="nextMonth" class="btn next-month"><i class="fa fa-arrow-right"></i></a>
    </div>
    <div class="weeks">
      <ul class="calendar-box">
        <li v-for="week in weeks">{{week}}</li>
      </ul>
    </div>
    <div class="days">
      <ul class="calendar-box">
        <li v-for="d in days"
            :class="{'selected': d.selected, 'disabled': d.disabled}"
            @click = "onClick(d)"
            :value="d.value"
            >
          <div class="day-container" :class="{'is-other-month': d.isOtherMonth}">
            <div class="day-name">{{d.day}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</div>
</template>

<script>
import getCalendar from '../../tools/date/calendar'
import month from '@/tools/date/month'

export default {
  props: {
    month: {
      type: Number,
      default: 0
    },
    value: '',
    classes: {
      type: String,
      default: 'form-input w-sm'
    },
    placeholder: null
  },
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      startMonth: this.month,
      days: [],
      isOpen: false,
      currentValue: this.value,
      isDropdownClick: false
    }
  },
  computed: {
    currentMonth () {
      return month(this.startMonth, 'YYYY年MM')
    }
  },
  methods: {
    renderCalendar () {
      this.days = getCalendar(this.startMonth, 1)
    },
    preMonth () {
      this.startMonth --
    },
    nextMonth () {
      this.startMonth ++
    },
    onClick (d) {
      this.currentValue = d.date
      this.$emit('click', d)
      this.isOpen = false
    },
    onFocus () {
      this.isOpen = true
    },
    onBlur (e) {
    },
    onTab (e) {
      this.closeDropdown(e)
    },
    onOpen () {
      this.$refs.calendar.focus()
      this.$emit('open')
    },
    onClose () {
      this.$emit('close')
    },
    closeDropdown (e) {
      this.isOpen = false
    },
    open () {
      this.isOpen = true
    },
    close (e) {
      this.isOpen = false
    }
  },
  created () {
    this.$nextTick(() => {
      this.renderCalendar()
    })
  },
  watch: {
    startMonth (val) {
      this.renderCalendar()
    },
    currentValue (val) {
      this.$emit('input', this.currentValue)
    },
    isOpen (val) {
      this[this.isOpen ? 'onOpen' : 'onClose']()
    }
  }
}
</script>

<style lang="scss">

$calendar-width: 392px;
.date-picker {
  display: inline;
  position: relative;
}
.date-picker-dropdown {
  position: absolute;
  background: #fff;
  border: 1px solid #f8f8f8;
  width: auto;
  display: table;
  top: 36;
  left: 0;
}

.date-picker-mask {
  display: table;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  transition: opacify .3s ease;
  z-index: 1;
  background: rgba(0,0,0, 0)
}
.date-picker .calendar {
  z-index: 2;
  width: $calendar-width;
  padding: 0;
  position: relative;
  display: inline-block;
  font-family: "PingFangSC-Medium";
  font-size: 14px;
  color: #8D9DB0;
  background: #fff;
}

.date-picker .calendar .calendar_heading{
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

.date-picker .calendar .calendar-box {
  width: 100%;
  margin: 0 0;
  padding: 0;
}

.date-picker .calendar .calendar-box > li {
  position: relative;
  display: inline-block;
  // width: 56px;
  width: ($calendar-width/7);
  text-align: center;
  border-bottom: 1px solid #EDEDED;
  vertical-align: middle;
}
.date-picker .calendar .weeks > .calendar-box > li{
  text-align: center;
  padding: 10px 0;
  border:none;
  font-weight: 600;
  font-size: 12px;
  color: #8D9DB0;
}
.date-picker .calendar .days .calendar-box{
  background-color: #f8f8f8;
  /*border-bottom:1px solid #EDEDED;*/
  min-height: 336px;
}

.date-picker .calendar .days .calendar-box > li {
  height: 56px;
  padding: 0 1px 2px 1px;
}

.date-picker .calendar .day-container {
  padding:5px 1px;
  height: 54px;
  display: block;
}
.date-picker .calendar .is-other-month {
  display: none;
}

.date-picker .calendar .days .calendar-box > li:hover .day-container,
.date-picker .calendar .selected .day-container{
  // box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  // border-radius: 4px;
  color: #FE7C1E;
  transition: .05s ease;
  cursor: pointer;
}
.date-picker .calendar .selected .day-container
{
  background-color: #fff;
}

.date-picker .calendar .days .calendar-box > li.disabled:hover .day-container{
  background-color: transparent;
  box-shadow:none;
  border-radius: 0;
  cursor: default;
}

.date-picker .calendar .days .calendar-box > li.selected:first-child .day-container{
  border-radius: 8px;
}

.date-picker .calendar .day-name {
  // font-size: 14px;
  // padding-top: 5px;
  line-height: 54px;
}
.date-picker .calendar .day-info {
  color: #FE7C1E;
  font-size: 12px;
  line-height: 17px;
}
.date-picker .calendar .disabled,
.date-picker .calendar .disabled .day-info{
  color: #C8D1DC;
}
.date-picker .calendar .closed,
.date-picker .calendar .closed .day-info{
  color: #C8D1DC;
}
.date-picker .calendar .booked .day-info{
  color: #77B825;
}

</style>
