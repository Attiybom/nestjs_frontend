import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import { App } from 'vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/RegisterView.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/dashboard',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: 'menus',
        name: 'menus',
        component: () => import('@/views/menus/index.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index.vue')
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
