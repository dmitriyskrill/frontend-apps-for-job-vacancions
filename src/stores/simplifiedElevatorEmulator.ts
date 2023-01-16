import { defineStore } from 'pinia'

export const useSimplifiedElevatorEmulatorStore = defineStore('simplifiedElevatorEmulator', {
  state: () => ({
    floorsCount: 5
  }),
  actions: {
    setFloorsCount (floorsCount: number) {
      this.floorsCount = floorsCount
    }
  },
})
