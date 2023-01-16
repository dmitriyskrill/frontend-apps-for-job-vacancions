<template>
  <div class="lift-shaft-container d-flex ">
    <div class="lift-shaft ma-auto">
      <div
          class="floor"
          v-for="floor in floorsCount"
          :key="floor"
          :style="`height:${100/floorsCount}%;`"
      >
      </div>
      <div
          class="d-flex elevator"
          :id="`elevator${id}`"
          :style="`height:${100/floorsCount}%;`"
          :class="currentStatus === 'relax' ? 'animated-elevator' : ''"
      >
        <v-chip class="ma-auto" size="x-small">
          <template v-if="currentStatus === 'moving'">
            {{ goalFloor }}
            <v-icon size="small">mdi-arrow-{{ moveDirection }}</v-icon>
          </template>
          <template v-else-if="currentStatus === 'relax'">
            <v-icon> mdi-sleep</v-icon>
          </template>
          <template v-else>
            <v-icon> mdi-check</v-icon>
          </template>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElevatorEmulationLiftShaft',
  props: ['currentStatus', 'goalFloor', 'floorsCount', 'moveDirection', 'id'],
}
</script>

<style scoped lang="scss">
.lift-shaft-container {
  width: 100%;
  height: 100%;
}


.lift-shaft {
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: 95%;
  height: 100%;
  position: relative;

  > .floor {
    border-bottom: 1px solid black;
  }

  > .elevator {
    width: 100%;
    background: #535bf2;
    position: absolute;
    bottom: 0
  }
}
</style>