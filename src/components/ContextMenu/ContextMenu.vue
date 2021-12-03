<template>
  <q-menu touch-position context-menu>
    <q-list dense style="min-width: 220px; width: 100%">
      <slot></slot>
    </q-list>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContextMenu',
});
</script>
