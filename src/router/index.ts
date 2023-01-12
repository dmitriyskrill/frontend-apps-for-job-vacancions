import { createRouter, createWebHistory } from 'vue-router'

import Main from '../layouts/Main.vue'
import elevatorRoutes from '@/router/elevator'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        layout: Main
      }
    },
    ...elevatorRoutes
  ]
})

export default router