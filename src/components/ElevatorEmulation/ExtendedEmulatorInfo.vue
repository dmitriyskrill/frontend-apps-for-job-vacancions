<template>
  <div class="pa-1">
    <h2>Общая очередь вызовов:</h2>
    {{ callStack }}
    <h2>Данные по лифтам:</h2>
    <v-row no-gutters>
      <v-col cols="2" class="pa-1 ma-auto">id</v-col>
      <v-col cols="2" class="pa-1 ma-auto">Текущий этаж</v-col>
      <v-col cols="3" class="pa-1 ma-auto">Скорость прохождения этажа</v-col>
      <v-col cols="3" class="pa-1 ma-auto">Отдых, с</v-col>
      <v-col cols="2" class="pa-1 ma-auto">Очередь вызовов</v-col>
    </v-row>
    <v-row
        no-gutters
        v-for="elevator in elevators"
        :key="elevator.id"
    >
      <v-col cols="2" class="pa-1">{{ elevator.id }}</v-col>
      <v-col cols="2" class="pa-1">{{ elevator.currentFloor }}</v-col>
      <v-col cols="3" class="pa-1">{{ elevator.moveTimePerFloor / 1000 }}</v-col>
      <v-col cols="3" class="pa-1">{{ elevator.relaxTime / 1000 }}</v-col>
      <v-col cols="2" class="pa-1">{{ elevator.callStack }}</v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'ElevatorEmulationExtendedEmulatorInfo',
  props: ['callStack', 'elevators'],
}
</script>