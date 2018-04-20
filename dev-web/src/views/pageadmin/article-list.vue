<template>
  <ul class="detail">
    <li><router-link class="addtitle" :to="{ name: 'pageadmin_detailadd' }">+添加文档</router-link></li>
    <li v-for="item in data"><router-link class="title" :to="{ name: 'pageadmin_detail', params: { id: item.id}}">{{item.title}}</router-link><span class="creat-time">{{item.created_at}}</span></li>
  </ul>
</template>
<script>
  import api from '@/api'

  export default {
    props: {
    },
    data () {
      return {
        indexId: 1,
        data: {}
      }
    },
    methods: {
      getData () {
        this.axios.get(api.pageadmin.list, {
          params: {
            category_id: this.$route.params.type_id || this.indexId,
            size: this.$route.query.size,
            page: this.page > 1 ? this.page : 1
          }
        })
        .then(response => {
          if (response.data.code === 200) {
            this.data = response.data.data.list || []
          }
        })
      },
      onRouteChange () {
        this.getData()
      }
    },
    created () {
      this.getData()
    },
    watch: {
      '$route': 'onRouteChange'
    }
  }
</script>
<style scoped>
.detail {
    width: 650px;
    height: 545px;
    margin: 0;
  }
  .detail li {
    line-height: 40px;
    font-size: 15px;
    padding-left: 30px;
  }
  .addtitle {
    font-size: 15px;
    line-height: 40px;
    text-decoration: underline;
  }
  .addtitle:hover {
    text-decoration: underline;
  }
  .detail li a {
    color: #666;
  }
  .detail li a:hover {
    text-decoration: underline;
  }
  .creat-time {
    float: right;
    width: 150px;
    font-size: 12px;
    color: #999;
  }
</style>
