<template>
  <v-layout>

    <v-app-bar app style="position: fixed">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('toggleTheme')">
        <v-icon>{{ props.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer permanent v-model="drawer">
      <NavBarLinks/>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-layout>

</template>

<script setup lang="ts">

import { ref } from 'vue'
import NavBarLinks from '@/components/NavBarLinks.vue'

const props = defineProps({
  theme: { type: String, required: true }
})

const drawer = ref(false)

</script>
