<template>
  <div class="server-charge">
    <a @click="opneModal" class="btn btn-cutom">服务费</a>
    <modal ref="modal" size="middle">
      <div class="withdraw-confirm-modal" v-if="data">
        <!-- <div class="text-muted">流水号：{{data.serial_number}}</div> -->
        <h3>服务费</h3>
        <table class="table no-borders table-sm">
          <tbody>
           <!--  <tr>
              <td ><span>流水号</span> </td>
              <td><span class="text-bold">{{data.serial_number}}</span></td>
            </tr> -->
            <tr>
              <td class="w-xs text-muted">服务费类型</td>
              <td>
                <div class="check-box-group">
                  <label v-for="(s, index) in data.charge_type_list">
                    <input type="radio" v-model="data.charge_type" :value="s.value"> {{s.name}}
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="w-xs text-muted"><span>服务费额度</span></td>
              <td><input type="text" class="server-ipt" v-model="data.charge_number"><span v-if="data.charge_type === '1'">%</span><span v-if="!(data.charge_type === '1')">元</span></td>
            </tr>            
          </tbody>
        </table>
        <div class="text-center padder-v b-t">
          <a @click="doSubmit" class="btn btn-orange w-sm">提交</a>
          <a @click="closeModal" class="btn btn-default w-sm">取消</a>
        </div>
      </div>
    </modal>
    <alert ref="server"></alert>
  </div>
</template>
<script>

import {Modal, Alert} from '@/components'
import api from '@/api'
// 处理状态
import { widthdrawStatus } from '@/config/options'

export default {
  components: {
    Modal,
    Alert
  },
  props: {
    data: {}
  },
  data: () => ({
    status: widthdrawStatus
  }),
  created () {
    console.log(this.data)
  },
  methods: {
    doSubmit () {
      this.axios.post(api.agency.editCharge, {
        id: this.data.id,
        charge_type: this.data.charge_type,
        charge_number: this.data.charge_number
      }).then(response => {
        if (response.data.code === 200) {
          console.log('success')
        }
      })
      this.alert('修改成功！')
      this.closeModal()
    },
    opneModal () {
      this.$refs.modal.open()
    },
    closeModal () {
      this.$refs.modal.close()
    },
    alert (msg, config) {
      this.$refs['server'].show(msg, config)
    }
  }
}
</script>
<style scoped>
.withdraw-confirm-modal {
  padding: 10px 0;
  font-size:  14px;
  line-height: 1.5em;
  min-height: 300px;
}
.withdraw-confirm-modal .check-box-group label {
  min-width: 5rem;
}
.ui-modal__container {
  width: 500px;
  height: 280px;
}
.server-charge {
  display: inline-block;
}
.withdraw-confirm-modal {
  padding: 0 100px;
}
.withdraw-confirm-modal h3 {
  text-align: center;
  font-size: 20px;
}
.server-ipt {
  border-radius: 4px;
  width: 90px;
  height: 30px;
  outline: none;
  text-align: center;
}
</style>
