const rs = path => {
  return resolve => require(['@/extends/' + path], resolve)
}

export default {
  path: '/extends',
  component: rs('index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('home/index'),
      name: 'extends'
    },
    {
      path: 'gather',
      component: rs('gather/index'),
      name: 'gather'
    },
    {
      path: 'gather/:id/detail',
      component: rs('gather/detail'),
      name: 'gather_detail'
    }
  ]
}
