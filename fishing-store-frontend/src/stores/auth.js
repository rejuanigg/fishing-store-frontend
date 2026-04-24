import { defineStore } from "pinia";

export const useAuthStore = defineStore('login',{
  state: () => ({token:""}),
  actions: {
    login(token){
      this.token = token
    }
  }
})


