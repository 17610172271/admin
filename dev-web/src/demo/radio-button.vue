<template>
  <div>
    <h1 class="b-b">Radio Button</h1>
    <div class="padder-v">
      <radio-button v-model="currentValue" :data="checkButtonData" button-class="w-md"></radio-button>
    </div>

    <div class="padder-v button-group">
      <router-link class="btn btn-bordered w-sm" :to="{ name: 'demo_radio_button', query: { from: '2017-07-01', to: '2017-01-08' } }">1周</router-link>
      <router-link class="btn btn-bordered w-sm" :to="{ name: 'demo_radio_button', query: { from: '2017-07-01', to: '2017-01-09' } }">1月</router-link>
      <router-link class="btn btn-bordered w-sm" :to="{ name: 'demo_radio_button', query: { from: '2017-07-01', to: '2017-01-10' } }">1年</router-link>
    </div>

    <div class="padder-v button-group">
      <a @click="getList(1)" class="btn btn-bordered w-xs" :class="{active: status === 1}">周</a>
      <a @click="getList(2)" class="btn btn-bordered w-xs" :class="{active: status === 2}">月</a>
      <a @click="getList(3)" class="btn btn-bordered w-xs" :class="{active: status === 3}">年</a>
    </div>

    <div class="">
      currentValue: {{currentValue}}
    </div>
    <div class="">
      从：{{date.from}} 至 {{date.to}}
    </div>
  </div>
</template>

<script>
import { RadioButton } from '@/components'

export default {
  components: {
    RadioButton
  },
  data: () => ({
    checkButtonData: [
      { name: '0-3年', value: '0-3年' },
      { name: '3-4年', value: '3-4年' },
      { name: '5-6年', value: '5-6年' },
      { name: '7-8年', value: '7-8年' },
      { name: '10年以上', value: '10年以上' }
    ],
    currentValue: '',
    status: 1
  }),
  computed: {
    date () {
      this.getList(this.$route.query)
      return this.$route.query
    }
  },
  mounted () {
    console.log(this.$route.query)
  },
  methods: {
    getList (params) {
      this.status = params

      console.log(params)
    }
  },
  watch: {
    currentValue (val) {
      this.getList(val)
    }
  }
}
</script>
