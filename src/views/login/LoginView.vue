<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { loginReq } from "../../api/login";
import { LoginEnum } from '@/enum/login';
import useUserStore from '../../store/user';

const userStore = useUserStore()

// 表单实体
const formRef = ref(null)

// 校验规则
const rules = reactive({
  username: [{ validator: validatePass, trigger: 'change' }],
  password: [{ validator: validatePass2, trigger: 'change' }],
})

// 表单信息
const userInfo = reactive({
  username: 'email456@gmail.com',
  password: '123456',
})


// 账号校验函数
function validatePass(_rule: any, value: any, callback: any) {

  // 使用正则表达式校验邮箱格式
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    callback(new Error('账号不能为空'));
  } else if (!emailPattern.test(value)) {
    callback(new Error('账号必须为邮箱格式，如email123@gmail.com'));
  } else {
    callback();
  }
}

// 密码校验函数
function validatePass2(_rule: any, value: any, callback: any) {
  // 使用正则表达式校验密码复杂度
  const passwordPattern = /^(?:(?=.*\d)(?=.*[a-zA-Z])|(?=.*\d)(?=.*[^\w\s])|(?=.*[a-zA-Z])(?=.*[^\w\s])).+$/;
  if (!value) {
    callback(new Error('密码不能为空'));
  } else if (value.length < 6) {
    callback(new Error('密码至少六位'))
  } else if (!passwordPattern.test(value)) {
    callback(new Error('请输入正确的密码'));
  } else {
    callback();
  }
}

const router = useRouter()
interface LoginResType {
  access_token: string
}

// 表单提交
async function submitForm() {
  const { username, password } = userInfo

  const res = await loginReq({ username, password })

  // console.log('login-res', res)

  const { access_token = '' } = res  as unknown as LoginResType

  if (access_token) {
    localStorage.setItem(LoginEnum.USER_TOKEN, access_token)
    userStore.$patch({
      token: access_token
    })
  }

  // if (res.access_token) {
  //   local
  // }

  router.push('/home')
}

</script>

<template>
  <div class="login">
    <div class="form-container">
      <el-form class="form" ref="formRef" show-message :model="userInfo" :rules="rules" label-width="auto"
        label-position="top">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="userInfo.username" type="username" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="userInfo.password" type="password" show-password autocomplete="off" clearable />
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button type="primary" class="btn" @click="submitForm()">登录</el-button>
            <router-link class="reg-container" to="register">
              <el-button class="btn">注册</el-button>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);

  .form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    // height: 40%;
    border: 1px solid transparent;
    border-radius: 16px;
    padding: 16px 16px 0 16px;
    background-color: #fff;

    .form {
      width: 100%;
      padding: 4px;
    }
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .btn {
      width: 100%;
      margin-left: 0;
      margin: 8px 0;
    }

    .reg-container {
      text-align: center;
      width: 100%;
    }
  }
}
</style>
