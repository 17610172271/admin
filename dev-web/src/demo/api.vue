<template>
  <div>
    api test
    <a class="btn btn-orange" @click="getList()">Get List</a>
    <ul>
      <li v-for="i in list">{{i}}</li>
    </ul>
  </div>
</template>
<script>
// import demo from '@/api/demo'
import api from '@/api'

export default {
  name: 'api',
  data () {
    return {
      list: [],
      query: {
        province: 'beijing',
        city: 'chaoyang'
      }
    }
  },
  methods: {
    getList () {
      this.axios.get('account/auth').then(response => {
        console.log(response.data)
      })
      console.log('fetch list from server')
      // demo.getList(this.query, response => {
      //   this.list = response.data
      // })
    }
  },
  created () {
    this.axios.get(api.account.auth)
    .then(response => {
      console.log(response)
    })
  }
}
</script>
<style lang="scss">
</style>
