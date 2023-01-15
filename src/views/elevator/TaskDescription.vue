<template>
  <h1>Вы на главной странице приложения «Эмулятор лифта»</h1>
  <p>Данное приложение является тестовым заданием для одной из вакансий</p>
  <v-col class="my-2">
    <v-row no-gutters class="align-center my-2">
      Перейти к первоначальным настройкам эмулятора лифта
      <v-btn class="ml-6" @click="goToSettings"> перейти</v-btn>
    </v-row>
    <v-row no-gutters class="align-center my-2">
      Запустить приложение со стандартными настройками
      <v-btn class="ml-6" @click="startWithoutCache">начать</v-btn>
    </v-row>
    <v-row no-gutters class="align-center my-2">
      Запустить приложение с последнего сохранения
      <v-btn class="ml-6" @click="startWithCache">начать</v-btn>
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

<script>
import description from '@/assets/testExercise.json'

export default {
  name: 'ElevatorTaskDescription',
  computed: {
    description () {
      return description
    },
  },
  methods: {
    goToSettings () {
      this.$router.push('elevator/settings')
    },
    startWithoutCache () {
      localStorage.removeItem('singleElevator')
      this.$router.push('/elevator/emulator')
    },
    startWithCache () {
      this.$router.push('/elevator/emulator')
    },
  },
}

</script>

<style scoped>
.white-space-pre-wrap {
  white-space: pre-wrap
}
</style>