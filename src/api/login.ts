import instance from '../utils/request';

// 登录
export async function loginReq(user:any) {

  const res = await instance.post('/auth/signin', user)
  return res
}

// 注册
export async function signUpReq(user:any) {

  const res = await instance.post('/auth/signup', user)
  return res
}
