<template>
  <div>
    <div class="wrapper b-b">
      <span class="text-lg">商家信息采集</span>
    </div>
    <div class="wrapper text-center text-muted" v-if="!list">
      <span class="padder-v">没有数据</span>
    </div>
    <div class="wrapper">
      <table class="table table-sm">
        <thead>
          <tr>
            <th class="w-md">商家</th>
            <th class="w-sm">联系人</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>
              <router-link :to="{ name: 'gather_detail', params: { id: item.id}}">
              <div class="text-lg text-dark">{{item.company_name}}</div>
              <div class="text-muted m-t-xs">地址:{{item.address}}</div>
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'gather_detail', params: { id: item.id}}">
              <div class="text-muted m-t-xs">
                <div class="m-r">联系人: {{item.name}}</div>
                <div class="m-r">电话: {{item.telephone}}</div>
                <div class="m-r">邮箱: {{item.email}}</div>
              </div>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import api from '@/api'

export default {
  data: () => ({
    list: null,
    page: 1,
    size: null
  }),
  created () {
    this.axios.get(api.gather.list, {params: {
      page: this.page,
      size: this.size
    }})
    .then(response => {
      if (response.data.code === 200) {
        this.list = response.data.data.list || null
      } else {
        console.log(response.data.msg)
      }
    })
    .catch(error => {
      return Promise.reject(error)
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
