<template>
  <v-app-bar app density="compact">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon @click="$emit('toggleTheme')">
      <v-icon>{{ theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>

  <v-navigation-drawer permanent v-model="drawer">
    <NavBarLinks/>
  </v-navigation-drawer>

  <v-main>
    <router-view/>
  </v-main>
</template>

<script lang="js">
import { ref } from 'vue'
import NavBarLinks from '@/components/NavBarLinks.vue'

export default {
  components: {
    NavBarLinks,
  },
  emits: ['toggleTheme'],
  props: ['theme'],
  setup () {
    const drawer = ref(true)

    return { drawer }
  },
}


</script>
