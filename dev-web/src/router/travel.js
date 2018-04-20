const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/travel',
  component: rs('travel/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      components: rs('travel'),
      name: 'travel'
    }
  ]
}
