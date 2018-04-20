<template>
  <div>
    <alert ref="alert"></alert>
  <div class="wrapper b-b">
    <div class="pull-right m-t-n-xs">
      <div class="btn-group" v-show="!isShow">
        <a class="btn btn-default" @click="showBtn()">
          <i class="icon icon-note"></i>
          编辑</a>
        <a @click="open('delete')" class="btn btn-default">
          <i class="icon icon-trash"></i>
          删除</a>
        <a class="btn btn-default" @click="doClose">
          <i class="icon icon-power"></i>
          关闭</a>
      </div>
      <div class="btn-group" v-show="isShow">
        <a class="btn btn-default" @click="saveBtn()">
         </i>
          保存</a>
        <a @click="showBtn()" class="btn btn-default">
          取消</a>
      </div>
      <modal ref="delete">
        <div class="text-center text-lg padder-v">
          确定要删除？
        </div>
        <div class="text-center padder-v">
          <a class="btn btn-md btn-orange m-r" @click="doDelete">确定</a>
          <a class="btn btn-md btn-bordered" @click="close('delete')">取消</a>
        </div>
      </modal>
    </div>
    <div>
      <span class="text-lg">回答详情</span>
    </div>
  </div>
  <div class="wrapper">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td class="w-md">帖子ID</td>
          <td>{{data.id}}</td>
        </tr>
        <tr>
          <td class="w-md">用户ID</td>
          <td>{{data.author.id}}</td>
        </tr>
        <tr>
          <td class="w-md">用户名字</td>
          <td>{{data.author.nickname}}</td>
        </tr>
        <tr>
          <td class="w-md">用户头像</td>
          <td class="fed-avatar"><img :src="data.author.avatar" alt=""></td>
        </tr>
        <tr>
          <td class="w-md">回答时间</td>
          <td>{{data.ctime | times}}</td>
        </tr>
        <tr>
          <td class="w-md">回答内容</td>
          <td v-show='!isShow'>{{data.content}}</td>
          <td v-show='isShow' class="txt"><textarea v-model="data.content"></textarea></td>
        </tr>
        <tr>
          <td class="w-md">回答图片</td>
          <td class="img-m-t"><img v-for="item in data.imgpath" :src="item" alt=""></td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
import api from '@/api'
import {Modal, Alert} from '@/components'
const switchTitle = (str, type = 1) => {
  return parseInt(str) === 1 ? (type === 1 ? '有' : '是') : (type === 1 ? '无' : '否')
}

export default {
  components: {
    Modal,
    Alert
  },
  filters: {
    switchTitle,
    times (val) {
      var time = new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
      return time
    }
  },
  data: () => ({
    data: {
      author: {
        id: '',
        nickname: '',
        avatar: ''
      }
    },
    isShow: false
  }),
  methods: {
    doDelete () {
      this.axios.get(api.questions.answer_rem, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.$refs['alert'].show('删除成功', {type: 'success'})
          this.$router.go(-1)
        } else {
          this.$refs['alert'].show('删除失败')
        }
      })
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    doClose () {
      this.$router.go(-1)
    },
    getDetail () {
      this.axios.get(api.questions.answer_detail, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data[0]
          if (this.data.imgpath) {
            this.data.imgpath = this.data.imgpath.split(',')
          }
        }
      })
    },
    showBtn () {
      this.isShow ? this.isShow = false : this.isShow = true
    },
    saveBtn () {
      this.axios.post(api.questions.answer_edit, {id: this.$route.params.id, content: this.data.content})
      .then(response => {
        if (response.data.code === 200) {
          this.isShow = false
          this.$refs['alert'].show('修改成功', {type: 'success'})
        } else {
          this.$refs['alert'].show('修改失败')
        }
      })
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
<style scope>
  .fed-avatar img{
    width: 40px;
    height: 40px;
  }
  .img-m-t img{
    margin-top: 5px;
  }
  .txt textarea{
     width: 100%;
    height: 100px;
    resize: none;
    padding: 5px;
  }
</style>
