<template>
  <div class="pa-8">
    <h1>Страница настроек эмулятора лифта</h1>
    Укажите количество этажей. Текущее значение {{ floorsCount }}
    <v-text-field
        v-model.number="localFloorsCount"
        append-icon="mdi-arrow-right-circle"
        @click:append="setFloorsCount(localFloorsCount)"
    />
    <v-btn @click="startEmulator">начать</v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useSimplifiedElevatorEmulatorStore } from '@/stores/simplifiedElevatorEmulator'

export default {
  name: 'SimplifiedExtendedEmulatorSettings',
  data: () => ({
    localFloorsCount: null,
  }),
  computed: {
    ...mapState(useSimplifiedElevatorEmulatorStore, ['floorsCount']),
  },
  methods: {
    ...mapActions(useSimplifiedElevatorEmulatorStore, ['setFloorsCount']),
    startEmulator () {
      localStorage.removeItem('singleElevator')
      localStorage.setItem('singleElevatorFloorsCount', this.floorsCount)
      this.$router.push('/elevator/simplifiedEmulator')
    },
  },
}
</script>
