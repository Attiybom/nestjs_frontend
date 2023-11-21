<script setup>
// import { signupReq } from "@/api/login";
import { reactive, ref } from 'vue';

const formRef = ref(null)

// const rules = reactive({
//   username: [{ validator: validatePass, trigger: 'change' }],
//   password: [{ validator: validatePass2, trigger: 'change' }],
// })

// const validatePass = (value) => {
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!value) {
//     callback(new Error('账号不能为空'));
//   } else if (!emailPattern.test(value)) {
//     callback(new Error('账号必须为邮箱格式，如email123@gmail.com'));
//   } else {
//     callback();
//   }
// }

// const validatePass2 = (value) => {
//   const passwordPattern = /^(?:(?=.*\d)(?=.*[a-zA-Z])|(?=.*\d)(?=.*[^\w\s])|(?=.*[a-zA-Z])(?=.*[^\w\s])).+$/;
//   if (!value) {
//     callback(new Error('密码不能为空'));
//   } else if (value.length < 6) {
//     callback(new Error('密码至少六位'))
//   } else if (!passwordPattern.test(value)) {
//     callback(new Error('请输入正确的密码'));
//   } else {
//     callback();
//   }
// }


const userInfo = reactive({
  username: ' ',
  password: ' ',
})

// const submitForm = () => {
//   formRef.value.validate((valid) => {
//     if (valid) {
//       signupReq(userInfo)
//     } else {
//       console.log('error submit!!')
//       return false
//     }
//   })
// }

</script>

<template>
  <div class="RegisterView">
    <h2>
      RegisterView
    </h2>
    <div class="">

    </div>
  </div>
</template>

<style scoped>
</style>
