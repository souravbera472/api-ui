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
    path: '/cart',
    name: 'profileCart',
    component: () => import('../cart/profileCart.vue')
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