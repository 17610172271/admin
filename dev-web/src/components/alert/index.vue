<template>
  <transition >
    <div class="top-alert"
      :class="classObj"
      @click="hide()"
      >
      {{message}}
    </div>
  </transition>
</template>
<script>
export default {
  name: 'alert',
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  data: () => ({
    showValue: false,
    message: '',
    type: 'error'
  }),
  computed: {
    classObj () {
      return {
        show: this.showValue,
        error: this.type === 'error',
        success: this.type === 'success',
        warning: this.type === 'warning'
      }
    }
  },
  methods: {
    show (message, config = { delay: 2000, callBack: () => {}, type: 'error' }) {
      // console.log(type)
      // console.log(delay)
      // console.log(callBack)
      this.type = config.type || 'error'
      var d = config.delay || 2000
      this.message = message
      this.showValue = true
      setTimeout(() => {
        if (typeof config.callBack === 'function') config.callBack()
        this.showValue = false
      }, d)
    },
    hide () {
      this.showValue = false
    }
  }
}
</script>
<style>
.top-alert {
  height: 62px;
  width: 100%;
  position: fixed;
  top: -62px;
  left: 0;

  background: rgba(254, 72, 72, .75);
  color: #fff;
  font-size: 16px;
  line-height: 22px;
  padding: 20px 0;
  text-align: center;

  transition: 0.2s ease;
  z-index: 1000;
}
.top-alert.show {
  top: 0;
}

.top-alert.error {
  background: rgba(254, 72, 72, .75);
}
.top-alert.success {
  background: rgba(75,175,80, .75);
}
.top-alert.warning{
  background: rgba(255,124,0, .75);
}
</style>
