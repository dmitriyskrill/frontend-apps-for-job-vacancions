<template>
  <div style="width: 20%; background: #213547; ">
    <elevator-emulation-floor-button
        v-for="floor in floors"
        :key="floor"
        :call-stack="callStack"
        :height="`${100/floorsCount}%`"
        @setFloor="$emit('setFloor', $event)"
        :floor="floor"
    />
  </div>
</template>

<script>
import ElevatorEmulationFloorButton from '@/components/ElevatorEmulation/FloorButton.vue'

export default {
  name: 'ElevatorEmulationButtonBlock',
  components: { ElevatorEmulationFloorButton },
  props: ['floors', 'floorsCount', 'callStack'],
  events: ['setFloor'],
}
</script>

<style scoped>

</style>