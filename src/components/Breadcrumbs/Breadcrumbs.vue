<template>
  <q-breadcrumbs
    separator="/"
    active-color="text-grey-8"
    gutter="xs"
    class="q-ml-md"
  >
    <template v-for="(v, i) in breadcrumbs" :key="i">
      <q-breadcrumbs-el :icon="v.icon" :label="v.label" />
    </template>
  </q-breadcrumbs>
</template>

<script lang='ts'>
import { defineComponent, computed  } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
import { TabMeta } from 'src/utils/router'

export default defineComponent({
  name: 'Breadcrumbs',
  setup () {
    const route = useRoute()
    const breadcrumbsHandle = (arrs: RouteLocationMatched[]) => {
       return arrs.filter(item => item.meta.tab).map(item => item.meta.tab)
    }
    const breadcrumbs = computed(() => breadcrumbsHandle(route.matched))

    return {
      breadcrumbs,
    }
  }
})
</script>

