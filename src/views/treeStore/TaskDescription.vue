<template>
  <div class="pa-8">
    <h1>Вы на главной странице приложения «Хранилище дерева»</h1>
    <p>Данное приложение является тестовым заданием для одной из вакансий</p>

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
      <template v-if="el.type === 'pre'">
       <pre>
         {{el.text}}
       </pre>
      </template>
    </div>
  </div>
  <v-img src="src/assets/treeStore.png">

  </v-img>
</template>

<script>
import description from '@/assets/testExerciseTreeStore.json'

export default {
  name: 'ElevatorTaskDescription',
  computed: {
    description () {
      return description
    },
  },
}

</script>

<style scoped>
.white-space-pre-wrap {
  white-space: pre-wrap
}
</style>