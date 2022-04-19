<template>
  <div class='row  q-px-md q-pt-xs'>
    <q-tabs
      v-model='currentTab'
      inline-label
      dense
      outside-arrows
      mobile-arrows
      align='left'
      class='full-width'
      :style='{ "max-height": "100vw" }'
      breakpoint='0'
    >
      <template v-for='p in tabs' :key='p.name'>
        <q-route-tab :to='p.to'  :name='p.name' style='max-height: 20px;'
                     class='q-mx-xs q-px-sm'>
          <template v-slot>
            <q-icon color='grey' :name='p.icon' size='1.3rem' />
            <div style='margin: 0 5px;'>{{ p.label }}</div>
            <q-icon v-if='p.name !== defaultTab.name' color='grey' class='q-ml-md' name='close' @click.prevent.stop='rmTab(p)' />
          </template>
        </q-route-tab>
      </template>
    </q-tabs>
  </div>
</template>


<script lang='ts'>
import { defineComponent, ref, watch, onMounted, PropType, computed, } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { Tab } from 'src/layouts/navData';

interface Tag {
  name: string;
  label: string;
  icon: string;
  to: string;
  cName: string;
}

export default defineComponent({
  name: 'TagView',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: [ 'modelValue:update' ],
  setup (props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const defaultTab = ref<Tag>({ name: 'index', icon: 'home', label: '主页', to: '/', cName: 'Index' })
    const currentTab = ref<string>(defaultTab.value.name)
    const tabs = ref<Tag[]>([ defaultTab.value ])

    const keepAlivedList = computed({
      set: val => emit('modelValue:update', val),
      get: () => props.modelValue
    })

    keepAlivedList.value.push(defaultTab.value.cName)

    const containsTab = (name: string) => {
      for (let i = 0; i < tabs.value.length; i++) {
        if(tabs.value[i].name === name) {
          return true
        }
      }
      return false
    }

    const addTab = (tab: Tag) => {
      if(!containsTab(tab.name)) {
        tabs.value.push(tab)
        keepAlivedList.value.push(tab.cName)
        activeTab(tab.name, true)
      }
    }

    const rmTab = (_tab: Tag) => {
      if(containsTab(_tab.name) && _tab.name !== defaultTab.value.name) {
        const i = tabs.value.indexOf(_tab, 0)
        const lastIndex = tabs.value.length - 1

        if(i < lastIndex) {
          activeTab(tabs.value[lastIndex].name, false)
        } else if (i === lastIndex) {
          activeTab(tabs.value[i - 1].name, false)
        }

        const pos = keepAlivedList.value.indexOf(tabs.value[i].cName, 0)
        keepAlivedList.value.splice(pos, 1)

        tabs.value.splice(i, 1)
      }
    }

    const activeTab = (name: string, isInit: boolean) => {
      if(containsTab(name)) {
        if(isInit) {
          currentTab.value = name
        } else {
          void router.push({ name })
          currentTab.value = name
        }
      }
    }

    watch(() => route.matched, (n, _) => {
      const list = n.filter(item => item.meta.tab)

      if(list.length > 0) {
        const lastEl = list[list.length - 1]
        const elMeta = lastEl.meta.tab as Tab

        if(!containsTab(elMeta.name)) {
          addTab({
            name: elMeta.name,
            icon: elMeta.icon,
            label: elMeta.label,
            to: lastEl.path,
            cName: lastEl.components.default.name || elMeta.name
          })
        } else {
          activeTab(elMeta.name, false)
        }
      }
    })

    onMounted(() => {
      const list = route.matched.filter(item => item.meta.tab)

      if (list.length > 0) {
        const lastEl = list[list.length - 1]
        const elMeta = lastEl.meta.tab as Tab

        addTab({
          name: elMeta.name,
          icon: elMeta.icon,
          label: elMeta.label,
          to: lastEl.path,
          cName: lastEl.components.default.name || elMeta.name
        })
      }
    })

    return {
      currentTab,
      tabs,
      addTab,
      rmTab,
      defaultTab,
    }
  }
})
</script>
