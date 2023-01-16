<template>
  <div style="display: flex; flex-direction: column; justify-content: end">
    <elevator-emulation-floor-button
        v-for="floor in floors"
        :key="floor"
        :call-stack="callStack"
        @setFloor="$emit('setFloor', $event)"
        :floor="floor"
        :floorHeight="floorHeight"
    />
  </div>
</template>

<script>
import ElevatorEmulationFloorButton from '@/components/ElevatorEmulation/FloorButton.vue'

export default {
  name: 'ElevatorEmulationButtonBlock',
  components: { ElevatorEmulationFloorButton },
  props: ['floors', 'floorsCount', 'callStack', 'floorHeight'],
  events: ['setFloor'],
}
</script>