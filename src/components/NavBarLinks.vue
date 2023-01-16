<template>
  <v-list v-model:opened="open" nav density="compact">
    <v-list-item prepend-icon="mdi-home" title="Главная страница" exact to="/"></v-list-item>

    <v-list-group value="elevator">
      <template v-slot:activator="{ props }">
        <v-list-item
            v-bind="props"
            prepend-icon="mdi-elevator"
            title="Эмуляция лифта"
        ></v-list-item>
      </template>

      <v-list-item
          v-for="([title, icon, to, exact], i) in elevatorLinks"
          :key="i"
          :title="title"
          :prepend-icon="icon"
          :value="title"
          :to="to"
          :exact="exact"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: 'NavBarLinks',
  data: () => ({
    open: ['elevator'],
    elevatorLinks: [
      ['Описание задания', 'mdi-clipboard-text-outline', '/elevator', true],
      ['Настройки простого', 'mdi-cog-outline', '/elevator/simplifiedSettings', true],
      ['Эмуляция простая', 'mdi-elevator', '/elevator/simplifiedEmulator', true],
      ['Настройки расширенные', 'mdi-cog-outline', '/elevator/extendedSettings', true],
      ['Эмуляция расширенная', 'mdi-elevator', '/elevator/extendedEmulator', true],
    ],
  }),
}
</script>

<style scoped>

</style>