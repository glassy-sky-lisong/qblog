<template>
  <q-list bordered separator class='q-ma-md' >
    <slot></slot>
  </q-list>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'simpleList'
})
</script>
