const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/feed',
  component: rs('feed/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('feed/content'),
      name: 'feed'
    },
    {
      path: 'content',
      component: rs('feed/content'),
      name: 'feed_content'
    },
    {
      path: 'comment',
      component: rs('feed/comment'),
      name: 'feed_comment'
    },
    {
      path: 'content/:id/detail',
      component: rs('feed/con-detail'),
      name: 'con-detail'
    },
    {
      path: 'comment/:id/detail',
      component: rs('feed/com-detail'),
      name: 'com-detail'
    }
  ]
}
