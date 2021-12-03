<template>
  <q-page padding>
    <div class='row q-mb-lg'>
      <div class='text-h4'>全部文章</div>
    </div>
    <div class='row'>
      <q-table
        class='full-width'
        :columns='columns'
        :rows='datas'
        row-key='id'
        title='全部文章'
        :filter='filter'
        :selection="mode"
        v-model:selected="selected"
        :selected-rows-label='() => selected.length > 0 ? `已选择${selected.length}项` : "" '
        v-if="mode !== 'none'"
        ref='tableRef'
        :visible-columns='visibleColumns'
      >
        <template v-slot:top>

          <q-btn
            flat
            type='a'
            label='全选'
            text-color="primary"
            @click.prevent="mode = 'multiple';  selected = [ ...$refs.tableRef.rows];"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='单选'
            text-color="primary"
            @click.prevent="mode = 'single';  selected = [];"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='删除'
            text-color="primary"
            v-if='mode !== "none"'
            @click.prevent="deleteRows(selected); mode = 'none';"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='取消'
            text-color="primary"
            v-if='mode !== "none"'
            @click.prevent="mode !== 'none' && ( selected = []) && ( mode = 'none' )"
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
        class='full-width table-sticky-dynamic'
        :columns='columns'
        :rows='datas'
        row-key='id'
        title='全部文章'
        :filter='filter'
        v-else
        ref='tableRef'
        :visible-columns='visibleColumns'
        virtual-scrolls
        :virtual-scroll-item-size='48'
        :virtual-scroll-sticky-size-start='48'
      >
       <template v-slot:top>

          <q-btn
            flat
            type='a'
            label='全选'
            text-color="primary"
            @click.prevent="mode = 'multiple';  selected = [ ...$refs.tableRef.rows];"
          >
          </q-btn>

          <q-btn
            flat
            type='a'
            label='单选'
            text-color="primary"
            @click.prevent="mode = 'single';  selected = [];"
          >
          </q-btn>

          <q-space />

          <q-input borderless dense debounce="300" v-model="filter" placeholder="搜索">
            <template v-slot:append>
              <q-icon name="search" style='cursor: pointer;' />
            </template>
          </q-input>

           <q-btn
           flat
           rounded
            icon="settings"
            size='sm'
          >
             <q-menu>
               <q-list>
                 <q-item clickable v-ripple style='font-size: 12px;'>
                   <q-item-section>
                     <q-item-label>开启虚拟滚动</q-item-label>
                   </q-item-section>
                 </q-item>
                 <q-item clickable v-ripple style='font-size: 12px;'>
                   <q-item-section>
                     <q-item-label>开启虚拟滚动</q-item-label>
                   </q-item-section>
                 </q-item>
                 <q-item clickable v-ripple style='font-size: 12px;'>
                   <q-item-section>
                     <q-item-label>开启虚拟滚动</q-item-label>
                   </q-item-section>
                 </q-item>
                 <q-item clickable v-ripple style='font-size: 12px;'>
                   <q-item-section>
                     <q-item-label>开启虚拟滚动</q-item-label>
                   </q-item-section>
                 </q-item>
               </q-list>
             </q-menu>
          </q-btn>
        </template>

      </q-table>

       <context-menu>
         <c-menu-item label="Open..." ></c-menu-item>
         <c-menu-item label='Format' separator></c-menu-item>
         <extend-menu-item icon='arrow_right' label='选择列' separator >
           <template v-for='(c) in $refs.tableRef.columns' :key='c.id'>
             <c-menu-item :label='c.label' :selected='visibleColumns.includes(c.name, 0)' @menu-select='!visibleColumns.includes(c.name, 0) && visibleColumns.push(c.name)' @menu-no-select='visibleColumns.indexOf(c.name, 0) !== -1 && visibleColumns.splice(visibleColumns.indexOf(c.name, 0), 1)' ></c-menu-item>
           </template>
         </extend-menu-item>
       </context-menu>
    </div>
  </q-page>
</template>

<script lang='ts'>
import ContextMenu from 'src/components/ContextMenu/ContextMenu.vue'
import CMenuItem from 'src/components/ContextMenu/MenuItem.vue'
import ExtendMenuItem from 'src/components/ContextMenu/ExtendMenuItem.vue'
import { column as columns, data as datas } from './tableData'
import { defineComponent, ref } from 'vue'

export type Mode = 'multiple' | 'single' | 'none'

export default  defineComponent({
  name: 'AllArticle',
  components: { ContextMenu, CMenuItem, ExtendMenuItem },
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
    const clickHandle = () => {
      console.log('click callback')
    }
    const isAll = ref(false)
    const demoSelected = ref(false)

    const visibleColumns = ref(columns.map(item => item.name).filter(item => item !== 'id'))
    return {
      columns,
      datas,
      filter,
      selected,
      mode,
      tableRef,
      deleteRows,
      isAll,
      clickHandle,
      demoSelected,
      visibleColumns,
    }
  }
})
</script>

<style lang='sass'>
.table-sticky-dynamic
  /* height or max-height is important */
  max-height: 410px
  height: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  thead tr:last-child th
   top: 48px
  thead tr:first-child th
    top: 0
</style>
