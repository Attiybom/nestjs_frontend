import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import { App } from 'vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
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
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export function setupRouter(app: App<Element>) {
  app.use(router)
}

// export { router }
