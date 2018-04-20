const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/financial',
  component: rs('financial/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('financial/home'),
      name: 'financial'
    },
    {
      path: 'refund',
      component: rs('financial/refund'),
      name: 'refund'
    },
    {
      path: 'withdraw',
      component: rs('financial/withdraw'),
      name: 'withdraw'
    }
  ]
}
