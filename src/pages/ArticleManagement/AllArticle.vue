<template>
  <q-page padding>
    <div class='row'>
      <q-table
        class='full-width'
        :columns='columns'
        :rows='datas'
        row-key='title'
        title='全部文章'
        :filter='filter'
      >
        <template v-slot:top-left>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        </template>
      </q-table>
    </div>
    all article
  </q-page>
</template>

<script lang='ts'>
import { column as columns, data as datas } from './tableData'
import { defineComponent, ref } from 'vue'

export default  defineComponent({
  name: 'AllArticle',
  setup () {
    const filter = ref('')
    return {
      columns,
      datas,
      filter,
    }
  }
})
</script>
