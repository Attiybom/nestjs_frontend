import { defineStore } from 'pinia'

import { MenusItem } from "@/components/types/SidebarNav";

export const userMenuStore = defineStore('menu', {
  // other options...

  state: () => ({
    menus: [
      {
        id: 1,
        name: '控制台',
        path: 'dashboard',
        routeName: 'dashboard',
        icon: 'HomeFilled'
      },
      {
        id: 2,
        name: '用户管理',
        path: 'users',
        routeName: 'users',
        icon: 'User'
      },
      {
        id: 3,
        name: '角色管理',
        path: 'roles',
        routeName: 'roles',
        icon: 'setting'
      },
      {
        id: 4,
        name: '菜单管理',
        path: 'menus',
        routeName: 'menus',
        icon: 'Menu'
      },
    ] as MenusItem[]
  })
})
