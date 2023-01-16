<template>
  <div
      class="d-flex floor-button"
      :style="`height: ${floorHeight}px`"
  >
    <v-btn
        size="x-small"
        :color=" selected ? 'success' : ''"
        class="ma-auto"
        @click="$emit('setFloor',floor)"
    >{{ floor }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ElevatorEmulationFloorButton',
  events: ['setFloor'],
  props: ['callStack', 'floor', 'floorHeight'],
  computed: {
    selected () {
      return this.callStack.includes(this.floor)
    },
  },
}
</script>

<style scoped>
.floor-button {
  border-bottom: 1px solid black
}
</style>