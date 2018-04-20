<template>
  <div class="">

    <div class="panel">

      <alert ref="alert"></alert>

      <div class="panel-body">
        <pre>
          <code>this.$refs['alert'].show('信息填写不完整')</code>
          <code>this.$refs['alert'].show('资料审核中，无法修改信息', {delay: 5000, callBack: this.goToApplyHome})</code>
        </pre>

        <a class="btn btn-orange btn-lg w-sm" @click="callAlert">show alert!</a>
        <a class="btn btn-orange btn-lg w-sm" @click="callAlert2">show alert 2!</a>
      </div>

    </div>
  </div>

</template>
<script>

import { Alert } from '@/components'

export default {
  name: 'demo-alert',
  components: {
    Alert
  },
  data: () => ({

  }),
  methods: {
    callAlert () {
      this.$refs['alert'].show('信息填写不完整')
    },
    callAlert2 () {
      this.$refs['alert'].show('资料审核中，无法修改信息', {delay: 5000, callBack: this.doSomething})
    },
    doSomething () {
      console.log('callback done')
    }
  }
}
</script>
