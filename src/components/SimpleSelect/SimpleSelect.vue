<template>
  <q-select
    filled
    v-model="selectValue"
    use-input
    use-chips
    multiple
    input-debounce="0"
    @new-value="createValue"
    :options="filterOptions"
    @filter="filterFn"
    style="width: 60%; max-width: 400px;max-height: 300px;"
    new-value-mode='add-unique'
    transition-show='flip-up'
    transition-hide='flip-down'
    @virtual-scroll='onScroll'
    :loading='loading'
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          没有找到相关数据
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType, computed, nextTick } from 'vue'
import { QSelect } from 'quasar';

export default defineComponent({
  name: 'SimpleSelect',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    lazyLoading: {
      type: Function as PropType<() => Promise<string[]>>,
      required: false,
    }
  },
  setup (props, { emit }) {

    const selectValue = computed({
      get: () => props.modelValue,
      set: (val) => { emit('update:modelValue', val) }
    })

    const pageSize = 5
    const nextPage = ref(2)
    const loading = ref(false)

    let stringOptions: string[] = []

    const lastPage = Math.ceil(stringOptions.length / pageSize)

    const filterOptions  = ref(props.lazyLoading ? null : stringOptions.slice(0, pageSize * (nextPage.value - 1)) )

    const createValue = (value: string, done: Function) => {
      if (value.length > 0) {
        let temp = '-1'

        if (stringOptions.every(item => { if(item.toLowerCase() === value.toLowerCase()) { temp = item }; return item.toLowerCase() !== value.toLowerCase() })) {

          stringOptions.push(value)
          done(value, 'add-unique')
        } else {
          done(temp !== '-1' ? temp : value, 'add-unique')
        }

      }
    }

    const filterFn = (value: string, update: Function) => {
      if (filterOptions.value !== null) {
        update(() => {
          if (value === '') {
            filterOptions.value = stringOptions.slice(0, pageSize * (nextPage.value - 1))
          } else {
            const needle = value.toLowerCase()
            filterOptions.value = stringOptions.filter(
              v => v.toLowerCase().indexOf(needle) > -1
            )
          }
        })
      } else {
         props.lazyLoading && props.lazyLoading().then(
           res => {
             if (Array.isArray(res)) {
               stringOptions = res
               update(() => { stringOptions = res; filterOptions.value = stringOptions.slice(0, pageSize * (nextPage.value - 1) ) })
             } else {
               console.error(res)
               update(() => { stringOptions = []; filterOptions.value = [] })
             }
           }
         ).catch(err => console.error(err))
       }
    }

    const onScroll = ({ to, ref }) => {
      const lastIndex = stringOptions.length - 1

      if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
        loading.value = true

        setTimeout(() => {
          nextPage.value++
          void nextTick(() => {
            (ref as QSelect).refresh()
            loading.value = false
          })
        }, 500)
      }
    }

    return { createValue, filterOptions, filterFn, selectValue, onScroll, loading }
  }
})
</script>
