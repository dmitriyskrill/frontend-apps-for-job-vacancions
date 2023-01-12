<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('dark')

function toggleTheme () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
  <v-app :theme="theme">
    <component
        @toggleTheme="toggleTheme"
        :theme="theme"
        :is="$route.meta.layout || 'div'"
    ></component>
  </v-app>
</template>

<style scoped>
</style>
