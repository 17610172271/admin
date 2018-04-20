<template>
  <div>
    <h1>Switch Button</h1>
    <div class="padder-v">
      <switch-button v-model="rv.hasAirCondation"></switch-button>
    </div>
    <div>
      value: {{rv.hasAirCondation}}
    </div>
  </div>
</template>

<script>
import { SwitchButton } from '../components'

export default {
  components: {
    SwitchButton
  },
  data () {
    return {
      rv: {
        hasAirCondation: 1
      }
    }
  }
}
</script>
