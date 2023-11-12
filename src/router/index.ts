import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import { App } from 'vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/RegisterView.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/dashboard',
    component: () => import('@/layouts/default.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '控制台'
        },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue'),
        meta: {
          title: '用户管理'
        },
      },
      {
        path: 'menus',
        name: 'menus',
        component: () => import('@/views/menus/index.vue'),
        meta: {
          title: '菜单管理'
        },
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index.vue'),
        meta: {
          title: '角色管理'
        },
      },
    ]
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export function setupRouter(app: App<Element>) {
  app.use(router)
}

// export { router }
