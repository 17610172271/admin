<template>
  <div>
    <h3>Calendar</h3>
    <calendar class="calendar-c"></calendar>
  </div>
</template>

<script>
import { Calendar } from '../components'

export default {
  components: {
    Calendar
  },
  data () {
    return {
      name: 'calendar'
    }
  }
}
</script>
<style>
  .calendar-c{
    width: 394px;
  }
</style>
