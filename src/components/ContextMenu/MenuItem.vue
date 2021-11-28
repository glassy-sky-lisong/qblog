<template>
   <q-item clickable v-close-popup>
     <q-item-section>
       <q-item-label>{{ label }}<q-item-label>
      </q-item-section>
   </q-item>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContextMenuItem',
  props: {
    label: String,
  }
})
</script>

