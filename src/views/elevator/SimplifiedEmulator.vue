<template>
  <div v-if="!elevator">Идет загрузка</div>
  <div v-else style="height:calc(100vh - 48px); width: 100%">
    <v-row
        no-gutters
        style="width: 100%; height: 10%; background: #234908"
    >
      <v-btn @click="restartElevator">restartElevator</v-btn>
      {{ callStack }}
    </v-row>
    <v-row
        no-gutters
        style="width: 100%; height: 90%; background: #b3b7ec"
    >
      <div style="width: 80%; position: relative">
        <div
            class="d-flex"
            id="elevator"
            ref="elevator"
            :style="`width:100%; height:${100/floorsCount}%; background: #535bf2; position: absolute; bottom: 0`"
        >
          <v-chip class="ma-auto">
            <template v-if="elevator.currentStatus === 'moving'">
              {{ elevator.goalFloor }}
              <v-icon size="small">mdi-arrow-{{ elevator.moveDirection }}</v-icon>
            </template>
            <template v-else-if="elevator.currentStatus === 'relax'">
              <v-icon> mdi-sleep</v-icon>
            </template>
            <template v-else>
              <v-icon> mdi-check</v-icon>
            </template>
          </v-chip>
        </div>
      </div>
      <div style="width: 20%; background: #213547; ">
        <div
            v-for="floor in floors"
            :key="floor"
            class="d-flex"
            :style="`height: ${100/floorsCount}%`"
        >
          <v-btn
              :color="callStack.includes(floor) ? 'success' : ''"
              class="ma-auto"
              @click="addFloorToCallStack(floor)"
          >{{ floor }}
          </v-btn>
        </div>

      </div>
    </v-row>

  </div>
</template>

<script lang="js">
import { Elevator } from '@/entities/elevatorEmulator/elevator'

export default {
  name: 'ElevatorSimplifiedEmulator',
  data: () => ({
    floorsCount: 5,
    elevator: null,
  }),
  computed: {
    callStack(){
      if (!this.elevator) return []
      return this.elevator.callStack
    },
    goalFloor () {
      if (!this.elevator) return null
      return this.elevator.goalFloor
    },
    floors () {
      const array = []
      for (let i = this.floorsCount; i > 0; i--) {
        array.push(i)
      }
      return array
    },
  },
  watch: {
    goalFloor (value) {
      this.setBottomToElevatorNode(value)
    },
  },
  methods: {
    init () {
      this.setBottomToElevatorNode()
    },
    async setBottomToElevatorNode (value) {
      if (value === null) return
      const elevatorNode = this.$refs['elevator']
      console.log('setBottomToElevatorNode', 1, this.elevator.currentFloor, this.elevator.goalFloor)
      if (!elevatorNode) return
      console.log('setBottomToElevatorNode', 2, this.elevator.currentFloor, this.elevator.goalFloor)
      const elevatorNodeHeight = elevatorNode.offsetHeight
      elevatorNode.style.transitionDuration = (this.elevator.lastDifference * this.elevator.moveTimePerFloor) + 'ms'
      elevatorNode.style.bottom = (value - 1) * elevatorNodeHeight + 'px'

    },
    restartElevator () {
      this.elevator = new Elevator({
        travelTimePerFloor: 1000,
        floor: 5,
      })
    },
    addFloorToCallStack (floor) {
      this.elevator.addFloorToCallStack(floor)
    },
    start () {
      this.elevator.setGoalFloor(this.goalFloor)
    },
  },
  created () {
    this.elevator = new Elevator({})
  },
  mounted () {
    this.init()
  },
}
</script>

<style>
#elevator {
  transition-property: bottom;
  transition-timing-function: linear;
}
</style>
