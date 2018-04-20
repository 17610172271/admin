<template>
  <div>
    <h1>Modal</h1>
    <modal ref="modal1" title="" class="text-center">
      <div class="clear padder-v-xs">
        <span class="wfc-icon-warning-bg">
          <span class="path1"><span class="path2"><span class="path3"></span></span></span>
        </span>
      </div>
      <div class="text-lg text-thin padder-v-lg">确定可提供本次租赁服务？</div>
      <div class="btn-toolbar padder-v-xs">
        <a class="btn btn-md btn-bordered m-r" @click="closeModal('modal1')">确定</a>
        <a class="btn btn-md btn-orange" @click="closeModal('modal1')">取消</a>
      </div>
    </modal>

      <a @click="openModal('modal1')" class="btn btn-orange">Click Me !</a>

      <a @click="openModal('modal1')" class="btn btn-orange">删除订单</a>
  </div>
</template>

<script>
import { Modal } from '../components'

export default {
  components: {
    Modal
  },
  data () {
    return {
      name: '',
      switchValue: true
    }
  },
  methods: {
    openModal (ref) {
      this.$refs[ref].open()
    },
    closeModal (ref) {
      this.$refs[ref].close()
    }
  }
}
</script>
