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
                    path: '/',
                    redirect: '/chartManage'
                },
                {
                    path: '/dataManage',
                    name: 'dataManage',
                    component: () => import('../views/dataManage/index.vue')
                },
                {
                    path: '/chartManage',
                    name: 'chartManage',
                    component: () => import('../views/chartManage/index.vue')
                },
                {
                    path: '/mapManage',
                    name: 'mapManage',
                    component: () => import('../views/mapManage/index.vue')
                },
                {
                    path: '/screenManage',
                    name: 'test',
                    component: () => import('../views/screenManage/index.vue')
                },
                // {
                //     path: '/oldScreenManage',
                //     name: 'oldScreenManage',
                //     component: () => import('../views/oldScreenManage/index.vue')
                // },
                {
                    path: '/accountManage',
                    name: 'accountManage',
                    component: () => import('../views/accountManage/index.vue')
                }

            ]
        }
    ]
})
