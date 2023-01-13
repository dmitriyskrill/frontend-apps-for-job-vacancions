<template>
  <h1>Вы на главной странице приложения «Эмулятор лифта»</h1>
  <p>Данное приложение является тестовым заданием</p>
  <v-col class="my-2">
    <v-row no-gutters>
      <router-link to="elevator/settings">Перейти к первоначальным настройкам эмулятора лифта</router-link>
    </v-row>
    <v-row no-gutters>
      <router-link to="/elevator/emulator">Запустить приложение со стандартными настройками</router-link>
    </v-row>
  </v-col>

  <h2 class="my-10">Описание:</h2>
  <div
      v-for="(el, i) in description"
      :key="i"
      class="my-2"
  >
    <template v-if="el.type === 'p'">
      <p>{{ el.text }}</p>
    </template>
    <template v-if="el.type === 'list'">
      <p>{{ el.header }}</p>
      <ol class="pl-8 my-2">
        <li
            v-for="(item, listItemIndex) in el.listItems"
            :key="listItemIndex + '_' + i"
            class="white-space-pre-wrap"
        >{{ item }}
        </li>
      </ol>
    </template>
  </div>
  <h2 class="my-10">Иллюстрация приложения:</h2>
  <v-img src="src/assets/appViewExample.jpg">

  </v-img>
</template>

<script lang="ts">
import description from '@/assets/testExercise.json'

export default {
  name: 'ElevatorTaskDescription',
  computed: {
    description () {
      return description
    }
  }
}

</script>

<style scoped>
.white-space-pre-wrap {
  white-space: pre-wrap
}
</style>