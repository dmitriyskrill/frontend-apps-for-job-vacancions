import Main from '../layouts/Main.vue'

const routes = [
    {
        path: '/treeStore',
        name: 'treeStoreTaskDescription',
        component: () => import('@/views/treeStore/TaskDescription.vue'),
        meta: {
            layout: Main
        }
    },
    {
        path: '/treeStore/view',
        name: 'treeStoreView',
        component: () => import('@/views/treeStore/View.vue'),
        meta: {
            layout: Main
        }
    },
]

export default routes