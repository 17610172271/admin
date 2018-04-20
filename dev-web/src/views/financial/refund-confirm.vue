<template>
  <div class="">
    <a @click="opneModal">退款</a>
    <modal ref="modal" size="middle">
      <div class="refund-detail-modal">
        <table class="table no-borders">
          <tbody>
            <tr>
              <td class="w-xs"><span>订单编号</span> </td>
              <td><span class="text-bold">{{data.code}}</span></td>
            </tr>
            <tr>
              <td><span>订单金额</span></td>
              <td><span class="text-bold">￥{{data.fee_total}}</span></td>
            </tr>
            <tr>
              <td><span>应退金额</span></td>
              <td><span class="text-success text-bold">￥{{data.refund_money}}</span></td>
            </tr>
            <!-- <tr>
              <td><span>退款明细</span></td>
              <td><span>{{data.detail}}</span></td>
            </tr> -->
            <!-- <tr>
              <td>实际退款</td>
              <td>
                <div class="input-group">
                  <span class="input-group-addon">￥</span>
                  <input type="number" class="form-input w-sm" v-model="data.real_refundment">
                </div>
              </td>
            </tr> -->
            <tr>
              <td>备注</td>
              <td>
                <textarea class="form-textarea"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center padder-v b-t">
          <a @click="doSubmit" class="btn btn-orange w-sm">确认退款</a>
          <a @click="closeModal" class="btn btn-default w-sm">取消</a>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import {Modal} from '@/components'
export default {
  components: {
    Modal
  },
  props: {
    data: {
      created_at: null,
      order_id: null,
      order_code: null,
      order_total: 0,
      order_payType: 1,
      plan_refundment: 0,
      real_refundment: 0,
      from: 1,
      detail: null,
      status: 1,
      remark: null
    }
  },
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
.refund-detail-modal {
  padding: 10px 0;
  font-size:  14px;
  line-height: 1.5em;
  min-height: 300px;
}
</style>
