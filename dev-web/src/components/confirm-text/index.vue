<template>
  <div class="confirm-button">
    <button  @click="open">
      <slot></slot>
    </button>
    <modal ref="modal" class="text-center">
      <div class="clear padder-v-xs">
        <span class="wfc-icon-warning-bg">
          <span class="path1"><span class="path2"><span class="path3"></span></span></span>
        </span>
      </div>
      <div class="text-lg text-thin padder-v-lg"><input type="text" v-model="titles" :title="title"></div>
      <div>
        <a class="btn btn-md btn-orange m-r" @click="onConfirm()">确定</a>
        <a class="btn btn-md btn-bordered" @click="close()">取消</a>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from '../modal'

export default {
  props: {
    title: {
      type: String
    },
    message: ''
  },
  components: {
    Modal
  },
  data: () => ({
    titles: ''
  }),
  methods: {
    open () {
      this.$refs['modal'].open()
    },
    close () {
      this.$refs['modal'].close()
    },
    onConfirm () {
      console.log(this.message)
      this.$emit('confirm')
      this.$refs['modal'].close()
    }
  }
}
</script>
<style>
  .confirm-button{
    display: inline-block;
  }
</style>
