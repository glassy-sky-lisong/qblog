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
        ref='tableRef'
      >
        <template v-slot:top>

          <q-btn
            flat
            type='a'
            label='全选'
            text-color="primary"
            @click.prevent="mode = 'multiple';  selected = [ ...$refs.tableRef.rows]; isAll = true"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='删除'
            text-color="primary"
            v-if='isAll'
            @click.prevent="deleteRows(selected)"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='取消'
            text-color="primary"
            v-if='isAll'
            @click.prevent="mode !== 'none' && ( selected = []) && ( isAll = false ) && ( mode = 'none' )"
          >
          </q-btn>

          <q-space />
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

           <q-btn
           flat
           rounded
            icon="settings"
            size='sm'
          >
          </q-btn>
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
        v-else-if="mode === 'single'"
        ref='tableRef'
      >
       <template v-slot:top>

          <q-btn
            flat
            type='a'
            label='全选'
            text-color="primary"
            @click.prevent="mode = 'multiple';  selected = [ ...$refs.tableRef.rows]; isAll = true"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='删除'
            text-color="primary"
            v-if='isAll'
            @click.prevent="deleteRows(selected)"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='取消'
            text-color="primary"
            v-if='isAll'
            @click.prevent="mode !== 'none' && ( selected = []) && ( isAll = false ) && ( mode = 'none' )"
          >
          </q-btn>

          <q-space />
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

           <q-btn
           flat
           rounded
            icon="settings"
            size='sm'
          >
          </q-btn>
        </template>
      </q-table>
      <q-table
        class='full-width'
        :columns='columns'
        :rows='datas'
        row-key='id'
        title='全部文章'
        :filter='filter'
        v-else-if="mode === 'none'"
        ref='tableRef'
      >
       <template v-slot:top>

          <q-btn
            flat
            type='a'
            label='全选'
            text-color="primary"
            @click.prevent="mode = 'multiple';  selected = [ ...$refs.tableRef.rows]; isAll = true"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='删除'
            text-color="primary"
            v-if='isAll'
            @click.prevent="deleteRows(selected)"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='取消'
            text-color="primary"
            v-if='isAll'
            @click.prevent="mode !== 'none' && ( selected = []) && ( isAll = false ) && ( mode = 'none' )"
          >
          </q-btn>

          <q-space />
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

           <q-btn
           flat
           rounded
            icon="settings"
            size='sm'
          >
          </q-btn>
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
    const tableRef = ref(null)
    const selected = ref([])
    const mode = ref<Mode>('none')
    const deleteRows = (arrs: []) => {
      console.log('delete rows')
      arrs.forEach(item => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`DELETE${item}`)
      })
      arrs = []
    }
    const isAll = ref(false)
    return {
      columns,
      datas,
      filter,
      selected,
      mode,
      tableRef,
      deleteRows,
      isAll
    }
  }
})
</script>
