<template>
  <q-separator v-if='separator' />
   <q-item clickable v-close-popup @click='clickHandle'  class=''>
     <q-item-section  style='flex-direction: row;justify-content: flex-start;align-items: center;'>
       <q-icon :name=' isSelected ? "done" : ""' tag='span' class='q-mr-xs' />
       <span>{{ label }}</span>
      </q-item-section>
       <q-item-section v-if='keyBoard' side>
         {{ keyBoard }}
       </q-item-section>
       <q-item-section v-else  side>
       </q-item-section>
   </q-item>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ContextMenuItem',
  props: {
    label: String,
    keyBoard: {
      type: String,
      required: false
    },
    separator: {
      type: Boolean,
      required: false
    },
    selected: {
      type: Boolean,
      required: false
    },
  },
  emits: [ 'menu-select', 'menu-no-select', 'click' ],
  setup (props, { emit }) {
    const isSelected =  ref( props.selected )
    const clickHandle = (e: MouseEvent) => {
      if (isSelected.value !== null) {
        emit('click', e)
        isSelected.value = !isSelected.value
        setTimeout(() => {
          isSelected.value ? emit('menu-select') : emit('menu-no-select');
        }, 0)
      }
    }

    return {
      isSelected,
      clickHandle
    }
  }
})
</script>

<style lang='scss' scoped>
  .text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

