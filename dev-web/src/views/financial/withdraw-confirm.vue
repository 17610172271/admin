<template>
  <div class="">
    <a @click="opneModal">审批</a>
    <modal ref="modal" size="middle">
      <div class="withdraw-confirm-modal" v-if="data">
        <!-- <div class="text-muted">流水号：{{data.serial_number}}</div> -->
        <table class="table no-borders table-sm">
          <tbody>
           <!--  <tr>
              <td ><span>流水号</span> </td>
              <td><span class="text-bold">{{data.serial_number}}</span></td>
            </tr> -->
            <tr>
              <td class="w-xs text-muted"><span>提现账户</span></td>
              <td><span class="text-bold">{{data.account}}</span></td>
            </tr>
            <tr>
              <td class="w-xs text-muted"><span>账户类型</span></td>
              <td><span class="text-bold">{{data.type_name}}</span></td>
            </tr>
            <tr>
              <td class="w-xs text-muted"><span>开户名</span></td>
              <td><span class="text-bold">{{data.account_name}}</span></td>
            </tr>
            <tr>
              <td class="w-xs text-muted">提现金额</td>
              <td>
                <span class="text-xxlg text-bold text-danger">￥{{data.money}}</span>
              </td>
            </tr>
            <tr>
              <td class="w-xs text-muted">处理状态</td>
              <td>
                <div class="check-box-group">
                  <label v-for="(s, index) in status">
                    <input type="radio" v-model="data.status" :value="s.value"> {{s.name}}
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td class="w-xs text-muted">失败说明</td>
              <td>
                <textarea class="form-textarea" v-model="data.reject"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center padder-v b-t">
          <a @click="doSubmit" class="btn btn-orange w-sm">提交</a>
          <a @click="closeModal" class="btn btn-default w-sm">取消</a>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>

import {Modal} from '@/components'

// 处理状态
import { widthdrawStatus } from '@/config/options'

export default {
  components: {
    Modal
  },
  props: {
    data: {}
  },
  data: () => ({
    status: widthdrawStatus
  }),
  methods: {
    doSubmit () {
      this.$emit('confirm', this.data)
      this.closeModal()
    },
    opneModal () {
      this.$refs.modal.open()
    },
    closeModal () {
      this.$refs.modal.close()
    }
  }
}
</script>
<style>
.withdraw-confirm-modal {
  padding: 10px 0;
  font-size:  14px;
  line-height: 1.5em;
  min-height: 300px;
}
.withdraw-confirm-modal .check-box-group label {
  min-width: 5rem;
}
</style>
