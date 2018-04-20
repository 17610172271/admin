<template>
  <div>
    <div class="price-edit">
      <div class="table-cell">
        <label class="w-8 text-muted text-md text-thin">选择日期</label>
      </div>
      <div class="">
        <date-picker v-model="startDate" placeholder="开始日期"></date-picker>
        <span class="padder">至</span>
        <date-picker v-model="endDate" placeholder="结束日期"></date-picker>
      </div>
      <div class="padder-v text-muted">
        选择需要更改的日期范围，留空将会更改全部价格
      </div>
    </div>
    <div class="price-edit m-t">
      <div class="table-cell">
        <label class="w-8 text-muted text-md text-thin">设置价格</label>
      </div>
      <div class="table-cell">
        <div class="row">
          <div class="col-xs-4" v-for="data in formData">
            <div class="form-group">
              <label>
                <input type="checkbox" name="" value="" v-model="data.selected">
                {{data.name}}
              </label>
              <input class="form-input w-sm" type="number" value=""
              v-model="data.price"
              @focus="onFocus"
              @blur="onBlur"
              @change="onChange(data)"
              >
              <span class="text-muted"> 元 / 天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-muted padder-v text-center">
      注意：批量修改价格将会替换所有未预订成功的价格, 已被预订的日期将不会被改变价格
    </div>
    <div class="text-center">
      <button type="button" name="button" class="btn btn-orange btn-md w-md" @click="onSubmit">提交价格修改</button>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>
<script>
import { DatePicker, Alert } from '@/components'
import api from '@/api'

export default {
  components: {
    DatePicker,
    Alert
  },
  data: () => ({
    startDate: null,
    endDate: null,
    formData: [
      {
        day: 0,
        name: '周一',
        selected: false,
        price: null
      },
      {
        day: 1,
        name: '周二',
        selected: false,
        price: null
      },
      {
        day: 2,
        name: '周三',
        selected: false,
        price: null
      },
      {
        day: 3,
        name: '周四',
        selected: false,
        price: null
      },
      {
        day: 4,
        name: '周五',
        selected: false,
        price: null
      },
      {
        day: 5,
        name: '周六',
        selected: false,
        price: null
      },
      {
        day: 6,
        name: '周日',
        selected: false,
        price: null
      }
    ]
  }),
  methods: {
    onSubmit () {
      var priceList = this.formData.map((val, index) => {
        if (val.selected) {
          return {
            price: val.price,
            r_week: val.day + 1
          }
        }
      })

      this.axios.post(api.rvdateprice.batchEdit, {
        s_date: this.startDate,
        e_date: this.endDate,
        rv_id: this.$route.params.id,
        price_list: priceList
      })
      .then(response => {
        if (response.data.code === 200) {
          this.$emit('success')
          this.$refs['alert'].show('修改成功', {type: 'success'})
        } else {
          this.$refs['alert'].show(response.data.msg)
        }
      })
    },
    onChange (val) {
      if (val.price > 0) {
        val.selected = true
      }
    },
    onBlur (val) {

    },
    onFocus (val) {

    }
  }
}
</script>
<style lang="scss">
.price-edit {
  display: table;
}
.price-edit .col-xs-4 {
  padding-bottom: 15px;
}
.table-cell {
  display: table-cell;
}
.price-edit .form-input {
  width: 120px;
}
</style>
