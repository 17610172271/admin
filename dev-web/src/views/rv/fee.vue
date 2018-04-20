<template>
  <div>
    <div class="b-b padder-v text-lg text-thin">
      <div class="padder">
        <span class=" b-l b-2x b-colored text-xs m-r-xs"></span>
        <span class="m-r-xs">车辆管理</span>
        <span class="text-xs wfc-icon-arrow-right-thin m-r-xs"></span>
        <span class="text-muted">价格排期</span>
      </div>
    </div>
    <div class="bg-lt text-lg padder-v padder m-t">
      <span>价格排期预览</span>
      <button type="button" class="btn btn-normal" @click="initPriceCalendar">
        <i class="fa fa-refresh text-muted"></i>
      </button>
    </div>
    <div class="calendar-wrapper">
      <div class="calendar-container">
        <div class="text-center text-lg">
          <a @click="preMonth()" class="btn text-dark"><i class="wfc-icon-arrow-left"></i></a>
          {{currentMonth1}}
        </div>
        <price-calendar :data="priceList1" @click="onClick" :month="startMonth1"></price-calendar>
      </div>
      <div class="calendar-container">
        <div class="text-center text-lg">
          {{currentMonth2}}
          <a @click="nextMonth()" class="btn text-dark"><i class="wfc-icon-arrow-right"></i></a>
        </div>
        <price-calendar :data="priceList2" @click="onClick" :month="startMonth2"></price-calendar>
      </div>
    </div>
    <modal ref="modal" size="normal" @keydown-enter="modalKeydownEnter">
      <div class="padder-v price-modal">
        <div class="text-center text-lg text-thin">{{targetDate.date}}</div>
        <div class="padder-v-lg text-muted text-md">
          <label class="pull-right">
            <input type="radio" name="radio-close" v-model="formData.type" value="close">
            设置为占用
          </label>
          <label class="m-r">
            <input type="radio" name="radio-price" v-model="formData.type" value="price">
            修改价格
          </label>
        </div>
        <div class="price-input">
          <input type="number" name="" value="" v-model="formData.price">
          <span class="add-on">元/天</span>
        </div>
        <div class="text-center padder-v m-t">
          <a class="btn btn-orange btn-md" @click="onSubmit">确定</a>
        </div>
      </div>
    </modal>

    <div class="bg-lt text-lg padder-v padder m-t">
      <span>价格批量修改</span>
    </div>
    <div class="wrapper m-t">
      <price-edit @success="onPriceEditSuccess"></price-edit>
    </div>

    <alert ref="alert"></alert>
  </div>
</template>
<script>
import api from '@/api'
import month from '@/tools/date/month'
import dayOfMonth from '@/tools/date/dayOfMonth'
import { PriceCalendar, Modal, Alert } from '@/components'

import PriceEdit from './price-edit'

export default {
  components: {
    PriceCalendar,
    Modal,
    Alert,
    PriceEdit
  },
  data: () => ({
    rvDetail: {},
    targetDate: {},
    formData: {
      type: 'price',
      price: null
    },
    priceList: [],
    priceList1: [],
    priceList2: [],
    startMonth1: 0,
    startMonth2: 1
  }),
  computed: {
    currentMonth1 () {
      return month(this.startMonth1, 'YYYY年MM')
    },
    currentMonth2 () {
      return month(this.startMonth2, 'YYYY年MM')
    }
  },
  methods: {
    initPriceCalendar () {
      this.getPriceList1()
      this.getPriceList2()
    },
    getRvDetail () {
      this.axios.get(api.rv.detail, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.rvDetail = response.data.data
        }
      })
    },
    getPriceList1 () {
      this.axios.get(api.rvdateprice.list, {params: {
        rv_id: this.$route.params.id,
        s_date: dayOfMonth(this.startMonth1).startDate,
        e_date: dayOfMonth(this.startMonth1).endDate
      }})
      .then(response => {
        if (response.data.code === 200) {
          this.priceList1 = response.data.data.list
        }
      })
    },
    getPriceList2 () {
      this.axios.get(api.rvdateprice.list, {params: {
        rv_id: this.$route.params.id,
        s_date: dayOfMonth(this.startMonth2).startDate,
        e_date: dayOfMonth(this.startMonth2).endDate
      }})
      .then(response => {
        if (response.data.code === 200) {
          this.priceList2 = response.data.data.list
        }
      })
    },
    preMonth () {
      this.startMonth1 --
      this.startMonth2 --
      this.initPriceCalendar()
    },
    nextMonth () {
      this.startMonth1 ++
      this.startMonth2 ++
      this.initPriceCalendar()
    },
    onClick (val) {
      this.targetDate = val
      this.$refs['modal'].open()
    },
    modalKeydownEnter () {
      this.onSubmit()
    },
    onSubmit () {
      var data = {}
      data.id = this.targetDate.info.id
      if (this.formData.type === 'price') {
        data.price = this.formData.price
        data.is_occupy = 0
      } else if (this.formData.type === 'close') {
        data.is_occupy = 1
      }
      if (this.formData.type === 'price' && data.price < 1) {
        this.$refs['alert'].show('请确认价格是否正确')
      } else {
        this.axios.post(api.rvdateprice.edit, data)
        .then(response => {
          if (response.data.code === 200) {
            this.$refs['modal'].close()
            this.initPriceCalendar()
          }
        })
      }
    },
    onPriceEditSuccess () {
      this.initPriceCalendar()
    }
  },
  created () {
    this.initPriceCalendar()
  }
}
</script>
<style>
.calendar-wrapper{
  display: table;
  padding: 25px 5px;
}
.calendar-container{
  display: table-cell;
  padding: 0 10px;
}
.price-modal {
  width: 100%;
  padding: 20px 25px;

}
.price-modal .btn {
  width: 100%;
}
.price-input {
  border: 1px solid #8D9DB0;
  border-radius: 4px;
  height: 36px;
  padding: 0 5px;
  text-align: right;
  line-height: 30px;
  display: block;
}
.price-input input {
  float: left;
  text-align: right;
  font-size: 16px;
  width: 180px;
  padding: 0 10px;
  display: block;
  border: none;
}
.price-input .add-on {
  font-size: 14px;
  color: #C8D1DC;
  line-height: 36px;
}
</style>
