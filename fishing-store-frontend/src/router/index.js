
import AdminPanel from '@/views/admin-panel/AdminPanel.vue'
import CartView from '@/views/public/CartView.vue'
import HomeView from '@/views/public/HomeView.vue'
import LoginView from '@/views/public/LoginView.vue'
import ProductView from '@/views/public/ProductView.vue'
import RegisterView from '@/views/public/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component:LoginView},
    {path:'/register', component:RegisterView},
    {path:'/', component:HomeView},
    {path:'/cart', component:CartView},
    {path:'/products', component:ProductView},
    {
      path:'/admin-panel',
      component:AdminPanel,
      children: [
        {
          path:'sections',
          name:'admin-sections',
          component: () => import('@/views/admin-panel/SectionPanelView.vue')
        },
        {
          path:'categories',
          name:'admin-categories',
          component: () => import('@/views/admin-panel/CategoryPanelView.vue')
        }
      ]
    },
  ],
})

router.beforeEach((to, from)=>{
  const auth = useAuthStore();

  if (to.path.startsWith('/admin-panel') && !auth.advancedAccess){
    return('/');
  }

})

export default router
