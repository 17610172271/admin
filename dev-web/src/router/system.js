const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/system',
  component: rs('system/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('system/home'),
      name: 'system'
    },
    {
      path: 'user',
      component: rs('user/index'),
      name: 'user'
    },
    {
      path: 'user/:id/detail',
      component: rs('user/detail'),
      name: 'user_detail'
    },
    {
      path: 'notice',
      component: rs('notice/index'),
      name: 'notice'
    },
    {
      path: 'notice/:id/detail',
      component: rs('notice/detail'),
      name: 'notice_detail'
    },
    {
      path: 'adv',
      component: rs('adv/index'),
      name: 'adv'
    },
    {
      path: 'adv/:id/list',
      component: rs('adv/list'),
      name: 'adv_list'
    },
    {
      path: 'adv/detail',
      component: rs('adv/detail'),
      name: 'adv_add'
    },
    {
      path: 'adv/:type_id/detail',
      component: rs('adv/detail'),
      name: 'adv_edit'
    },
    {
      path: 'adv/:id/categoryedit',
      component: rs('adv/categoryedit'),
      name: 'category_edit'
    },
    {
      path: 'adv/categoryedit',
      component: rs('adv/categoryedit'),
      name: 'category_add'
    },
    {
      path: 'pageadmin',
      component: rs('pageadmin/index'),
      children: [
        {
          path: '',
          component: rs('pageadmin/article-list'),
          name: 'pageadmin'
        },
        {
          path: ':type_id/article-list',
          component: rs('pageadmin/article-list'),
          name: 'article_list'
        },
        {
          path: ':type_id/categoryedit',
          component: rs('pageadmin/categoryedit'),
          name: 'pageadmin_categoryedit'
        },
        {
          path: ':id/detail',
          component: rs('pageadmin/detail'),
          name: 'pageadmin_detail'
        },
        {
          path: 'detail',
          component: rs('pageadmin/detail'),
          name: 'pageadmin_detailadd'
        },
        {
          path: 'categoryadd',
          component: rs('pageadmin/categoryedit'),
          name: 'pageadmin_categoryadd'
        }
      ]
    },
    {
      path: 'pageadmin/:type_id/list',
      component: rs('pageadmin/list'),
      name: 'pageadmin_list'
    },
    {
      path: 'city',
      component: rs('system/city'),
      name: 'city'
    },
    {
      path: 'car_model',
      component: rs('system/car_model'),
      name: 'car_model'
    },
    {
      path: 'car_model/:id',
      component: rs('system/model_detail'),
      name: 'model_detail'
    },
    {
      path: 'car_certify',
      component: rs('system/car_certify'),
      name: 'car_certify'
    },
    {
      path: 'car_certify/:id',
      component: rs('system/certify_detail'),
      name: 'certify_detail'
    }
  ]
}
