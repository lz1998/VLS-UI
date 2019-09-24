import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/layout'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/Layout.vue'),
      children:[
        {
          path: '/',
          redirect:'/chartManage'
        },
        {
          path: '/chartManage',
          name: 'chartManage',
          component: () => import('../views/chartManage/index.vue')
        },
        {
          path: '/screenManage',
          name: 'screenManage',
          component: () => import('../views/screenManage/index.vue')
        },
        {
          path: '/accountManage',
          name: 'accountManage',
          component: () => import('../views/accountManage/index.vue')
        }

      ]
    }
  ]
})
