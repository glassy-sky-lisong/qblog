<template>
  <q-layout container view="hHh lpR fFf" class="bg-grey-1 main-layout" ref='layoutRef' style='height: 100vh;'>
    <q-header elevated class="bg-white text-grey-8 q-py-xs">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-btn flat no-caps no-wrap v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="q-ml-xs">YouTube</q-toolbar-title>
        </q-btn>

       <breadcrumbs />

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
            <q-menu auto-close>
              <q-list>
                <q-item clickable  @click='this.$refs.procardRef.openCard();'>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>
                    设置
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>
                </q-item>
                <q-item clickable  @click='confirm = true'>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>
                    注销账号
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>
                </q-item>
                <q-item clickable @click.once='logout'>
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>
                    退出登录
                  </q-item-section>
                  <q-item-section side>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>

      <q-separator class="grey-3" />

      <tag-view v-model='keepAlivedList' ></tag-view>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
      :breakpoint='500'
    >
      <q-scroll-area class="fit" :thumb-style="{ 'border-radius': '5px', 'background-color': 'rgba(144, 147, 153, 0.9)', width: '3px', height: '50px', top: '0px' }" >

          <slide-group class='q-mt-md'>
            <slide-item :item='defaultNav'></slide-item>
            <template v-for='v in navs' :key='v.name'>
              <slide-item :item='v'></slide-item>
            </template>
          </slide-group>

      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view v-slot='{ Component }'>
        <keep-alive :include='keepAlivedList'>
          <component :is='Component'></component>
        </keep-alive>
      </router-view>
    </q-page-container>

   <settings-card :current-user='currentUser' @update-user='updateUser' ref='procardRef' ></settings-card>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">您确定要注销账号吗？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="手滑了" color="primary" v-close-popup />
          <q-btn flat label="我确定" color="primary" v-close-popup @click='cancelHandle' />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import TagView from 'src/components/TagView/TagView.vue'
import Breadcrumbs from 'src/components/Breadcrumbs/Breadcrumbs.vue'
import SlideItem from 'src/components/SlideGrop/SlideItem.vue'
import SlideGroup from 'src/components/SlideGrop/SlideGroup.vue';
import { useStore } from 'src/store/index';
import { defineComponent, ref, onMounted, computed, onUpdated } from 'vue'
import axios from 'axios'
import { initNav } from 'src/utils/router'
import { Nav } from 'src/components/SlideGrop/nav'
import { tabs } from './navData'
import SettingsCard from 'layouts/SettingsCard/SettingsCard.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { SettingsCard, TagView , Breadcrumbs, SlideItem, SlideGroup },
  setup() {
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const keepAlivedList = ref<string[]>([])
    const store = useStore()
    const currentUser = computed(() => store.getters.currentUser)
    const confirm = ref(false)

    const navs = ref<Nav[]>([])
    const defaultNav: Nav = { name: 'Home', icon: 'home', to: '/', label: '主页', children: [], show: true }


    onMounted(() => {
      void store.dispatch('fetchCurrentUser')
      navs.value = initNav(tabs)
    })

    onUpdated(() => console.log('updated'))

    return {
      leftDrawerOpen,
      search,
      fabYoutube,
      keepAlivedList,
      currentUser,
      confirm,
      navs,
      defaultNav,
    }
  },
  methods: {
    logout() {
      void this.$store.dispatch('logout').then(
        res => {
          if (res) {
            void this.$router.push('/login')
          } else {
            console.log('logout unknown error')
          }
        }
      ).catch(err => console.error(err))
    },
    getLoginedUser() {
      void axios.get('/api/user/current-user').then(
        res => {
          console.log(res.data)
          if (res.data.data) {
            this.$store.commit('setUser', res.data.data)
          } else throw new Error('get LoginUser fail')
        }
      ).catch(err => console.error(err))
    },
    cancelHandle() {
      console.log('cancel')
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    updateUser({ username, password }) {
      this.$store.commit('updateUser', {
        username,
        password,
      })
    //  async update user
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

<style lang='scss'>
  aside.q-drawer {
    position: fixed;
  }

  .q-layout-container {
    .absolute-full {
      right: 0 !important;
    }

    .scroll {
      width: 100% !important;
    }

    .scroll::-webkit-scrollbar {
      width: 4px;
      height: 6px;
      background: #e1d9d900;
    }

    .scroll::-webkit-scrollbar-thumb {
      width: 4px;
      height: 20px;
      background: #0c4c3a78;
    }
  }
</style>
