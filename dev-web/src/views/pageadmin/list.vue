<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
       <router-link :to="{ name: 'pageadmin_detailadd' }">添加</router-link>
      </div>
      <a href="javascript:;" @click="back">页面管理</a><span class="gt">&gt;</span><span>列表</span>
    </div>
    <div class="wrapper">
      <div class="text-center padder-v" v-if="!list">
        未找到数据
      </div>
      <table class="table table-sm" v-if="list">
        <thead>
          <tr>
            <th>序号</th>
            <!-- <th>ID</th> -->
            <th>标题</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list">
            <td>{{ index+1 }}</td>
            <td v-if=false>
              {{ item.id }}
            </td>
            <td>
              {{ item.title }}
            </td>
            <td>
              {{ item.created_at }}
            </td>
            <td>
             <router-link :to="{ name: 'pageadmin_detail', params: { id: item.id}}">编辑</router-link>
             <button @click="control(item.id)">删除</button>
           </td>
         </tr>
       </tbody>
     </table>
     <!-- 确认删除弹框 -->
     <div ref="delete" v-if="isTrue" class="modals">
      <div class="text-center text-lg padder-v">
        确定要删除？
      </div>
      <div class="text-center padder-v">
        <a class="btn btn-md btn-orange m-r" @click="Delete(delId)">确定</a>
        <a class="btn btn-md btn-bordered" @click="control()">取消</a>
      </div>
    </div>  
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
  import format from '@/tools/date/format'
  export default {
    filters: {
      format
    },
    data: () => ({
      isTrue: false,
      delId: '',
      list: [],
      page: 1,
      searchKey: null,
      category_name: [],
      type_id: ''
    }),
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.axios.get(api.pageadmin.list, {
          params: {
            category_id: this.$route.params.type_id,
            size: this.$route.query.size,
            page: this.page > 1 ? this.page : 1
          }
        })
        .then(response => {
          if (response.data.code === 200) {
            this.list = response.data.data.list || []
            console.log(response)
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
      Delete (id) {
        this.axios.get(api.pageadmin.del, {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.data.code === 200) {
            this.isTrue = !this.isTrue
            this.getList()
          }
        })
      },
      control (id) {
        this.isTrue = !this.isTrue
        this.delId = id
      },
      back () {
        this.$router.go(-1)
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
  .table th {
    text-align: center;
  }
  .table td {
    text-align: center;
  }
  tbody button {
    border: 0;
    outline: none;
    background-color: #fff;
    color: #ff7c52;
  }
  .modals {
    width: 300px;
    height: 150px;
    background-color: #fff;
    position: absolute;
    top: 20%;
    left: 40%;
    z-index: 11;
    box-shadow: 1px 1px 1px rgba(0,0,0,.3) , -1px -1px 1px rgba(0,0,0,.1);
  }
  .add {
    font-size: 14px;
    color: #ff7c52;
    cursor: pointer;
    margin-right: 20px;
  }
  .gt {
    display: inline-block;
    margin: 0 10px;
  }
</style>
