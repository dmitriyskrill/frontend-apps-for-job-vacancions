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
      ['Настройки', 'mdi-cog-outline', '/elevator/settings', true],
      ['Эмуляция', 'mdi-elevator', '/elevator/emulator', true],
    ],
  }),
}
</script>

<style scoped>

</style>