<template>
  <q-breadcrumbs
    v-if="$q.screen.gt.sm"
    separator="/"
    active-color="text-grey-8"
    gutter="xs"
    class="q-ml-md"
  >
    <template v-for="(v, i) in breadcrumbs" :key="i + v.title">
      <q-breadcrumbs-el :icon="v.icon" :label="v.title" />
    </template>
  </q-breadcrumbs>
</template>

<script lang='ts'>
import { defineComponent, computed  } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumbs',
  setup () {
    const route = useRoute()
    const breadcrumbsHandle = (arrs: RouteLocationMatched[]) => {
       return arrs.map((item) => item.meta).filter(item => item.title)
    }
    const breadcrumbs = computed(() => breadcrumbsHandle(route.matched))

    return {
      breadcrumbs
    }
  }
})
</script>

