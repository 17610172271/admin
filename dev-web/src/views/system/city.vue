<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <input type="text" class="form-input m-t-n-xs" placeholder="搜索车辆标题" v-model="searchKey" @change="doSearch">
      </div>
      城市管理
    </div>
    <div class="wrapper">
        <div class="text-center padder-v" v-if="!list">
          未找到数据
        </div>
        <table class="table table-sm container-fluid" v-if="list">
          <thead>
            <tr class="row">
              <th class="col-xs-3">城市名</th>
              <th class="col-xs-4">是否开通</th>
              <th class="col-xs-4">热门城市</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" class="row">
              <td class="col-xs-3">
                <div class="text-lg">
                  {{ item.city }}
                </div>
              </td>
              <td class="col-xs-4">
                <div class="text-lg">
                  <switch-button v-model="item.is_open" :title="title1" @change="changeOpenState(item.id, item.is_open)"></switch-button>
                </div>
              </td>
              <td class="col-xs-4">
                <div class="text-lg">
                  <switch-button v-model="item.ishot" :title="title" @change="changeHotState(item.id, item.ishot)"></switch-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <ul class="pagination">
            <li class="page-item"><a @click="page > 1 ? page-- : page = 1">上一页</a></li>
            <li class="page-item"><a>{{page}}</a></li>
            <li class="page-item"><a @click="page++">下一页</a></li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import { SwitchButton } from '@/components'
export default {
  data: () => ({
    list: [],
    page: 1,
    title: ['否', '是'],
    title1: ['关闭', '开通'],
    searchKey: ''
  }),
  components: {
    SwitchButton
  },
  created () {
    this.getCityList()
  },
  methods: {
    getCityList (city) {
      this.axios.get(api.city.list, {
        params: {
          city: city,
          page: this.page
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data.list
        }
      })
    },
    doSearch () {
      this.page = 1
      if (this.searchKey === '') this.searchKey = undefined
      this.getCityList(this.searchKey)
    },
    changeOpenState (id, state) {
      this.axios.post(api.city.edit, {
        id: id,
        is_open: state
      })
      .then(response => {
        if (response.data.code === 200) {
        }
      })
    },
    changeHotState (id, state) {
      this.axios.post(api.city.edit, {
        id: id,
        ishot: state
      })
      .then(response => {
        if (response.data.code === 200) {
        }
      })
    }
  },
  watch: {
    page (val) {
      this.getCityList()
    }
  }
}
</script>
<style scoped>
  .table .row th {
    text-align: center; 
  }
  .table .row td > div {
    text-align: center; 
  }
  .search-form .form-input {
    width: 120px;
  }
</style>
