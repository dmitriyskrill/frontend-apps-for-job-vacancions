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
    path: '/elevator/simplifiedEmulator',
    name: 'simplifiedElevatorEmulator',
    component: () => import('@/views/elevator/SimplifiedEmulator.vue'),
    meta: {
      layout: Main
    }
  },
  {
    path: '/elevator/simplifiedSettings',
    name: 'simplifiedElevatorSettings',
    component: () => import('@/views/elevator/SimplifiedEmulatorSettings.vue'),
    meta: {
      layout: Main
    }
  },
  {
    path: '/elevator/extendedSettings',
    name: 'extendedElevatorSettings',
    component: () => import('@/views/elevator/ExtendedEmulatorSettings.vue'),
    meta: {
      layout: Main
    }
  },
  {
    path: '/elevator/extendedEmulator',
    name: 'extendedElevatorEmulator',
    component: () => import('@/views/elevator/ExtendedEmulator.vue'),
    meta: {
      layout: Main
    }
  }
]

export default routes