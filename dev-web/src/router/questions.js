const rs = path => {
  return resolve => require(['@/views/' + path], resolve)
}

export default {
  path: '/questions',
  component: rs('questions/index'),
  meta: { requireAuth: true },
  children: [
    {
      path: '',
      component: rs('questions/issue'),
      name: 'questions'
    },
    {
      path: 'issue',
      component: rs('questions/issue'),
      name: 'questions_issue'
    },
    {
      path: 'answer',
      component: rs('questions/answer'),
      name: 'questions_answer'
    },
    {
      path: 'issue/:id/detail',
      component: rs('questions/issue-detail'),
      name: 'issue-detail'
    },
    {
      path: 'answer/:id/detail',
      component: rs('questions/answer-detail'),
      name: 'answer-detail'
    }
  ]
}
