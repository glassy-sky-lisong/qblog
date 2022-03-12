<template>
  <q-page padding>
    <div class='row q-mb-lg'>
      <div class='text-h4'>全部文章</div>
    </div>
    <div class='row'>
      <q-table
        class='full-width table-sticky-dynamic'
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
        :loading='tableLoading'
      >
        <template v-slot:top>

          <q-btn
            flat
            type='a'
            label='全选'
            text-color="primary"
            @click.prevent="mode = 'multiple';  selected = [ ...$refs.tableRef.rows]; "
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
            @click.prevent="deleteRows(selected);"
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
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
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

        <template v-slot:loading>
          <q-inner-loading :showing='tableLoading' color='primary' :label='tableLoadingLabel'></q-inner-loading>
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
        :loading='tableLoading'
        rows-per-page-label='每页显示行数'
        :pagination-label='(firstRowIndex, endRowIndex, totalNumers) => `共${totalNumers}条记录`'
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

        <template v-slot:loading>
          <q-inner-loading :showing='tableLoading' color='primary' :label='tableLoadingLabel'></q-inner-loading>
        </template>

        <template v-slot:pagination='scopes'>
          <q-pagination :max='scopes.pagesNumber' v-model='scopes.pagination.page' input></q-pagination>
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
import { column as columns, PostProp } from './tableData'
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'src/store'

export type Mode = 'multiple' | 'single' | 'none'

export default  defineComponent({
  name: 'AllArticle',
  components: { ContextMenu, CMenuItem, ExtendMenuItem },
  setup () {
    const filter = ref('')
    const tableRef = ref(null)
    const selected = ref([])
    const tableLoading = ref(false)
    const tableLoadingLabel = ref('')
    const mode = ref<Mode>('none')
    const store = useStore()

    const setLoading = (msg: string) => {
      tableLoading.value = true
      tableLoadingLabel.value = msg
    }

    const clearLoading = () => {
      tableLoading.value = false
      tableLoadingLabel.value = ''
    }

    const deleteRows = (arrs: any[]) => {
      console.log('delete rows')
      const deleteFiles = arrs.map(item => {
        return item.articleName || ''
      })
      console.log(deleteFiles)
      // todo
      setLoading('正在删除')
      store.dispatch('deleteArticleByNames', deleteFiles).then(
        () => {
          //  delete
          datas.value = []

          // 拉取数据
          setLoading('正在拉取数据')
          fetchAllArticle().then(() => {
            clearLoading()
          }).catch(err => console.error(err))
        }
      ).catch((err) => { console.error(err); arrs = arrs; clearLoading();})
      .finally(() => mode.value = 'none')
    }

    const fetchAllArticle = () => {
      return new Promise((resolve, reject) => {
        void store.dispatch('fetchAllArticle').then(
          res => {
            if (Array.isArray(res)) {
              console.log(res)
              res.forEach((item) => {
                datas.value.push(item)
              })
              console.log(datas.value)
              resolve(true)
            }
          }
        ).catch(err => reject(err))
      })
    }

    const clickHandle = () => {
      console.log('click callback')
    }
    const isAll = ref(false)
    const demoSelected = ref(false)

    const visibleColumns = ref(columns.map(item => item.name).filter(item => item !== 'id'))
    const datas = ref< PostProp[] >([])

    const initArticleList = () => {
      setLoading('正在初始化')
      void store.dispatch('fetchAllArticle').then(
        res => {
          if (Array.isArray(res)) {
            console.log(res)
            res.forEach((item) => {
              datas.value.push(item)
            })
            console.log(datas.value)
          }
          clearLoading()
        }
      ).catch(err => { console.error(err); clearLoading() })
    }

    onMounted(() =>[
      initArticleList()
    ])

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
      tableLoading,
      tableLoadingLabel,
    }
  }
})
</script>

<style lang='sass'>
.table-sticky-dynamic
  /* height or max-height is important */
  max-height: 410px
  min-height: 300px
  height: 410px

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
