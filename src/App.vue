<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
})
</script>

<style lang='scss'>
body {
  ::-webkit-scrollbar {
    width: 4px;
    height: 6px;
    background: #e1d9d900;
  }

  ::-webkit-scrollbar-thumb {
    width: 4px;
    height: 20px;
    background: #0c4c3a78;
  }
}
</style>
