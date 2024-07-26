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
          v-for="({title, icon, to, exact}, i) in elevatorLinks"
          :key="i"
          :title="title"
          :prepend-icon="icon"
          :value="title"
          :to="to"
          :exact="exact"
      ></v-list-item>
    </v-list-group>
    <v-list-group value="treeStore">
      <template v-slot:activator="{ props }">
        <v-list-item
            v-bind="props"
            prepend-icon="mdi-file-tree"
            title="Хранилище дерева"
        ></v-list-item>
      </template>

      <v-list-item
          v-for="({title, icon, to, exact}, i) in treeStoreLinks"
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

<script lang="ts">

export default {
  name: 'NavBarLinks',
  data: () => ({
    open: ['elevator'],
    elevatorLinks: [
      {title: 'Описание задания', icon: 'mdi-clipboard-text-outline', to: '/elevator', exact: true},
      {title: 'Настройки простого', icon: 'mdi-cog-outline', to: '/elevator/simplifiedSettings', exact: true},
      {title: 'Эмуляция простая', icon: 'mdi-elevator', to: '/elevator/simplifiedEmulator', exact: true},
      {title: 'Настройки расширенные', icon: 'mdi-cog-outline', to: '/elevator/extendedSettings', exact: true},
      {title: 'Эмуляция расширенная', icon: 'mdi-elevator', to: '/elevator/extendedEmulator', exact: true},
    ],
    treeStoreLinks: [
      {title: 'Описание задания', icon: 'mdi-clipboard-text-outline', to: '/treeStore', exact: true},
      {title: 'Работа с деревом', icon: 'mdi-file-tree', to: '/treeStore/view', exact: true},
    ],
  }),
}
</script>

<style scoped>

</style>