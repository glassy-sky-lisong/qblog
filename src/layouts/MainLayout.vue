<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat no-caps no-wrap v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="q-ml-xs">YouTube</q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="YouTube"
            class="bg-white col"
          />
          <q-btn
            icon="search"
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat class="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat class="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat class="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat class="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>2</q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>

      <q-separator class="grey-3" />

      <div class="row  q-px-md">
        <q-tabs
          v-model="currentTab"
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
            style="max-height: 20px;"
            @click.prevent="(e, go) => { go('/') }"
          >
            <template v-slot>
              <q-icon color="grey" name="home" size="1.3rem" />
              <div style="margin: 0 5px;">主页</div>
            </template>
          </q-route-tab>
          <q-route-tab @click.prevent="(e, go) => { go(p.to) }" :name='p.icon' :to='p.to' style="max-height: 20px;" class='q-mx-xs q-px-sm' v-for='p in tabs' :key='p' >
            <template v-slot>
              <q-icon color="grey" :name="p.icon" size="1.3rem" />
              <div style="margin: 0 5px;">{{ p.label }}</div>
              <q-icon color="grey" name="close" @click.prevent.stop='rmTab(p)' />
            </template>
          </q-route-tab>
        </q-tabs>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240">
      <q-scroll-area class="fit" :thumb-style="{ 'border-radius': '5px', 'background-color': 'rgba(144, 147, 153, 0.9)', width: '3px', height: '50px', top: '0px' }" >
        <q-list padding>
          <q-item v-ripple clickable @click="() => { $router.push('/') }">
            <q-item-section avatar>
              <q-icon color="grey" :name="link0.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link0.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <template v-for="link in links1" :key="link.label">
            <q-expansion-item
              v-if="link.children"
              :icon="link.icon"
              :label="link.label"
              expand-separator
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon color="grey" :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ link.label }}</q-item-label>
                </q-item-section>
              </template>

              <q-list padding>
                <q-item
                  v-for="c in link.children"
                  :key="c.label"
                  class="q-pl-lg"
                  v-ripple
                  clickable
                  @click='addTab(c)'
                >
                  <q-item-section avatar>
                    <q-icon color="grey" :name="c.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ c.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item v-else  v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.label" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase" >
            More for YouTube
          </q-item-label>

           <q-item v-for="link in links3" :key="link.label" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

           <q-item v-for="link in links4" :key="link.label" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import { tabProp, nav0, nav1, nav2, nav3, nav4 } from './navData'
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const currentTab = ref('home')
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
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      search,
      fabYoutube,
      link0: nav0,
      links1:nav1,
      links2: nav2,
      links3: nav3,
      links4: nav4,
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' }
      ],
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ],
      currentTab,
      tabs,
      addTab,
      rmTab
    }
  }
})
</script>

<style lang="scss" scoped>
.YL {
  &__toolbar-input-container {
    min-width: 100px;
    width: 55%;
  }

  &__toolbar-input-btn {
    border-radius: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0px;
    border-color: rgba(0, 0, 0, 0.24);
  }
}
</style>
