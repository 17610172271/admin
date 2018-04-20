// all api
export const BASE_URL = '/server/public'

// 通用接口
export const common = {
  upload: '/common/upload',
  province: 'common/getProvince',
  city: 'common/getCity',
  area: 'common/getArea'
}

// 账户
export const account = {
  auth: 'account/auth',
  login: 'account/login',
  register: 'account/register'
}

// 商户
export const agency = {
  list: 'agency/list',
  home: 'agency/index',
  add: 'agency/add',
  detail: 'agency/find',
  edit: 'agency/edit',
  editStatus: 'agency/editStatus',
  editCharge: 'agency/editCharge',
  editWeight: 'agency/editWeight'
}

// 店铺
export const store = {
  add: 'store/add',
  edit: 'store/edit',
  find: 'store/find',
  list: 'store/list',
  del: 'store/del',
  passList: 'store/passList'
}

// 车辆
export const rv = {
  add: 'rv/add',
  edit: 'rv/edit',
  find: 'rv/find',
  list: 'rv/list',
  del: 'rv/del',
  close: 'rv/editClose',
  editStatus: 'rv/editStatus'
}

// 车辆价格排期
export const rvdateprice = {
  list: 'rvdateprice/list',
  edit: 'rvdateprice/edit',
  batchEdit: 'rvdateprice/batchEdit'
}

// 订单
export const order = {
  list: 'order/list',
  detail: 'order/find',
  // editStatus: 'order/editStatus',
  editStatus: 'order/updStatus'
}

// 评论
export const comment = {
  list: 'comment/list',
  myList: 'comment/myList',
  find: 'comment/find',
  add: 'comment/add'
}
// 收益
export const bankAccount = {
  list: 'Analytics/info',
  add: '',
  find: ''
}
// 提现
export const withdraw = {
  list: 'Financial/withdrawList',
  edit: 'Financial/editWithdraw' // 提现申请
}

// 提现账户
export const withdrawAccount = {
  list: 'Withdraw/accountList',
  add: 'Withdraw/addAccount',
  edit: 'Withdraw/editAccount',
  find: 'Withdraw/findAccount',
  banklist: 'Withdraw/bankList'
}

// 收益管理
export const rentalIncome = {
  dashboard: '', // 收益首页
  stream: 'Transaction/transactionList', // 交易流水
  list: 'Analytics/info'
}

// 退款管理
export const refund = {
  list: 'Financial/cancelList',
  edit: 'Financial/editStatus'
}

// 消息接口
export const message = {
  list: 'message/list',
  find: 'message/find'
}

// 用户
export const user = {
  list: 'user/list',
  detail: 'user/find',
  edit: 'user/edit',
  del: 'user/del'
}

// 车辆信息采集器
export const gather = {
  list: 'gather/list',
  detail: 'gather/find'
}

// 广告管理
export const adv = {
  list: 'Adv/list',
  find: 'Adv/find',
  del: 'Adv/del',
  edit: 'Adv/edit',
  add: 'Adv/add',
  // 分类管理
  category_list: 'Advcategory/list',
  category_detail: 'Advcategory/find',
  category_add: 'Advcategory/add',
  category_edit: 'Advcategory/edit',
  category_del: 'Advcategory/del'
}
// 页面管理
export const pageadmin = {
  // 分类管理
  category_list: 'Pagecategory/list',
  category_detail: 'Pagecategory/find',
  category_add: 'Pagecategory/add',
  category_edit: 'Pagecategory/edit',
  category_del: 'Pagecategory/del',

  // 内容管理
  list: 'Page/list',
  detail: 'Page/find',
  add: 'Page/add',
  edit: 'Page/edit',
  del: 'Page/del'
}
// 页面管理
export const city = {
  list: 'city/list',
  edit: 'city/edit'
}

// 房车圈管理
export const feed = {
  content_list: 'post/feed',
  comment_list: 'post/replyList',
  content_detail: 'post/find',
  comment_detail: 'post/replyFind',
  content_edit: 'post/edit',
  comment_edit: 'post/replyEdit',
  content_rem: 'post/del',
  comment_rem: 'post/replyDel'
}

// 问答管理
export const questions = {
  issue_list: 'wdpost/feed',
  issue_detail: 'wdpost/find',
  issue_edit: 'wdpost/edit',
  issue_rem: 'wdpost/del',
  answer_list: 'wdpost/replyList',
  answer_detail: 'wdpost/replyFind',
  answer_edit: 'wdpost/replyEdit',
  answer_rem: 'wdpost/replyDel'
}

// 营地管理
export const camp = {
  list: 'camp/list',
  campadd: '/camp/add',
  complete: '/camp/complete',
  find: 'camp/find',
  updStatus: 'camp/updStatus',
  edit: '/camp/edit',
  del: '/camp/del',
  withdrawList: 'camp/withdrawList',
  campConf: 'camp/campConf',
  imglist: 'camp/imgList',
  imgadd: '/camp/addImg',
  imgdel: '/camp/delImg',
  service_list: 'camp/serviceList',
  server_info: 'camp/serviceInfo',
  server_add: 'camp/addService',
  server_del: 'camp/delService',
  server_edit: 'camp/editService',
  server_bind_add: 'camp/addRelateService',
  server_bind_del: 'camp/delRelateService',
  server_bind_edit: 'camp/editRelateService'
}

// 爱车认证
export const certify = {
  brand_list: 'brand/list',
  brand_info: 'brand/info',
  add_brand: 'brand/add',
  edit_brand: 'brand/edit',
  del_brand: 'brand/del',
  add_model: 'brand/rvAdd',
  edit_model: 'brand/rvEdit',
  del_model: 'brand/rvDel',
  certify_list: 'user/rvList',
  certify_info: 'user/rvInfo',
  certify_edit: 'user/rvEdit',
  certify_status: 'user/rvEditStatus',
  certify_del: 'user/rvDel',
  certify_bind_brand: 'user/rvRelateType'
}

export default {
  BASE_URL,
  auth: account.auth,
  login: account.login,
  register: account.register,
  upload: common.upload,
  common,
  account,
  agency,
  store,
  rv,
  rvdateprice,
  order,
  comment,
  message,
  withdraw,
  withdrawAccount,
  rentalIncome,
  user,
  gather,
  adv,
  pageadmin,
  city,
  refund,
  feed,
  questions,
  camp,
  certify,
  campupload: camp.imgadd
}
