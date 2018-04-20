<template>
  <div>
    <h1>Confirm Modal</h1>
    <div class="list-group-item" v-for="item in 10" :key="item.key">
      <div class="">

        <confirm-button @confirm="doClose(item)" message="确认要下架车辆？" button-class="btn btn-orange">下架车辆</confirm-button>

      </div>
    </div>
  </div>
</template>

<script>

import { ConfirmButton } from '@/components'
// import api from '@/api'

export default {
  components: {
    ConfirmButton
  },
  methods: {
    doClose (item) {
      console.log(item)
    }
  }
}

</script>
