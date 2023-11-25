import instance from '../utils/request';

// 获取菜单列表
export async function getMenusReq() {

  const res = await instance.get('/menus')
  return res

}

// 新增菜单
export async function addMenuReq(menu: any) {

  const res = await instance.post('/menus', menu)
  return res
}

// 删除菜单
export async function deleteMenuReq(id: number) {

  const res = await instance.delete(`/menus/${id}`)
  return res
}

// 编辑菜单
export async function editMenuReq(id:number , menu: any) {

  const res = await instance.patch(`/menus/${id}`, menu)
  return res
}
