<template>
  <div>
    <alert ref="alert"></alert>
    <div class="text-lg wrapper search-boxs b-b">
      <div class="pull-left" style="margin-right:50px;">用户管理</div>
      <div class="search-form pull-left search-box">
        <span>昵称搜索</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="昵称搜索" v-model="searchData.nickname">
      </div>
      <div class="search-form pull-left search-box">
        <span>手机号</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="例：185****1111"  v-model="searchData.tel">
      </div>

      <button class="pull-right" @click="getData()">搜索</button>
       <div class="pull-right search-boxss">
        用户总数：{{size}}
      </div>
    </div>
    <div class="wrapper">
        <div class="text-center padder-v" v-if="!list">
          未找到数据<br>
          <button class="search-btn" @click="subBnt">刷新</button>
        </div>
        <table class="table" v-if="list">
          <thead>
            <tr>
              <th>用户名称</th>
              <th>用户手机号</th>
              <th class="w-xs">用户ID</th>
              <th class="w-sm">
                更新时间\注册时间
              </th>
              <th class="w-xxs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>
                <div class="text-lg">
                  {{item.nickname}}
                </div>
              </td>
              <td >
                <span class="">{{item.tel}}</span>
              </td>
              <td style="padding-left:25px;">
                <span class="">{{item.id}}</span>
              </td>
              <td>
                <div class="text-muted">
                  {{item.updated_at}}
                  <p>{{item.ctime | times}}</p>
                </div>
              </td>
              <td>
                <router-link :to="{ name: 'user_detail', params: { id: item.id}}">详情</router-link>
                <a class="remove-btn" @click="removeBtn(item.id)">禁用</a>
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

    <transition name="fade">
      <div class="remove-box" v-show="removeShow">
        <p>一但禁用,用户将不可登录,无法解除禁用,确定是否要禁用？</p>
        <p><button @click="removeYes()">确定</button><button @click="removeHide()">取消</button></p>
      </div>
    </transition>
    <div class="add-box" @click="removeHide()" v-show="removeShow"></div>



  </div>
</template>
<script>
import api from '@/api'
import {Alert} from '@/components'

export default {
  filters: {
    times (val) {
      var time = new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
      return time
    }
  },
  components: {
    Alert
  },
  data: () => ({
    list: [],
    page: 1,
    removeShow: false,
    searchData: {
      nickname: null,
      tel: null,
      page: 1,
      size: 10
    },
    removeInd: null,
    size: 0
  }),
  methods: {
    removeBtn (ind) {
      this.removeInd = ind
      this.removeShow = true
    },
    removeHide () {
      this.removeShow = false
    },
    init () {
      this.getData()
    },
    removeYes () {
      this.axios.get(api.user.del, {params: {id: this.removeInd}})
      .then(response => {
        if (response.data.code === 200) {
          this.$refs['alert'].show('删除成功', {type: 'success'})
          this.removeShow = false
          this.initData()
        } else {
          this.$refs['alert'].show('修改失败')
        }
      })
    },
    initData () {
      this.list = []
      this.axios.get(api.user.list, {params: this.searchData})
      .then(response => {
        if (response.data.code === 200) {
          this.size = response.data.data.count
          this.list = response.data.data.list
        }
      })
    },
    subBnt () {
      this.searchData = {
        nickname: null,
        tel: null,
        page: 1,
        size: 10
      }
      this.getData()
    },
    getData () {
      this.page = 1
      this.initData()
    }
  },
  created () {
    this.init()
  },
  watch: {
    page (val) {
      this.searchData.page = val
      this.list = []
      this.initData()
    }
  }
}
</script>
<style>
  .search-boxss{
    line-height: 34px;
    margin-right: 20px;
  }
</style>
