import { defineStore } from 'pinia'

export const useExtendedElevatorEmulatorStore = defineStore('extendedElevatorEmulator', {
  state: () => ({
    floorsCount: 5,
    elevatorsCount: 4
  }),
  actions: {
    setFloorsCount (floorsCount: number) {
      this.floorsCount = floorsCount
    },
    setElevatorsCount (elevatorsCount: number) {
      this.elevatorsCount = elevatorsCount
    }
  }
})
