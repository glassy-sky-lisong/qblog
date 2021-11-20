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
          v-model="tab"
          inline-label
          dense
          outside-arrows
          align='left'
          class='full-width'
        >
          <q-router-tab name='home' class='q-mx-xs' style="max-height: 20px;" >
            <template v-slot>
              <q-icon color="grey" name="home" size="1.3rem" />
              <div style="margin: 0 5px;">主页</div>
            </template>
          </q-router-tab>
          <q-router-tab :name='p.icon' style="max-height: 20px;" class='q-mx-xs q-px-sm' v-for='p in panel' :key='p' >
            <template v-slot>
              <q-icon color="grey" :name="p.icon" size="1.3rem" />
              <div style="margin: 0 5px;">{{ p.text }}</div>
              <q-icon color="grey" name="close" @click.stop='rmTab(p)' />
            </template>
          </q-router-tab>
        </q-tabs>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240">
      <q-scroll-area class="fit" :thumb-style="{ 'border-radius': '5px', 'background-color': 'rgba(144, 147, 153, 0.9)', width: '3px', height: '50px', top: '0px' }" >
        <q-list padding>
          <template v-for="link in links1" :key="link.text">
            <q-expansion-item
              v-if="link.children"
              :icon="link.icon"
              :label="link.text"
              expand-separator
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-icon color="grey" :name="link.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ link.text }}</q-item-label>
                </q-item-section>
              </template>

              <q-list padding>
                <q-item
                  v-for="c in link.children"
                  :key="c.text"
                  class="q-pl-lg"
                  v-ripple
                  clickable
                  @click='addTab(c)'
                >
                  <q-item-section avatar>
                    <q-icon color="grey" :name="c.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ c.text }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item v-else  v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase" >
            More for YouTube
          </q-item-label>

           <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

           <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <component :is='currentComponent' ></component>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import { defineComponent, ref } from 'vue'

interface tabProp {
  icon: string;
  text: string;
}

interface tabProps {
  icon: string;
  text: string;
  children?: tabProp[]
}

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const tab = ref('home')
    const panel = ref<Array<tabProps>>([])
    const currentComponent = ref(null)

    const addTab = (_tab: tabProps) => {
        panel.value.push(_tab)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tab.value = _tab.icon ? _tab.icon : tab.value
    }

    const rmTab = (_tab: tabProps) => {
      const i = panel.value.indexOf(_tab, 0)
      panel.value.splice(i, 1)

      tab.value = panel.value.length > 0 ? panel.value[panel.value.length - 1].icon : 'home'
      console.log(tab.value)
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      search,
      fabYoutube,
      currentComponent,
      links1: [
        { icon: 'home', text: 'Home', children: [  { icon: 'whatshot', text: 'Trending' }, { icon: 'subscriptions', text: 'Subscriptions' } ] },
        { icon: 'whatshot', text: 'Trending' },
        { icon: 'subscriptions', text: 'Subscriptions' }
      ],
      links2: [
        { icon: 'folder', text: 'Library' },
        { icon: 'restore', text: 'History' },
        { icon: 'watch_later', text: 'Watch later' },
        { icon: 'thumb_up_alt', text: 'Liked videos' }
      ],
      links3: [
        { icon: fabYoutube, text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' }
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' }
      ],
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
      tab,
      panel,
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
