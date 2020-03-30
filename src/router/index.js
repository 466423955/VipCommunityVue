import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Ask from '@/components/Ask'
import Question from '@/components/Question.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ask',
      name: 'Ask',
      component: Ask,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/question/:Id',
      name: 'Question',
      component: Question
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
