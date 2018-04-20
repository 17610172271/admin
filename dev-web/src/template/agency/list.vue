<template>
  <div>
    <div class="text-center padder-v" v-if="list.length < 1">
      未找到数据
    </div>
    <table class="table" v-if="list.length > 0">
      <thead>
        <tr>
          <th>商家</th>
          <th>当前状态</th>
          <th>驳回理由</th>
          <th>时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>
            {{item.name}}
            <div class="">
              {{item.phone_number}}
            </div>
          </td>
          <td>
            <div v-if="item.status == '1'" class="text-dark">待审核</div>
            <div v-if="item.status == '2'" class="text-danger">已驳回</div>
            <div v-if="item.status == '3'" class="text-success">已通过</div>
          </td>
          <td>
            {{item.reject}}
          </td>
          <td>
            <div class="">
              创建：{{item.created_at}}
            </div>
            <div class="">
              更新：{{item.updated_at}}
            </div>
          </td>
          <td>
            <router-link :to="{ name: 'agency_detail', params: { id: item.id}}">详情</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    list: {}
  }
}
</script>
