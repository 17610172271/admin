<template>
  <modal ref="modal" title="" class="text-center">
    <div class="clear padder-v-xs">
      <span class="wfc-icon-warning-bg">
        <span class="path1"><span class="path2"><span class="path3"></span></span></span>
      </span>
    </div>
    <div class="text-lg text-thin padder-v-lg">
      <slot></slot>
    </div>
    <div class="btn-toolbar padder-v-xs">
      <a class="btn btn-md btn-bordered m-r" @click="close()">确定</a>
      <a class="btn btn-md btn-orange" @click="close()">取消</a>
    </div>
  </modal>
</template>
<script>
import Modal from '../modal'

export default {
  components: {
    Modal
  },
  data: () => ({
    callBack: () => {}
  }),
  methods: {
    open (callBack) {
      this.callBack = callBack
      this.$refs['modal'].open()
    },
    close (callBack) {
      this.callBack()
      this.$refs['modal'].close()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
