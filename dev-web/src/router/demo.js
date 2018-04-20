// lazy load router

const rs = path => {
  return resolve => require(['@/demo/' + path], resolve)
}

const routes = {
  path: '/demo',
  component: rs('index'),
  children: [
    {
      path: '',
      component: rs('home'),
      name: 'demo_home'
    },
    {
      path: 'alert',
      component: rs('alert'),
      name: 'demo_alert'
    },
    {
      path: 'api',
      component: rs('api'),
      name: 'demo_api'
    },
    {
      path: 'area-stack',
      component: rs('echarts-area-stack'),
      name: 'demo_area_stack'
    },
    {
      path: 'baidu-map',
      component: rs('baidu-map'),
      name: 'demo_baidu_map'
    },
    {
      path: 'check-button',
      component: rs('check-button'),
      name: 'demo_check_button'
    },
    {
      path: 'check-button-group',
      component: rs('check-button-group'),
      name: 'demo_check_button_group'
    },
    {
      path: 'calendar',
      component: rs('calendar'),
      name: 'demo_calendar'
    },
    {
      path: 'city-picker',
      component: rs('city-picker'),
      name: 'demo_city_picker'
    },
    {
      path: 'date-picker',
      component: rs('date-picker'),
      name: 'demo_date_picker'
    },
    {
      path: 'input-text',
      component: rs('input-text'),
      name: 'demo_input_text'
    },
    {
      path: 'input-textarea',
      component: rs('input-textarea'),
      name: 'demo_input_textarea'
    },
    {
      path: 'switch-button',
      component: rs('switch-button'),
      name: 'demo_switch_button'
    },
    {
      path: 'modal',
      component: rs('modal'),
      name: 'demo_modal'
    },
    {
      path: 'modal-confirm',
      component: rs('modal-confirm'),
      name: 'demo_modal_confirm'
    },
    {
      path: 'popup',
      component: rs('popup'),
      name: 'demo_popup'
    },
    {
      path: 'popover',
      component: rs('popover'),
      name: 'demo_popover'
    },
    {
      path: 'radio-button',
      component: rs('radio-button'),
      name: 'demo_radio_button'
    },
    {
      path: 'rater',
      component: rs('rater'),
      name: 'demo_rater'
    },
    {
      path: 'photo-preview',
      component: rs('photo-preview'),
      name: 'demo_photo_preview'
    }
  ]
}

export default routes
