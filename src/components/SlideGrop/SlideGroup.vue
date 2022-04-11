<template>
  <q-list padding>
    <slot></slot>
  </q-list>
  <q-separator v-if='separator' />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlideGroup',
  inheritAttrs: false,
  props: {
    separator: {
      type: Boolean,
      default: () => false
    }
  }
})
</script>



