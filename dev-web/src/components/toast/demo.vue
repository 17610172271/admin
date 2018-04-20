<template>
  <div>
    <button class="btn btn-default" @click="showToast">show toast</button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast () {
      this.$toast({
        title: '消息提示',
        content: '您有一条新消息',
        type: 'warning',
        onShow: () => {
          console.log('on toast show')
        },
        onHide: () => {
          console.log('on toast hide')
        }
      })
    }
  }
}
</script>
