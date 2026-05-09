
import AdminPanel from '@/views/admin-panel/AdminPanel.vue'
import CartView from '@/views/public/CartView.vue'
import HomeView from '@/views/public/HomeView.vue'
import LoginView from '@/views/public/LoginView.vue'
import AllProductsView from '@/views/public/AllProductsView.vue'
import RegisterView from '@/views/public/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component:LoginView, meta:{layout:'focus'}},
    {path:'/register', component:RegisterView, meta:{layout:'focus'}},
    {path:'/', component:HomeView},
    {path:'/cart', component:CartView, meta:{layout:'focus'}},
    {
      path:'/products',
      component:AllProductsView,
      meta: {layout:'shop'}
    },
    {
      path:'/products/:id',
      name:'product-view',
      component: () => import('@/views/public/ProductView.vue'),
      meta: {layout:'shop'}
    }
    ,
    {
      path:'/admin-panel',
      component:AdminPanel,
      meta: {
        layout:'admin',
        requiresAdmin:true
      },
      children: [
        {
          path:'dashboard',
          name:'admin-home',
          component: () => import ('@/views/admin-panel/PrincipalAdminPanel.vue')
        },
        {
          path:'sections',
          name:'admin-sections',
          component: () => import('@/views/admin-panel/SectionPanelView.vue')
        },
        {
          path:'sections/create',
          name:'admin-section-create',
          component: () => import('@/views/admin-panel/admin-panel-edit/CreateSection.vue')
        },
        {
          path:'sections/:id/edit',
          name:'admin-section-edit',
          component: () => import('@/views/admin-panel/admin-panel-edit/EditSection.vue')
        },
        {
          path:'categories',
          name:'admin-categories',
          component: () => import('@/views/admin-panel/CategoryPanelView.vue')
        },
        {
          path:'categories/create',
          name:'admin-category-create',
          component: () => import('@/views/admin-panel/admin-panel-edit/CreateCategory.vue')
        },
        {
          path:'categories/:id/edit',
          name:'admin-category-edit',
          component:() => import('@/views/admin-panel/admin-panel-edit/EditCategory.vue')
        },
        {
          path:'products',
          name:'admin-products',
          component: () => import('@/views/admin-panel/ProductPanelView.vue')
        },
        {
          path:'products/create',
          name:'admin-product-create',
          component: () => import('@/views/admin-panel/admin-panel-edit/CreateProduct.vue')
        },
        {
          path:'products/:id/images',
          name:'admin-product-image',
          component: () => import('@/views/admin-panel/ImagePanelView.vue')
        },
        {
          path:'products/:id/edit',
          name:'admin-products-edit',
          component:()=> import('@/views/admin-panel/admin-panel-edit/EditProduct.vue')
        }
      ]
    },
  ],
})

router.beforeEach((to, from)=>{
  const auth = useAuthStore();
  if (to.meta.requiresAdmin && !auth.advancedAccess){
    return('/');
  }

})

export default router
