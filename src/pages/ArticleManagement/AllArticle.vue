<template>
  <q-page padding>
    <div class='row'>
      <q-btn flat label='single' @click="mode = 'single'"></q-btn>
      <q-btn flat label='multiple' @click="mode = 'multiple'"></q-btn>
      <q-btn flat label='none' @click="mode = 'none'"></q-btn>
    </div>
    <div class='row'>
      <q-table
        class='full-width'
        :columns='columns'
        :rows='datas'
        row-key='id'
        title='全部文章'
        :filter='filter'
        selection="multiple"
        v-model:selected="selected"
        v-if="mode === 'multiple'"
      >
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <q-table
        class='full-width'
        :columns='columns'
        :rows='datas'
        row-key='id'
        title='全部文章'
        :filter='filter'
        selection="single"
        v-model:selected="selected"
        v-if="mode === 'single'"
      >
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <q-table
        class='full-width'
        :columns='columns'
        :rows='datas'
        row-key='id'
        title='全部文章'
        :filter='filter'
        v-if="mode === 'none'"
      >
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    all article
  </q-page>
</template>

<script lang='ts'>
import { column as columns, data as datas } from './tableData'
import { defineComponent, ref } from 'vue'

export type Mode = 'multiple' | 'single' | 'none'

export default  defineComponent({
  name: 'AllArticle',
  setup () {
    const filter = ref('')
    const selected = ref([])
    const mode = ref<Mode>('none')
    return {
      columns,
      datas,
      filter,
      selected,
      mode
    }
  }
})
</script>
