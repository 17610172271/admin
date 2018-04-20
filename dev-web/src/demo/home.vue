<template>
  <div :class="classObj">
    <h1>Demo Home</h1>
    <div>
      玩房车UI

      <h3>{{name}}</h3>
      <p>单价： {{fee}}</p>
      <p>数量: <input type="number" name="" v-model="number"></p>
      <p>总计: {{total}}</p>
      <h3></h3>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    name: 'Jianbo',
    title: '',
    number: 1,
    fee: 100,
    dataList: []
  }),
  computed: {
    total () {
      return (this.number < 10) ? this.number * this.fee : this.number * this.fee * 0.8
    },
    classObj () {
      return {
        error: this.number < 1,
        success: this.number > 10
      }
    }
  },
  methods: {
    initData () {
      // axios.get().then(response => {
      //   this.dataList = respons.data
      // })
    },
    getFee () {
      // 获取当前价格
    }
  },
  created () {
    // do something after creating vue instance
    this.initData()
  },
  mounted () {
    // do something after mounting vue instance
  },
  watch: {
    number (val) {
      // const fee = this.fee
      // this.fee = val >= 10 ? fee * 0.8

      this.$emit('input', val)
    }
  }
}

</script>

<style media="screen">
  .error {
    color: red
  }
  .success {
    color: green
  }
</style>
