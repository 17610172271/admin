export const rvMetaOptions = {
  coty: [
    { name: '0-3年', value: '0-3年' },
    { name: '3-4年', value: '3-4年' },
    { name: '5-6年', value: '5-6年' },
    { name: '7-8年', value: '7-8年' },
    { name: '10年以上', value: '10年以上' }
  ],
  transmission_case: [
    { name: '自动挡', value: 1 },
    { name: '手动挡', value: 2 },
    { name: '手/自动挡', value: 3 }
  ],
  actuation: [
    { name: '汽油', value: 1 },
    { name: '柴油', value: 2 }
  ],
  driver_license_class: [
    { name: 'C2', value: 1 },
    { name: 'C1', value: 2 },
    { name: 'B2', value: 3 },
    { name: 'B1', value: 4 },
    { name: 'A3', value: 5 },
    { name: 'A2', value: 6 },
    { name: 'A1', value: 7 }
  ],
  mp3: [
    { name: 'mp3', value: 'mp3' },
    { name: 'mp4', value: 'mp4' }
  ]
}

export const orderStatus = [
  { value: 0, name: '未知', full_name: '未知', class: '' },
  { value: 1, name: '待支付', full_name: '已下单,待支付', class: '' },
  { value: 2, name: '用户已取消', full_name: '未支付,用户已取消', class: 'text-muted' },
  { value: 3, name: '支付超时', full_name: '支付超时', class: 'text-muted' },
  { value: 4, name: '已支付', full_name: '已支付,待确认', class: 'text-warning' },
  { value: 5, name: '用户已取消', full_name: '已支付,用户申请退单', class: 'text-danger' },
  { value: 6, name: '商家确认取消', full_name: '商家已确认用户退单', class: 'text-muted' },
  { value: 7, name: '商家未及时接受订单', full_name: '已支付,接单超时', class: 'text-danger' },
  { value: 8, name: '已确认', full_name: '已确认,待取车', class: 'text-info' },
  { value: 9, name: '已拒单', full_name: '已拒单,待退款', class: 'text-danger' },
  { value: 10, name: '已取车', full_name: '已取车,待还车', class: 'text-success' },
  { value: 11, name: '已还车', full_name: '已还车,待评价', class: 'text-muted' }
]

export const orderListLinks = [
  { value: 1, name: '待买家付款' },
  { value: 4, name: '待商家确认' },
  { value: 8, name: '待买家取车' },
  { value: 10, name: '待买家还车' },
  { value: 11, name: '完成的订单' },
  { value: 12, name: '需要评价的' },
  { value: 9, name: '已拒绝的' }
]

// 提现申请状态
export const widthdrawStatus = [
  {value: 1, name: '待处理'},
  {value: 2, name: '处理失败'},
  {value: 3, name: '处理成功'}
]

export default {
  rvMetaOptions,
  orderStatus,
  orderListLinks,
  widthdrawStatus
}
