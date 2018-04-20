<template>
  <div>
    <h3>{{name}}</h3>
    <div>
      <check-button
        v-model="value1"
      >Click Me !</check-button>

      <check-button
        v-model="value1"
      >Click Me !</check-button>

      <check-button
        v-model="value1"
      >Click Me !</check-button>

      <check-button
        v-model="value1"
      >Click Me !</check-button>

      <check-button
        v-model="value1"
      >Click Me !</check-button>  
    </div>

    <div class="clear">
      <check-button v-model="rv.mp3" >MP3</check-button> 
      <check-button v-model="rv.mp4" >MP4</check-button> 
    </div>
  </div>
</template>
<script>
import { CheckButton } from '../components'

export default {
  components: {
    CheckButton
  },
  data () {
    return {
      name: 'Check Button',
      value1: false,
      rv: {
        mp3: false,
        mp4: false
      }
    }
  }
}
</script>
