<template>
  <div>
    <div class="wrapper b-b text-lg">公告</div>
    <div class="">
      <router-link :to="{ name: 'notice_detail', params: { id: 1}}">详情</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
</style>
