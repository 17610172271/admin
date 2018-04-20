<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
      </div>
      页面管理
    </div>
    <div class="wrapper content">
      <div class="text-center padder-v" v-if="!list">
        未找到数据
      </div>
      <div v-if="list" class="list-data">
        <ul class="category">
          <li class="addcate"><router-link class="addcategory" :to="{ name: 'pageadmin_categoryadd' }">+添加分类</router-link></li>
          <li class="category-list" :class="{'category_list': index === 0}" v-for="(item, index) in list" @click="changeColor($event)">
            <router-link :to="{name: 'article_list', params: {type_id: item.id}}">
              {{item.name}}
            </router-link>
            <span class="operate delete icon icon-trash" @click="control(item.id)"></span>
            <router-link class="operate edit" :to="{ name: 'pageadmin_categoryedit', params: { type_id: item.id}}">
              <span class="icon icon-note"></span>
            </router-link>
          </li>
        </ul>
        <router-view></router-view>
      </div>
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
  </div>
  

</div>
</template>

<script>
  import api from '@/api'

  export default {
    data: () => ({
      isTrue: false,
      delId: '',
      list: [],
      data: [],
      page: 1,
      searchKey: null,
      id: '',
      category_name: [],
      isShow: false
    }),
    created () {
      this.getList()
    },
    methods: {
      getList () {
        this.axios.get(api.pageadmin.category_list, {
          params: {
            size: this.$route.query.size,
            page: this.page > 1 ? this.page : 1
          }
        })
        .then(response => {
          if (response.data.code === 200) {
            this.list = response.data.data.list || []
            this.indexId = this.list[0].id
          }
        })
      },
      changeColor (event) {
        let categoryList = document.getElementsByClassName('category-list')
        for (let i = 0; i < categoryList.length; i++) {
          categoryList[i].classList.remove('category_list')
        }
        event.currentTarget.classList.add('category_list')
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
        this.axios.get(api.pageadmin.category_del, {
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
  * {
    list-style: none;
  }
  .content {
    height: 545px;
    padding: 0px;
  }
  .list-data {
    height: 545px;
  }
  .list-data ul {
    float: left;
    padding: 0;
  }
  .category {
    width: 180px;
    height: 545px;
    border-right: 1px solid #ededed;
    margin: 0;
  }
  .category li {
    line-height: 40px;
    height: 40px;
    font-size: 15px;
    cursor: pointer;
    padding-left: 10px;
    position: relative;
  }
  .category li > a {
    display: inline-block;
    width: 100%;
    color: #000;
    height: 100%;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    padding-right: 50px;
  }
  .category li:hover {
    background-color: #ededed;
  }
  .category .addcategory {
    font-size: 15px;
    color: #fe7c1e;
    text-decoration: underline;
    width: inherit;
    height: inherit;
  }
  .category .addcate {
    cursor: auto;
  }
  .addcategory:hover {
    text-decoration: underline;
  }
  .category .addcate:hover {
    background-color: #fff;
  }
  .category .operate {
    outline: none;
    background-color: transparent;
    font-size: 12px;
    line-height: 40px;
    border: 0;
    padding: 0;
    color: #000;
    display: none;
    position: absolute;
    top: 2px;
    right: 10px;
  }
  .category li:hover .operate {
    display: inline-block;
  }
  .show {
    display: inline;
  }
  .delete:hover {
    color: #fe7c1e;
  }
  .category .edit {
    width: inherit;
    right: 28px;
  }
  .category .edit:hover {
    color: #fe7c1e;
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
  .title {
    display: inline-block;
    width: 250px;
  }

  .delete-title {
    background-color: #fff;
    outline: none;
    border: 0;
    color: #666;
    font-size: 12px;
  }
  .delete-title:hover {
    text-decoration: underline;
  }
  .category_list {
    background-color: #f8f8f8;
    border-left: 3px solid #fe7c1e;
  }
  .category_list .operate {
    display: inline;
  }
</style>
