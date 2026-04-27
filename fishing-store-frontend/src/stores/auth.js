import api from "@/services/api";
import { defineStore } from "pinia";
import { cartStore } from "./cart";


export const useAuthStore = defineStore('login',{
  state: () => ({token:""}),
  actions: {
    login(token){
      this.token = token
    },
    logout(state){
      const cart = cartStore()

      api.post('/logout');
      localStorage.clear('token', state.token);
      cart.delete();
  }}
})


