import api from "@/services/api";
import { defineStore } from "pinia";
import { cartStore } from "./cart";

export const useAuthStore = defineStore('login',{
  state: () => ({
    token: localStorage.getItem('token') || '',
    role: '',
    id: null
  }),
  getters:{
    isAdmin: (state) => state.role === 'owner',
    advancedAccess: (state) => state.role === 'employed' || state.role === 'owner',
    isLoggedIn: (state) => state.token !== ""
  },
  actions: {
    login(token, id){
      this.token = token
      this.id = id
    },
    async fetchMe (){
      const response = await api.get('/me')
      this.role = response.data.role
      this.id = response.data.id
    }
    ,
    logout(){

      const cart = cartStore()

      api.post('/logout');

      this.token =  "",
      this.role = " "

      localStorage.removeItem('token');

      cart.delete();
    },

}
})


