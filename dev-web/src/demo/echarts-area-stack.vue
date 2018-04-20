<template>
  <div class="panel panel-default panel-noradius m-t">
    <div class="panel-heading">
      <span class="text-lg">最近7天收益数据</span>
      <span class="text-muted">({{query.from}}至{{query.to}})</span>
    </div>
    <div class="panel-body">
      <echarts-area-stack width="750px" height="400px" type="blue" v-model="echartData"></echarts-area-stack>
    </div>
    <div class="hbox b-t b-light">
      <div class="col padder padder-v-sm b-r b-light">
        <span class="text-muted">实际收入(元)</span>
        <div class="h3 text-center m-b-sm">¥<span></span>{{income_history.income || 0}}</div>
      </div>
      <div class="col padder padder-v-sm">
        <span class="text-muted">订单成交金额(元)</span>
        <div class="h3 text-center m-b-sm">¥{{income_history.fee || 0}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import EchartsAreaStack from '@/components/echarts/area-stack'
import format from '@/tools/date/format'

export default {
  components: {
    EchartsAreaStack
  },
  data: () => ({
    income_history: {
      income: 1234.00,
      fee: 23432.00
    },
    query: {
      from: '2017-07-01',
      to: '2017-07-02'
    },
    echartData: {
      x: ['07.18', '07.19', '07.20', '07.21', '07.22', '07.23', '07.24', '07.25'],
      y: [0, 10, 20, 30, 50, 30, 15, 15]
    }
  }),
  methods: {
    initData (list) {
      for (var key in list) {
        this.echartData.x = []
        this.echartData.x.push(format(list[key], 'MM.DD'))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
