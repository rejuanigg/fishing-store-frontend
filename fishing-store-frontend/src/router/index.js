import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/router/LoginView.vue'
import HomeView from './HomeView.vue'
import RegisterView from './RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component:LoginView},
    {path:'/register', component:RegisterView},
    {path:'/', component:HomeView},
  ],
})

export default router
