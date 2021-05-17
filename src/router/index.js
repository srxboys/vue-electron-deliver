import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index'),
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
    {
      path: '/into',
      component: () => import('@/pages/into'),
      meta: {
        title: '注入js',
        keepAlive: false
      }
    }
  ]
})
