import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from '../views/LoginRegister.vue'

const routes = [
  {
    path: '/',
    component: LoginRegister
  },
  {
    path: '/admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/bruger',
    component: () => import('../views/User.vue')
  },
  {
    path: '/quiz',
    component: () => import('../views/TestQuizview.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router