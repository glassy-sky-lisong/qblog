<template>
  <div class='row  q-px-md q-pt-xs'>
    <q-tabs
      v-model='currentTab'
      inline-label
      dense
      outside-arrows
      align='left'
      class='full-width'
    >
      <q-route-tab
        name='home'
        to='/'
        class='q-mx-xs'
        style='max-height: 20px;'
        @click.prevent="(e, go) => { go('/') }"
      >
        <template v-slot>
          <q-icon color='grey' name='home' size='1.3rem' />
          <div style='margin: 0 5px;'>主页</div>
        </template>
      </q-route-tab>
      <template v-for='p in tabs' :key='p'>
        <q-route-tab @click.prevent='(e, go) => { go(p.to) }' :name='p.icon' :to='p.to' style='max-height: 20px;'
                     class='q-mx-xs q-px-sm'>
          <template v-slot>
            <q-icon color='grey' :name='p.icon' size='1.3rem' />
            <div style='margin: 0 5px;'>{{ p.label }}</div>
            <q-icon color='grey' name='close' @click.prevent.stop='rmTab(p)' />
          </template>
        </q-route-tab>
      </template>
    </q-tabs>
  </div>
</template>


<script lang='ts'>
import { tabProp } from 'src/layouts/navData'
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TagView',
  setup () {
    const router = useRouter()
    const currentTab = ref('/home')
    const tabs = ref<Array<tabProp>>([])

    const addTab = (_tab: tabProp) => {
      console.log(tabs.value.indexOf(_tab, 0), 'hahaha')
      tabs.value.indexOf(_tab, 0) === -1 && tabs.value.push(_tab)
      void router.push(_tab.to || '/')
      console.log('add')
    }
    const rmTab = (_tab: tabProp) => {
      const i = tabs.value.indexOf(_tab, 0)
      tabs.value.splice(i, 1)

      let to = tabs.value.length > 0 ? tabs.value[tabs.value.length - 1].to || '/' : '/'
      void router.push(to)
    }

    watch(currentTab, (n, o) => {
      console.log(n, o)
    })
    return {
      currentTab,
      tabs,
      addTab,
      rmTab
    }
  }
})
</script>
