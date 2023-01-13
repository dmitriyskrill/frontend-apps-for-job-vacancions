import Main from '../layouts/Main.vue'

const routes = [
  {
    path: '/elevator',
    name: 'elevatorTaskDescription',
    component: () => import('@/views/elevator/TaskDescription.vue'),
    meta: {
      layout: Main
    }
  },
  {
    path: '/elevator/emulator',
    name: 'elevatorEmulator',
    component: () => import('@/views/elevator/SimplifiedEmulator.vue'),
    meta: {
      layout: Main
    }
  },
  {
    path: '/elevator/settings',
    name: 'elevatorSettings',
    component: () => import('@/views/elevator/Settings.vue'),
    meta: {
      layout: Main
    }
  }
]

export default routes