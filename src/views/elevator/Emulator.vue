<template>
  {{ elevator }}
  <!--  <v-btn @click="start">start</v-btn>-->
  <v-btn @click="restartElevator">restartElevator</v-btn>
  <v-btn @click="addFloorToCallStack">addFloorToCallStack</v-btn>
  <v-text-field v-model.number="goalFloor" type="number" label="goalFloor"></v-text-field>
</template>

<script lang="js">
import Elevator from '@/entities/elevator'

export default {
  data: () => ({
    elevator: new Elevator({}),
    goalFloor: 1,
  }),
  methods: {
    restartElevator () {
      this.elevator = new Elevator({
        travelTimePerFloor: 1000,
        floor:5
      })
    },
    addFloorToCallStack () {
      this.elevator.addFloorToCallStack(this.goalFloor)
    },
    start () {
      this.elevator.setGoalFloor(this.goalFloor)
    },
  },
}
</script>
