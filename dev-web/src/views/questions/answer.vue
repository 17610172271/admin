<template>
  <div>
    <alert ref="alert"></alert>
    <div class="text-lg wrapper search-boxs">
      答案管理
      <button class="pull-right" @click="getData()">搜索</button>
    </div>
    <div class="b-b text-lg wrapper search-boxs">
      <div class="search-form pull-left search-box">
        <span>内容搜索</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="内容搜索" v-model="searchData.content">
      </div>
      <div class="search-form pull-left search-box">
        <span>发布时间</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="例：2018-01-01"  v-model="searchData.stime">
      </div>
      <div class="search-form pull-left search-box">
        <span>结束时间</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="例：2018-01-01" v-model="searchData.etime">
      </div>
      <div class="search-form pull-left search-box">
        <span>用户ID</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="例：66"  v-model="searchData.user_id">
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
              <th>问答答案</th>
              <th class="w-xs">发布人<span class="text-muted">(ID)</span></th>
              <th class="w-sm">
                时间
                <span class="text-muted">(发布)</span>
              </th>
              <th class="w-xxs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>
                <div class="text-lg txt-add" v-html="item.content">
                  {{item.content}}
                </div>
                <div class="text-muted img-add" v-show="item.imgpath">
                  <img v-for="img in item.imgpath" :src="img" alt="">
                </div>
              </td>
              <td style="padding-left:25px;">
                <span class="">{{item.user_id}}</span>
              </td>
              <td>
                <div class="text-muted">
                  {{item.ctime | times}}
                </div>
              </td>
              <td>
                <router-link :to="{ name: 'answer-detail', params: { id: item.id}}">详情</router-link>
                <a class="remove-btn" @click="removeBtn(item.id)">删除</a>
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
        <p>确定删除该答案吗？</p>
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
      stime: null,
      etime: null,
      user_id: null,
      content: null,
      page: 1,
      size: 10
    },
    removeInd: null
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
      this.axios.get(api.questions.answer_rem, {params: {id: this.removeInd}})
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
      this.axios.get(api.questions.answer_list, {params: this.searchData})
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data.list
          for (var key in this.list) {
            if (this.list[key].imgpath) {
              this.list[key].imgpath = this.list[key].imgpath.split(',')
            }
          }
        }
      })
    },
    subBnt () {
      this.searchData = {
        stime: null,
        etime: null,
        user_id: null,
        content: null,
        page: 1,
        size: 10
      }
      this.getData()
    },
    dataSearch () {
      if (!this.searchData.stime) {
        this.searchData.stime = null
      }
      if (!this.searchData.etime) {
        this.searchData.etime = null
      }
    },
    getData () {
      this.dataSearch()
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
