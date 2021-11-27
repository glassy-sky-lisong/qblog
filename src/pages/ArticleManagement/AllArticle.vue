<template>
  <q-page padding>
    <div class='row'>
      <q-table
        :columns='columns'
        :rows='datas'
        row-key='title'
        title='全部文章'
      >

      </q-table>
    </div>
    all article
  </q-page>
</template>

<script lang='ts'>
import { column as columns, data as datas } from './tableData'
import { defineComponent } from 'vue'

export default  defineComponent({
  name: 'AllArticle',
  setup () {
    return {
      columns,
      datas
    }
  }
})
</script>
