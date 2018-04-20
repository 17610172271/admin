<template>
    <div :style="{width: width, height: height}"></div>
</template>
<script>
import Echarts from 'echarts'

var option = {
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}
export default {
  props: {
    width: {
      type: String,
      default () {
        return '700px'
      }
    },
    height: {
      type: String,
      default () {
        return '400px'
      }
    },
    option: {
      type: Object,
      default () {
        return option
      }
    }
  },
  data () {
    return {
      chartData: option
    }
  },
  methods: {
    initChart () {
      Echarts.init(this.$el).setOption(this.option)
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
