import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
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
            component: () => import('../views/layout/index.vue'),
            children: [
                {
                    path: '/dataManage',
                    name: '数据管理',
                    icon:'assignment',
                    component: () => import('../views/dataManage/index.vue')
                },
                {
                    path: '/chartManage',
                    name: '图表管理',
                    icon:'dashboard',
                    component: () => import('../views/chartManage/index.vue')
                },
                // {
                //     path: '/mapManage',
                //     name: 'mapManage',
                //     component: () => import('../views/mapManage/index.vue')
                // },
                {
                    path: '/screenManage',
                    name: '大屏管理',
                    icon:'computer',
                    component: () => import('../views/screenManage/index.vue')
                },
                // {
                //     path: '/oldScreenManage',
                //     name: 'oldScreenManage',
                //     component: () => import('../views/oldScreenManage/index.vue')
                // },
                {
                    path: '/userManage',
                    name: '用户管理',
                    icon: 'supervisor_account',
                    component: () => import('../views/userManage/index.vue')
                },
                {
                    path: '/accountManage',
                    name: '账号管理',
                    icon: 'settings',
                    component: () => import('../views/accountManage/index.vue')
                }

            ]
        }
    ]
})
