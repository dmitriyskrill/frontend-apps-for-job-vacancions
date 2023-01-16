<template>
  <div
      class="d-flex floor-button"
      :style="`height: ${height}; `"
  >
    <v-btn
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
  props: ['callStack', 'floor', 'height'],
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