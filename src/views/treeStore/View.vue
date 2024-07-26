<script setup>
import { TreeStore } from '@/entities/treeStore/treeStore'
import { reactive, ref } from 'vue'

const itemToCreate = ref({ id: null, parent: null, type: null })

const initItems = ref([
  { id: 5, parent: 2, type: 'test' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 8, parent: 4, type: null },
  { id: 7, parent: 4, type: null },

  { id: 6, parent: 2, type: 'test' },
  { id: 1, parent: 'root' },
  { id: 4, parent: 2, type: 'test' },

])

const goalId = ref(1)

function addToInitItems () {
  const index = initItems.value.findIndex(i => i.id === itemToCreate.value.id)
  console.log(index, initItems)
  if (index === -1) initItems.value = [...initItems.value, itemToCreate.value]
}

const goalItems = ref([])
let ts = new TreeStore(JSON.parse(JSON.stringify(initItems.value)))

function initTreeStore () {
  ts = new TreeStore(JSON.parse(JSON.stringify(initItems.value)))
}

</script>

<template>
  <div class="row">
    <div class="col w50">
      <br>
      <h3>Форма добавления в список для инициирования</h3><br>
      <div class="row">
        <input placeholder="id" v-model="itemToCreate.id">
        <input placeholder="parent" v-model="itemToCreate.parent">
        <input placeholder="type" v-model="itemToCreate.type">
      </div>
      <div class="row">
        id: {{ itemToCreate.id }} | parent: {{ itemToCreate.parent }} | type: {{ itemToCreate.type }}
      </div>
      <div class="row">
        <button @click="addToInitItems">Добавить</button>
      </div>
      <br>
      <h3>Список для инициирования</h3><br>
      <div class="col">
        <div
            class="row"
            v-for="(item, i) in initItems"
            :key="item.id"
        >
          id: {{ item.id }} | parent: {{ item.parent }} | type: {{ item.type }}
        </div>
      </div>
    </div>
    <div class="col w50">
      <br>
      <h3>Список с результатом работы функций</h3><br>
      <div class="col">
        <button @click="initTreeStore">init treeStore</button>
        <input v-model.number="goalId">
        <button @click="goalItems = ts.getAll()">getAll</button>
        <button @click="goalItems = [ts.getItem(goalId)]">getItem</button>
        <button @click="goalItems = ts.getAllChildren(goalId)">getAllChildren</button>
        <button @click="goalItems = ts.getChildren(goalId)">getChildren</button>
        <button @click="goalItems = ts.getAllParents(goalId)">getAllParents</button>
      </div>
      <div class="col">
        <div
            class="row"
            v-for="(item, i) in goalItems"
            :key="item.id"
        >
          id: {{ item.id }} | parent: {{ item.parent }} | type: {{ item.type }}
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.w50 {
  width: 50%;
}
</style>