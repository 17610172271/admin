<template>
  <div class="calendar">
    <table class="calendar__table">
      <thead>
        <tr>
          <th v-for="week in weeks" class="week">{{week}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in days">
          <td v-for="d in day" :class="{'selected': d.selected,'disabled': d.disabled, 'closed': d.closed, 'active': d.active}">
            <div class="day-container">
              <div class="day-name">{{d.title}}</div>
              <div class="day-info">
                <span v-if="!d.closed && !d.active">{{d.info}}</span>
                <span v-if="d.active">已预定</span>
                <span v-if="d.closed">占用</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

const days = [
  [
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: true, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: true, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false}
  ],
  [
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false}
  ],
  [
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: true},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false}
  ],
  [
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false}
  ],
  [
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false}
  ],
  [
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false},
  {value: '2017-05-28', title: '28', info: '￥766', selected: false, disabled: false, closed: false, active: false}
  ]
]

export default {
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      days: days
    }
  }
}
</script>
<style>
.calendar{
  display: block;
  width: 100%;
  margin: auto;
  padding: 0 0;
}
.calendar__table {
  width: 100%;
  font-family: PingFangSC-Medium;
  color: #8D9DB0;
  text-align: center;
  font-size: 12px;
  line-height: 1.5em;
  vertical-align: middle;
  min-width: 500px;
}

.calendar__table > thead > tr > th {
  text-align: center;
  padding: 10px 5px;
}

.calendar__table > tbody {
  background-color: #f8f8f8;
}
.calendar__table > tbody > tr > td, .table > tfoot > tr > td {
  border-bottom: 1px solid #EDEDED;
  padding: 2px 0;
  vertical-align: middle;
  cursor: pointer;
}
.calendar__table > tbody > tr > td:hover{
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1); 
  border-radius: 4px;
  transition: .1s ease-in;
}
.day-container {
  padding:5px 5px;
}
.day-name {
  font-size: 14px;
  padding: 5px 0;
}
.selected .day-container{
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1); 
  border-radius: 4px;
}
/*.selected .day-name{
  background: #FE7C1E;
  color: #fff;
  border-radius: 2px;
}*/
.day-info {
  color: #FE7C1E;
}
.disabled,
.disabled .day-info{
  color: #C8D1DC;
}
.closed,
.closed .day-info{
  color: #C8D1DC;
}
.active .day-info{
  color: #77B825;
}
</style>
