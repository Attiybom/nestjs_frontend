import instance from '../utils/request';

// 获取全部用户信息
export async function getUsersReq(data: any = {}) {

  const res = await instance.get('/user', {
    params: data
  })
  return res
}
// 创建用户
export async function createUserReq(user: any) {

  const res = await instance.post('/user', user)
  return res
}
// 编辑用户
export async function updateUserReq(id: number,user: any) {

  const res = await instance.patch(`/user/${id}`, user)
  return res
}

// 删除用户
export async function deleteUserReq(id: number) {

  const res = await instance.delete(`/user/${id}`)
  return res
}
