import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../home/Home.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'bookTable',
    component: () => import('../home/BookTable.vue')
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import('../home/Check.vue')
  },
  // {
  //   path: '/cart',
  //   name: 'profileCart',
  //   component: () => import('../cart/profileCart.vue')
  // },
  {
    path: '/req-cart',
    name: 'RequestCart',
    component: () => import('../cart/RequestCart.vue')
  },
  // {
  //   path: '/view-cart',
  //   name: 'ViewCart',
  //   component: () => import('../cart/ViewCart.vue')
  // },
  {
    path: '/view-cart',
    name: 'ViewCartTab',
    component: () => import('../cart/ViewCartTab.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../login/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../login/Registration.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../login/ForgetPassword.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router