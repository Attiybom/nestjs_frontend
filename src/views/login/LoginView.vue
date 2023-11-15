<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

// 表单实体
const formRef = ref(null)

// 校验规则
const rules = reactive({
  username: [{ validator: validatePass, trigger: 'change' }],
  password: [{ validator: validatePass2, trigger: 'change' }],
})

// 表单信息
const userInfo = reactive({
  username: 'email123@gmail.com',
  password: 'qwe123',
})


// 账号校验函数
function validatePass(rule, value, callback) {

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
function validatePass2(rule, value, callback) {
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
// 表单提交
function submitForm() {
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
