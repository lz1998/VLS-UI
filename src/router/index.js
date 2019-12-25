import Vue from 'vue'
import VueRouter from 'vue-router'
import permission from '@/permission/permission.js'
Vue.use(VueRouter)


const routes= [
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
        redirect:'/dataManage',
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
const Router = new VueRouter({
    routes
})
Router.beforeEach((to, from, next) => {
    if (to.fullPath != '/login') {//如果不是登录组件
        if (!sessionStorage.getItem('username')) {//如果没有登录，就先进入login组件进行登录
            next('/login');
            this.$message({
                message: "未登录",
                type: "error",
                center: true
            })
        } else {//如果登录了，那就继续
            next()
        }
    } else {//如果是登录组件，那就继续。
        next();
    }
    if(from.fullPath=='/login'){
        if(sessionStorage.getItem('role')=='su'){
            next('/userManage')
        }
        else {
            next()
        }
    }
    else {
        next()
    }
})
export default Router

