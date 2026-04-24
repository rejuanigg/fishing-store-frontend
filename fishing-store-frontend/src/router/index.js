import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/router/LoginView.vue'
import HomeView from '@/router/HomeView.vue'
import RegisterView from '@/router/RegisterView.vue'
import CartView from '@/router/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component:LoginView},
    {path:'/register', component:RegisterView},
    {path:'/', component:HomeView},
    {path:'/cart', component:CartView}
  ],
})

export default router
