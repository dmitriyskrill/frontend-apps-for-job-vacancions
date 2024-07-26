import {createRouter, createWebHistory} from 'vue-router'
import Main from '../layouts/Main.vue'
import elevatorRoutes from '@/router/elevator'
import treeStoreRoutes from '@/router/treeStore'

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
        ...elevatorRoutes,
        ...treeStoreRoutes
    ]
})

export default router