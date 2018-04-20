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
          禁用</a>
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
          一但禁用,用户将不可登录,无法解除禁用,确定要禁用？
        </div>
        <div class="text-center padder-v">
          <a class="btn btn-md btn-orange m-r" @click="doDelete">确定</a>
          <a class="btn btn-md btn-bordered" @click="close('delete')">取消</a>
        </div>
      </modal>
    </div>
    <div>
      <span class="text-lg">用户详情</span>
    </div>
  </div>
  <div class="wrapper">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td class="w-md">ID</td>
          <td>{{data.id}}</td>
        </tr>
        <tr>
          <td class="w-md">昵称</td>
          <td v-show="!isShow">{{data.nickname}}</td>
          <td v-show="isShow"><input type="text" v-model="data.nickname"></td>
        </tr>
        <tr>
          <td class="w-md">性别</td>
          <td v-show="!isShow">{{data.sex | sexs}}</td>
          <td v-show="isShow"><input type="text" v-model="data.sex" maxlength="1"><b>0为男，1为女</b></td>
        </tr>
        <tr>
          <td class="w-md">生日</td>
          <td v-show="!isShow">{{data.birthday}}</td>
          <td v-show="isShow"><input type="text" v-model="data.birthday" placeholder="格式:1999-09-09"></td>
        </tr>
        <tr>
          <td class="w-md">等级</td>
          <td>{{data.level}}</td>
        </tr>
        <tr>
          <td class="w-md">粉丝</td>
          <td>{{data.fans}}</td>
        </tr>
        <tr>
          <td class="w-md">被关注</td>
          <td>{{data.follow}}</td>
        </tr>
        <tr>
          <td class="w-md">邮箱</td>
          <td  v-show="!isShow">{{data.email}}</td>
          <td v-show="isShow"><input type="text" v-model="data.email" ></td>
        </tr>
        <tr>
          <td class="w-md">电话</td>
          <td v-show="!isShow">{{data.tel}}</td>
          <td v-show="isShow"><input type="text" v-model="data.tel" ></td>
        </tr>
        <tr v-show="isShow">
          <td class="w-md">密码</td>
          <td><input type="text" v-model="data.passwd"></td>
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
    },
    sexs (val) {
      if (val === '0') {
        return '男'
      } else {
        return '女'
      }
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
      this.axios.get(api.user.del, {params: {id: this.$route.params.id}})
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
      this.axios.get(api.user.detail, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
        }
      })
    },
    showBtn () {
      this.isShow ? this.isShow = false : this.isShow = true
    },
    saveBtn () {
      if (!this.data.birthday) {
        this.data.birthday = null
      }
      if (!this.data.passwd) {
        this.data.passwd = null
      }
      this.axios.post(api.user.edit, {id: this.$route.params.id, nickname: this.data.nickname, sex: this.data.sex, birthday: this.data.birthday, passwd: this.data.passwd})
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
  .table-bordered input{
    width: 50%;
    height: 30px;
    padding: 0 5px;
    border-radius: 4px;
    border:solid 1px #CCC;
    margin-right: 10px;
  }
  .table-bordered input:focus{
    border-color: #FE7C1E;
  }
</style>
