<script setup>
import { ref, reactive } from 'vue';

const ruleFormRef = ref(null)
const ruleForm = reactive({
  pass: '',
  checkPass: '',
})

function validatePass(params) {
  console.log('validatePass'.params)
}
function validatePass2(params) {
  console.log('validatePass2'.params)
}

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

</script>

<template>
  <div class="login">
    <div class="form-container">
      <el-form class="form" ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        label-position="top">
        <el-form-item label="用户名:" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码:" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="btn-container">
            <el-button type="primary" class="btn" @click="submitForm(ruleFormRef)">登录</el-button>
            <router-link class="reg-container" to="register">
              <el-button class="btn" @click="resetForm(ruleFormRef)">注册</el-button>
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
