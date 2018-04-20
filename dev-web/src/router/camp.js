const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/camp',
  component: rs('camp/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('camp/homes'),
      name: 'camps'
    },
    {
      path: 'camp',
      component: rs('camp/home'),
      name: 'camp'
    },
    {
      path: 'park',
      component: rs('camp/park'),
      name: 'park'
    },
    {
      path: 'scenic',
      component: rs('camp/scenic'),
      name: 'scenic'
    },
    {
      path: 'cate',
      component: rs('camp/cate'),
      name: 'cate'
    },
    {
      path: 'depot',
      component: rs('camp/depot'),
      name: 'depot'
    },
    {
      path: 'aerate',
      component: rs('camp/aerate'),
      name: 'aerate'
    },
    {
      path: 'add',
      component: rs('camp/add'),
      name: 'camp_add'
    },
    {
      path: 'detail/:id',
      component: rs('camp/detail'),
      name: 'camp_detail'
    }
  ]
}
