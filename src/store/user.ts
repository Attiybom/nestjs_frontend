import { LoginEnum } from "@/enum/login";
import { defineStore } from "pinia";

const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(LoginEnum.USER_TOKEN) || ''
  })
})

export default useUserStore
