const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/rental',
  component: rs('rental/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('rental/home'),
      name: 'rental'
    },
    {
      path: 'agency',
      component: rs('agency/index'),
      name: 'agency'
    },
    {
      path: 'agency/:id/detail',
      component: rs('agency/detail'),
      name: 'agency_detail'
    },
    {
      path: 'agency/:id/edit',
      component: rs('agency/edit'),
      name: 'agency_edit'
    },
    {
      path: 'store',
      component: rs('store/index'),
      name: 'store'
    },
    {
      path: 'store/:id/detail',
      component: rs('store/detail'),
      name: 'store_detail'
    },
    {
      path: 'store/:id/edit',
      component: rs('store/edit'),
      name: 'store_edit'
    },
    {
      path: 'rv',
      component: rs('rv/index'),
      name: 'rv'
    },
    {
      path: 'rv/:id/detail',
      component: rs('rv/detail'),
      name: 'rv_detail'
    },
    {
      path: 'rv/:id/edit',
      component: rs('rv/edit'),
      name: 'rv_edit'
    },
    {
      path: 'rv/:id/fee',
      component: rs('rv/fee'),
      name: 'fee'
    },
    {
      path: 'order',
      component: rs('order/index'),
      name: 'order'
    },
    {
      path: 'order/:id/detail',
      component: rs('order/detail'),
      name: 'order_detail'
    },
    {
      path: 'driver/:id/detail',
      component: rs('driver/detail'),
      name: 'driver_detail'
    },
    {
      path: 'income',
      component: rs('income/index'),
      name: 'income'
    },
    {
      path: 'comment',
      component: rs('comment/index'),
      name: 'comment'
    },
    {
      path: 'comment/:id/detail',
      component: rs('comment/detail'),
      name: 'comment_detail'
    }
  ]
}
