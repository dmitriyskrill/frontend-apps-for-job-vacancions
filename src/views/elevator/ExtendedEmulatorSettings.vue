<template>
  <div class="pa-8">
    <h1>Страница настроек эмулятора лифта</h1>
    Укажите количество этажей. Текущее значение: {{ floorsCount }}
    <v-text-field
        v-model.number="localFloorsCount"
        append-icon="mdi-arrow-right-circle"
        @click:append="setFloorsCount(localFloorsCount)"
        @keydown.enter="setFloorsCount(localFloorsCount)"
    />
    Укажите количество лифтов. Текущее значение: {{ elevatorsCount }}
    <v-text-field
        v-model.number="localElevatorsCount"
        append-icon="mdi-arrow-right-circle"
        @click:append="setElevatorsCount(localElevatorsCount)"
        @keydown.enter="setElevatorsCount(localElevatorsCount)"
    />
    <v-btn @click="startEmulator">начать</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useExtendedElevatorEmulatorStore } from '@/stores/extendedElevatorEmulator'

export default {
  name: 'ElevatorExtendedEmulatorSettings',
  data: () => ({
    localFloorsCount: null,
    localElevatorsCount: null,
  }),
  computed: {
    ...mapState(useExtendedElevatorEmulatorStore, ['floorsCount', 'elevatorsCount']),
  },
  methods: {
    ...mapActions(useExtendedElevatorEmulatorStore, ['setFloorsCount', 'setElevatorsCount']),
    startEmulator () {
      localStorage.removeItem('multipleElevators')
      localStorage.setItem('multipleElevatorsSettings', JSON.stringify({
        elevatorsCount: this.elevatorsCount, floorsCount: this.floorsCount,
      }))
      this.$router.push('/elevator/extendedEmulator')
    },
  },
}
</script>
