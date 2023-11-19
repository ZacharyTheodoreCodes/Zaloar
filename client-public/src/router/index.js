import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'

import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

import BookmarkPage from '../views/BookmarkPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'products',
      path: '/products',
      component: HomePage
    },
    {
      name: 'product-detail',
      path: '/products/:id',
      component: ProductDetailPage
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterPage
    },
    {
      name: 'bookmarks',
      path: '/bookmarks',
      component: BookmarkPage
    }
  ]
})

//navigation guard
router.beforeEach((to, from, next) => {
  const unauthenticatedPage = ['login', 'register'].includes(to.name)
  const authenticated = localStorage.access_token
  // const global = useProductStore()

  if (['products', 'product-detail'].includes(to.name)) {
    next()
  } else if ((unauthenticatedPage && authenticated) || to.path === '/') {
    next('/products')
  } else if (!unauthenticatedPage && !authenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router
