<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <input type="text" class="form-input m-t-n-xs" placeholder="搜索" v-model="searchKey" @change="doSearch">
      </div>
      <div class="pull-right camp-add">
        <router-link :to="{name: 'camp_add', query: {type: 1}}">添加</router-link>
      </div>
      营地管理
    </div>
    <div class="clear padder">
      <ul class="nav nav-custom no-radius b-b">
        <li><router-link :to="{ name: 'camp'}">全部营地</router-link></li>
        <li v-for="link in links">
          <router-link :to="{ name: 'camp', query: { status: link.value}}">{{link.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="wrapper">
        <div class="text-center padder-v" v-if="!list">
          未找到数据
        </div>
        <table class="table table-sm" v-if="list">
          <thead>
            <tr>
              <th>营地名称</th>
              <th class="w-xs">状态</th>
              <th>地址</th>
              <th class="w-sm">时间
                <span class="text-muted">(创建/更新)</span>
              </th>
              <th class="w-xs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>
                <div class="text-lg">
                  {{item.name}}
                </div>
                <!-- <div class="text-muted">
                  {{item.plate_number}} | {{item.model}} | {{item.brand_name}}
                </div> -->
              </td>
              <td style="text-align:center;">
                <div v-if="item.status == '0'" class="text-muted">未审核</div>
                <div v-if="item.status == '1'" class="text-info">已通过</div>
                <div v-if="item.status == '2'" class="text-danger">已驳回</div>
              </td>
              <td style="max-width:250px;">
                {{item.address}}
              </td>
              <td>
                <div class="text-muted">
                  {{item.created_at}}<br>
                  {{item.updated_at}}
                </div>
              </td>
              <td class="text-center">
                <router-link :to="{ name: 'camp_detail', params: { id: item.id}, query: {type: item.type}}">详情</router-link><br>
                <a @click="removeBtn(item.id)">删除</a>
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
        <p>{{dealTxt}}</p>
        <p><button @click="removeYes()">确定</button><button @click="removeHide()">取消</button></p>
      </div>
    </transition>
    <div class="add-box" @click="removeHide()" v-show="removeShow"></div>
    <alert ref="alert"></alert>

  </div>
</template>
<script>
import api from '@/api'
import {Alert} from '@/components'

const links = [
  {value: 0, name: '待审核'},
  {value: 2, name: '已驳回'},
  {value: 1, name: '已通过'}
]

export default {
  data: () => ({
    links: links,
    list: [],
    page: 1,
    searchKey: null,
    removeShow: false,
    removeInd: null,
    dealTxt: '确定删除吗',
    geturl: '',
    status: 0
  }),
  components: {
    Alert
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get(api.camp.list, {
        params: {
          status: this.$route.query.status,
          size: this.$route.query.size,
          page: this.page > 1 ? this.page : 1,
          name: this.searchKey || undefined,
          type: 1
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data.list || []
        }
      })
    },
    onRouteChange () {
      this.page = 1
      this.getList()
    },
    doSearch () {
      this.page = 1
      this.getList()
    },
    setWeight (item) {
      this.axios.post(api.rv.edit, {
        id: item.id,
        weight: item.weight
      }).then(response => {
        if (response.data.code === 200) {
          console.log('success')
        }
      })
    },
    removeBtn (ind) {
      this.removeInd = ind
      this.removeShow = true
    },
    removeHide () {
      this.removeShow = false
    },
    removeYes () {
      this.axios.get(api.camp.del, {params: {id: this.removeInd}})
      .then(response => {
        if (response.data.code === 200) {
          this.$refs['alert'].show('删除成功', {type: 'success'})
          this.removeShow = false
          this.getList()
        } else {
          this.$refs['alert'].show('删除失败')
        }
      })
    }
  },
  watch: {
    '$route': 'onRouteChange',
    page (val) {
      if (val > 0) this.getList()
    }
  }
}
</script>
<style scoped>
  .w-xs {
    width: 94px;
    text-align: center;
    
  }
</style>
