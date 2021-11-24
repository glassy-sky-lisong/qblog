<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat no-caps no-wrap v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="q-ml-xs">YouTube</q-toolbar-title>
        </q-btn>

        <q-breadcrumbs
          v-if='$q.screen.gt.sm'
          separator='/'
          active-color="text-grey-8"
          gutter="xs"
          class='q-ml-sm'
        >
          <template v-for='(v, i) in breadcrumbs' :key='i + v.title'>
            <q-breadcrumbs-el icon="v.icon" label='v.title' />
          </template>
        </q-breadcrumbs>

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

        <div class="q-gutter-sm row items-center no-wrap q-pl-md">
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

      <tag-view ref='tabViewRef' ></tag-view>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240">
      <q-scroll-area class="fit" :thumb-style="{ 'border-radius': '5px', 'background-color': 'rgba(144, 147, 153, 0.9)', width: '3px', height: '50px', top: '0px' }" >
        <q-list padding>
          <q-item v-ripple clickable @click="$router.push('/')">
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
                  @click='$refs.tabViewRef.addTab(c)'
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
import { nav0, nav1, nav2, nav3, nav4 } from './navData'
import TagView from 'src/components/TagView.vue'
import { defineComponent, ref, onUpdated, computed } from 'vue'
import { useRouter, useRoute, RouteLocationMatched } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  components: { TagView },
  setup() {
    const route = useRoute()
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const tagViewRef = ref(null)

    const breadcrumbsHandle = (arrs: RouteLocationMatched[]) => {
       return arrs.map((item) => item.meta)
    }
    const breadcrumbs = computed(() => breadcrumbsHandle(route.matched))

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
      tagViewRef,
      breadcrumbs
    }
  }
})
</script>

<style lang="scss" scoped>
.YL {
  &__toolbar-input-container {
    min-width: 200px;
    width: 20%;
  }

  &__toolbar-input-btn {
    border-radius: 0;
    border-style: solid;
    border-width: 1px 1px 1px 0px;
    border-color: rgba(0, 0, 0, 0.24);
  }
}
</style>
