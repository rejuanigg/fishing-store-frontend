import api from "@/services/api";
import { defineStore } from "pinia";
import { cartStore } from "./cart";

export const useAuthStore = defineStore('login',{
  state: () => (
    {
      token: localStorage.getItem('token') || '',
      role: localStorage.getItem('role') || '' ///esto lo hago para trabajar con la reactividad de pinia, si trabajaba con lo que venia del request no fucnionaba
    }//va primero al navegador y de ahi llega a nosotros, está bien esto?
  ),
  getters:{
    isAdmin: (state) => state.role === 'owner',
    advancedAccess: (state) => state.role === 'employed' || state.role === 'owner',
    isLoggedIn: (state) => state.token !== ""
  },
  actions: {
    login(token, role){
      this.token = token
      this.role = role;
    },
    logout(){

      const cart = cartStore()

      api.post('/logout');

      this.token =  "",
      this.role = ""

      localStorage.removeItem('token');
      localStorage.removeItem('role')

      cart.delete();
    },

}
})


