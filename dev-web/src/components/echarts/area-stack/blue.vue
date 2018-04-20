<template>
    <div :style="{width: width, height: height}"></div>
</template>
<script>
// import echarts from 'echarts'

// 引入 Echarts 主模块
var echarts = require('echarts/lib/echarts')

// 引入折线图
require('echarts/lib/chart/line')

// 引入提示框
require('echarts/lib/component/tooltip')

const option = {
  tooltip: {
    trigger: 'axis',
    formatter: '{c}',
    textStyle: {
      color: '#2E3E4C',
      fontSize: '16',
      fontWeight: 'bold'
    },
    padding: [5, 15],
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    extraCssText: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(86, 215, 255, 0.4)'
      }
    }
  },
  grid: {
    left: '30',
    right: '30',
    bottom: '20',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#f5f5f5'
        }
      },
      data: ['6.01', '6.02', '6.03', '6.04', '6.05', '6.06', '6.07']
    }
  ],
  yAxis: [
    {
      type: 'value',
      minInterval: 1, // 最小刻度
      axisLine: {
        show: false // 坐标轴轴线
      },
      splitLine: {
        show: true, // 分割线显示
        lineStyle: {
          color: '#f5f5f5'
        }
      },
      axisTick: {
        show: false // 坐标轴刻度
      }
    }
  ],
  series: [
    {
      type: 'line',
      itemStyle: {
        normal: {
          color: '#FFFFFF',
          borderColor: 'rgba(86, 215, 255, 1)',
          borderWidth: '4'
        }
      },
      lineStyle: {
        normal: {
          color: 'rgba(86, 215, 255, 1)'
        }
      },
      areaStyle: {normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(86, 215, 255, 0.5)' // 0% 处的颜色
          }, {
            offset: 0.3, color: 'rgba(86, 215, 255, 0.2)' // 100% 处的颜色
          }, {
            offset: 1, color: 'rgba(86, 215, 255, 0)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }},
      data: [15, 20, 38, 39, 45, 34, 30]
    }
  ]
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
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    initChart () {
      echarts.init(this.$el).setOption(this.option)
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
