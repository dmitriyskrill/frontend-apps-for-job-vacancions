<template>
  <div class="pa-8">
    <h1>Вы на главной странице приложения «Эмулятор лифта»</h1>
    <p>Данное приложение является тестовым заданием для одной из вакансий</p>

    <h2 class="my-10">Реализация приложения с одним лифтом</h2>

    <v-col class="my-2">
      <v-row no-gutters class="align-center my-2">
        Перейти к первоначальным настройкам эмулятора лифта
        <v-btn class="ml-6" @click="goToSimplifiedSettings"> перейти</v-btn>
      </v-row>
      <v-row no-gutters class="align-center my-2">
        Запустить приложение со стандартными настройками
        <v-btn class="ml-6" @click="startSimplifiedWithoutCache">начать</v-btn>
      </v-row>
      <v-row no-gutters class="align-center my-2">
        Запустить приложение с последнего сохранения
        <v-btn class="ml-6" @click="startSimplifiedWithCache">начать</v-btn>
      </v-row>
    </v-col>

    <h2 class="my-10">Реализация приложения с несколькими лифтами</h2>

    <v-col class="my-2">
      <v-row no-gutters class="align-center my-2">
        Перейти к первоначальным настройкам эмулятора лифта
        <v-btn class="ml-6" @click="goToExtendedSettings"> перейти</v-btn>
      </v-row>
      <v-row no-gutters class="align-center my-2">
        Запустить приложение со стандартными настройками
        <v-btn class="ml-6" @click="startExtendedWithoutCache">начать</v-btn>
      </v-row>
      <v-row no-gutters class="align-center my-2">
        Запустить приложение с последнего сохранения
        <v-btn class="ml-6" @click="startExtendedWithCache">начать</v-btn>
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
  </div>
</template>

<script>
import description from '@/assets/testExercise.json'
import { mapActions } from 'pinia'
import { useExtendedElevatorEmulatorStore } from '@/stores/extendedElevatorEmulator'
import { useSimplifiedElevatorEmulatorStore } from '@/stores/simplifiedElevatorEmulator'

export default {
  name: 'ElevatorTaskDescription',
  computed: {
    description () {
      return description
    },
  },
  methods: {
    ...mapActions(useExtendedElevatorEmulatorStore, {
      extendedSetFloorsCount: 'setFloorsCount',
      extendedSetElevatorsCount: 'setElevatorsCount'
    }),
    ...mapActions(useSimplifiedElevatorEmulatorStore, {
      simplifiedSetFloorsCount: 'setFloorsCount',
    }),
    goToSimplifiedSettings () {
      this.$router.push('elevator/simplifiedSettings')
    },
    startSimplifiedWithoutCache () {
      localStorage.removeItem('singleElevator')
      localStorage.removeItem('singleElevatorFloorsCount')
      this.$router.push('/elevator/simplifiedEmulator')
    },
    startSimplifiedWithCache () {
      this.$router.push('/elevator/simplifiedEmulator')
    },
    goToExtendedSettings () {
      this.$router.push('elevator/extendedSettings')
    },
    startExtendedWithoutCache () {
      localStorage.removeItem('multipleElevators')
      localStorage.removeItem('multipleElevatorsSettings')
      this.$router.push('/elevator/extendedEmulator')
    },
    startExtendedWithCache () {
      this.$router.push('/elevator/extendedEmulator')
    },
  },
  created () {
    this.extendedSetFloorsCount(5)
    this.extendedSetElevatorsCount(2)
    this.simplifiedSetFloorsCount(5)
  }
}

</script>

<style scoped>
.white-space-pre-wrap {
  white-space: pre-wrap
}
</style>