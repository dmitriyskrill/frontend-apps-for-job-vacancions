<template>
  <div
      :style="`width: ${width}%;height: 100%`"
  >
    <elevator-emulation-lift-shaft
        :current-status="currentStatus"
        :goal-floor="goalFloor"
        :floors-count="floorsCount"
        :move-direction="moveDirection"
        :id="id"
        :floorHeight="floorHeight"
    />
  </div>
</template>

<script>
import ElevatorEmulationLiftShaft from '@/components/ElevatorEmulation/LiftShaft.vue'

export default {
  name: 'ElevatorEmulationLiftShaftController',
  props: ['width', 'elevator', 'floorsCount', 'floors', 'floorHeight'],
  components: { ElevatorEmulationLiftShaft },
  watch: {
    goalFloor (value) {
      this.setBottomToElevatorNode(value)
    },
  },
  computed: {
    id () {
      return this.elevator.id
    },
    relaxTime () {
      return this.elevator.relaxTime
    },
    moveDirection () {
      return this.elevator.moveDirection
    },
    moveTimePerFloor () {
      return this.elevator.moveTimePerFloor
    },
    currentFloor () {
      return this.elevator.currentFloor
    },
    currentStatus () {
      return this.elevator.currentStatus
    },
    lastDifference () {
      return this.elevator.lastDifference
    },
    callStack () {
      if (!this.elevator) return []
      return this.elevator.callStack
    },
    goalFloor () {
      if (!this.elevator) return null
      return this.elevator.goalFloor
    },

  },
  methods: {
    async setInitialBottomToElevatorNode () {
      const elevatorNode = document.getElementById(`elevator${this.elevator.id}`)
      if (!elevatorNode) return
      elevatorNode.style.transitionDuration = 0 + 'ms'
      elevatorNode.style.bottom = (this.currentFloor - 1) * this.floorHeight + 'px'
    },
    async setBottomToElevatorNode (value) {
      if (value === null) return
      const elevatorNode = document.getElementById(`elevator${this.elevator.id}`)
      if (!elevatorNode) return
      elevatorNode.style.transitionDuration = (this.lastDifference * this.moveTimePerFloor) + 'ms'
      elevatorNode.style.bottom = (value - 1) * this.floorHeight + 'px'
    },
  },
  mounted () {
    this.setInitialBottomToElevatorNode()
    this.setBottomToElevatorNode(this.elevator.goalFloor)
  },
}
</script>